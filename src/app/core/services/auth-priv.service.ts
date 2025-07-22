import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

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
        throw new Error('Usuário não encontrado');
      }

      const usuario = {
        id: userDoc.id,
        ...userDoc.data()
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuario));
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
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
}