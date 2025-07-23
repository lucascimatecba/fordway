import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, addDoc, query, getDocs, updateDoc, deleteDoc  } from '@angular/fire/firestore';
import { Cliente } from '../../shared/models/cliente.model';

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

  async obterClientes(): Promise<Cliente[]> {
    const q = query(collection(this.firestore, 'clientes'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()['createdAt']?.toDate()
    } as Cliente));
  }

  async atualizarStatusCliente(id: string, status: Cliente['status']): Promise<void> {
    await updateDoc(doc(this.firestore, 'clientes', id), { status });
  }

  async excluirCliente(id: string): Promise<void> {
    await deleteDoc(doc(this.firestore, 'clientes', id));
  }
}