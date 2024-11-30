import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  // Registrar usuario
  async register(email: string, password: string, name: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const uid = userCredential.user.uid;

      // Guardar información adicional en Firestore
      const userRef = doc(this.firestore, `users/${uid}`);
      await setDoc(userRef, { name, email });
      return userCredential;
    } catch (error) {
      console.error('Error en el registro:', error);
      throw error;
    }
  }

  // Iniciar sesión
  async login(email: string, password: string) {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      throw error;
    }
  }

  // Cerrar sesión
  async logout() {
    await signOut(this.auth);
  }
}
