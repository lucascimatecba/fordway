import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, setDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FirebaseError } from '@angular/fire/app';
import { signInWithEmailAndPassword, onAuthStateChanged } from '@angular/fire/auth';

interface Colaborador {
  nome: string;
  codigoChave: string;
  email: string;
  senha?: string;
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class ColaboradorService {

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}

  // Verifica se o código-chave existe na coleção do Firebase
  async codigoChaveValido(codigo: string): Promise<boolean> {
    const q = query(
      collection(this.firestore, 'codigosChave'),
      where('valor', '==', codigo)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

  async cadastrarColaborador(dados: Omit<Colaborador, 'createdAt'>): Promise<string> {
    try {
      const codigoValido = await this.codigoChaveValido(dados.codigoChave);
      if (!codigoValido) throw new Error('Código-chave inválido');

      const nomeExiste = await this.verificarNome(dados.nome);
      const emailExiste = await this.verificarEmail(dados.email);
      if (nomeExiste || emailExiste) {
        throw new Error(nomeExiste ? 'Nome já em uso' : 'Email já em uso');
      }

      // 1. Criar usuário
      const cred = await createUserWithEmailAndPassword(this.auth, dados.email, dados.senha!);
      const uid = cred.user.uid;

      // 2. Fazer login com o usuário criado (força autenticação client)
      await signInWithEmailAndPassword(this.auth, dados.email, dados.senha!);

      // 3. Agora sim: gravar no Firestore
      await setDoc(doc(this.firestore, 'colaboradores', uid), {
        nome: dados.nome,
        codigoChave: dados.codigoChave,
        email: dados.email,
        createdAt: new Date()
      });

      return uid;
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error('Erro Firebase:', error.code, error.message);
        throw this.getFriendlyErrorMessage(error.code);
      }
      throw error;
    }
  }

  private getFriendlyErrorMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Este e-mail já está em uso';
      case 'auth/invalid-email':
        return 'E-mail inválido';
      case 'auth/weak-password':
        return 'Senha muito fraca (mínimo 6 caracteres)';
      default:
        return 'Erro ao cadastrar usuário';
    }
  }

  async verificarNome(nome: string): Promise<boolean> {
    const q = query(
      collection(this.firestore, 'colaboradores'),
      where('nome', '==', nome)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

  async verificarEmail(email: string): Promise<boolean> {
    const q = query(
      collection(this.firestore, 'colaboradores'),
      where('email', '==', email)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }
}