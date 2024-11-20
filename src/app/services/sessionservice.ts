import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs, query, orderBy, addDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private firestore: Firestore) {}

  /**
   *.
   * @param date.
   * @param time.
   */
  async createSession(date: string, time: string) {
    const sessionData = {
      date,
      time,
      pensamiento: '', 
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

  /**
   * 
   * @param session 
   */
  async updateSession(session: { id: string; date: string; time: string; pensamiento: string }): Promise<void> {
    try {
      const sessionDocRef = doc(this.firestore, `sessions/${session.id}`);
      await updateDoc(sessionDocRef, {
        date: session.date,
        time: session.time,
        pensamiento: session.pensamiento,
        updatedAt: new Date().toISOString(),
      });
      console.log('Sesión actualizada correctamente.');
    } catch (error) {
      console.error('Error al actualizar la sesión:', error);
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

  async getSelectSessions() {
    try {
      const sessionsCollection = collection(this.firestore, 'selectsessions');
      const q = query(sessionsCollection);
      const querySnapshot = await getDocs(q);

      const selectsessions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('Tipos de sesiones obtenidas:', selectsessions);
      return selectsessions;
    } catch (error) {
      console.error('Error al obtener el tipo de sesiones:', error);
      throw error;
    }
  }
}
