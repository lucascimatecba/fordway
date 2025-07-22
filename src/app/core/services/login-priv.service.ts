import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { FirebaseError } from '@angular/fire/app';

interface Usuario {
  id: number | string
  nome: string
  senha: string
  email: string
}

@Injectable({ providedIn: 'root' })
export class LoginPrivService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  async login(email: string, senha: string): Promise<Usuario> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(this.auth, email, senha);
      const userDoc = await getDoc(doc(this.firestore, 'colaboradores', userCredential.user.uid));

      if (userDoc.exists()) {
        return {
          id: userDoc.id,
          ...userDoc.data()
        } as Usuario;
      }
      throw new Error('Usuário não encontrado no banco de dados');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error('Código do erro Firebase:', error.code);
        throw this.getFriendlyErrorMessage(error.code);
      }
      throw new Error('Erro desconhecido durante o login');
    }
  }

  private getFriendlyErrorMessage(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
        return 'E-mail não cadastrado';
      case 'auth/wrong-password':
        return 'Senha incorreta';
      case 'auth/invalid-email':
        return 'E-mail inválido';
      case 'auth/too-many-requests':
        return 'Muitas tentativas. Tente novamente mais tarde';
      default:
        return 'Erro ao fazer login';
    }
  }
}