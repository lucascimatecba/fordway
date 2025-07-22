import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, getDocs } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class ClientesPrivService {
  private firestore = inject(Firestore);

  async adicionarCliente(cliente: any) {
    try {
      const docRef = await addDoc(collection(this.firestore, 'clientes'), {
        ...cliente,
        status: 'nao_contatado',
        createdAt: new Date()
      });
      return { id: docRef.id, ...cliente };
    } catch (error) {
      throw error;
    }
  }

  async obterClientes() {
    const querySnapshot = await getDocs(collection(this.firestore, 'clientes'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}