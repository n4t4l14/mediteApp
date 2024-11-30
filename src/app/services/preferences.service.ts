import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { inject } from '@angular/core';

interface Preferences {
    name: string;
    isEnabled: boolean;
  }
  
@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  // Guardar las preferencias del usuario
  async savePreferences(preferences: any) {
    const user = this.auth.currentUser;
    if (user) {
      const preferencesRef = doc(this.firestore, `preferences/${user.uid}`);
      await setDoc(preferencesRef, { preferences });
      console.log('Preferencias guardadas en Firestore.');
    } else {
      console.log('No hay usuario autenticado.');
    }
  }

  // Obtener las preferencias del usuario
  async getPreferences() {
    const user = this.auth.currentUser;
    if (user) {
      const preferencesRef = doc(this.firestore, `preferences/${user.uid}`);
      const docSnap = await getDoc(preferencesRef); // Usamos getDoc para obtener el documento
      if (docSnap.exists()) {
        return docSnap.data() as {preferences: Preferences[]} ; // Accedemos a los datos del documento
      } else {
        console.log('No se encontraron preferencias para este usuario.');
        return null;
      }
    }
    return null;
  }
}
