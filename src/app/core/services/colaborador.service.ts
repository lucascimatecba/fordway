import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore';
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
  private firestore = inject(Firestore);

  async cadastrarColaborador(dados: Omit<Colaborador, 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(this.firestore, 'colaboradores'), {
        ...dados,
        createdAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error('Erro Firebase:', error.code, error.message);
      }
      throw error;
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