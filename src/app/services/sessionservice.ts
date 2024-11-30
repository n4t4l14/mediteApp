import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, doc, getDocs, query, orderBy, addDoc, updateDoc } from '@angular/fire/firestore';
import { where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private firestore: Firestore, private auth: Auth) {
  }

  /**
   *.
   * @param date.
   * @param time.
   */
  async createSession(date: string, time: string, typesession: string) {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('No hay usuario autenticado.');
    }
    const sessionData = {
      
      date,
      time,
      pensamiento: '', 
      createdAt: new Date().toISOString(),
      typesession,
      check: false,
      userId: user.uid
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
  async updateSession(session: { id: string; date: string; time: string; pensamiento: string ; check: boolean}): Promise<void> {
    try {
      const sessionDocRef = doc(this.firestore, `sessions/${session.id}`);
      await updateDoc(sessionDocRef, {
        date: session.date,
        time: session.time,
        pensamiento: session.pensamiento,
        updatedAt: new Date().toISOString(),
        check: session.check
      });
      console.log('Sesión actualizada correctamente.');
    } catch (error) {
      console.error('Error al actualizar la sesión:', error);
      throw error;
    }
  }

  async getSessions() {
    
      const user = this.auth.currentUser;   
      console.log('Usuario autenticado: ' + user?.uid);     
      if (!user) {
        throw new Error('No hay usuario autenticado.');
      }
      try {
      const sessionsCollection = collection(this.firestore, 'sessions');
      const q = query(
        sessionsCollection, 
        where('userId', '==', user.uid),
        orderBy('date', 'desc')
      );
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
      const selectsessionsCollection = collection(this.firestore, 'selectsessions');
      const q = query(selectsessionsCollection, orderBy('title', 'asc'));
      const querySnapshot = await getDocs(q);

      const sessions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('opciones de sesiones obtenidas:', sessions);
      return sessions;
    } catch (error) {
      console.error('Error al obtener las opciones de sesiones:', error);
      throw error;
    }
  }
}
