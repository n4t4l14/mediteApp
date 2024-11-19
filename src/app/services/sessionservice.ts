import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, orderBy, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private firestore: Firestore) {}

  async createSession(date: string, time: string) {
    const sessionData = {
      date,
      time,
      createdAt: new Date().toISOString(),
    };

    try {
      const sessionsCollection = collection(this.firestore, 'sessions');
      await addDoc(sessionsCollection, sessionData);
      console.log('Sesión guardada correctamente.');
    } catch (error) {
      console.error('Error al guardar la sesión:', error);
      throw error;
    }
  }

  async getSessions() {
    try {
      const sessionsCollection = collection(this.firestore, 'sessions');
      const q = query(sessionsCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const sessions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('Sesiones obtenidas:', sessions);
      return sessions;
    } catch (error) {
      console.error('Error al obtener las sesiones:', error);
      throw error;
    }
  }
}
