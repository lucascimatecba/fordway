import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthPrivService {
  private readonly STORAGE_KEY = 'usuarioLogado';
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  async login(email: string, senha: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, senha);
      const userDoc = await getDoc(doc(this.firestore, 'colaboradores', userCredential.user.uid));

      if (!userDoc.exists()) {
        await signOut(this.auth);
        throw { code: 'auth/user-not-found', message: 'Usuário não encontrado no banco de dados' };
      }

      const usuario = {
        uid: userCredential.user.uid,
        ...userDoc.data()
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuario));
    } catch (error: any) {
      console.error('Erro completo:', error);

      if (error.code) {
        if (error.code === 'auth/invalid-login-credentials') {
          error.code = 'auth/wrong-password';
        }

        throw new Error(this.getFriendlyErrorMessage(error.code));
      } else {
        throw new Error(this.getFriendlyErrorMessage('default'));
      }
    }
  }


  logout(): void {
    signOut(this.auth);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  getUsuario(): any {
    const usuario = localStorage.getItem(this.STORAGE_KEY);
    return usuario ? JSON.parse(usuario) : null;
  }

  estaLogado(): boolean {
    return !!this.getUsuario();
  }

  private getFriendlyErrorMessage(code: string): string {
    switch (code) {
      case 'auth/invalid-email':
        return 'Formato de e-mail inválido';
      case 'auth/user-disabled':
        return 'Sua conta foi desativada';
      case 'auth/user-not-found':
        return 'E-mail não cadastrado';
      case 'auth/wrong-password':
        return 'Senha incorreta';
      case 'auth/too-many-requests':
        return 'Muitas tentativas. Tente mais tarde';
      default:
        return 'Credenciais inválidas. Verifique seus dados.';
    }
  }
}
