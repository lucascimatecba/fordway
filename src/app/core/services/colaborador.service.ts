import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, setDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FirebaseError } from '@angular/fire/app';

interface Colaborador {
  nome: string;
  codigoChave: string;
  email: string;
  senha?: string;
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class ColaboradorService {

  private firestore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);

  async codigoChaveValido(codigo: string): Promise<boolean> {
    const q = query(
      collection(this.firestore, 'codigoChave'),
      where('valor', '==', codigo)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

  async cadastrarColaborador(dados: Omit<Colaborador, 'createdAt'>): Promise<string> {
    try {
      const codigoValido = await this.codigoChaveValido(dados.codigoChave);
      if (!codigoValido) throw new Error('Código-chave inválido');

      const emailExiste = await this.verificarEmail(dados.email);
      if (emailExiste) throw new Error('Email já em uso');

      const cred = await createUserWithEmailAndPassword(this.auth, dados.email, dados.senha!);
      const uid = cred.user.uid;

      await setDoc(doc(this.firestore, 'colaboradores', uid), {
        nome: dados.nome,
        codigoChave: dados.codigoChave,
        email: dados.email,
        createdAt: new Date()
      });

      return uid;
    } catch (error) {
      console.error('Erro detalhado:', error);
      if (error instanceof FirebaseError) {
        throw this.getFriendlyErrorMessage(error.code);
      }
      throw typeof error === 'string' ? new Error(error) : error;
    }
  }

  private getFriendlyErrorMessage(code: string): Error {
    switch (code) {
          case 'auth/email-already-in-use':
            return new Error('Este e-mail já está em uso');
        case 'auth/invalid-email':
            return new Error('E-mail inválido');
        case 'auth/weak-password':
            return new Error('Senha muito fraca (mínimo 6 caracteres)');
        case 'permission-denied':
            return new Error('Sem permissão para acessar o banco de dados');
        default:
            return new Error('Erro ao cadastrar usuário');
    }
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
