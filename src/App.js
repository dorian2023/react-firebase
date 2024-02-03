import React, { useState } from "react";

import Home from "./screems/Home";
import Login from "./screems/Login";

import firebaseApp from "./firebase/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function App() {
  const [user, setUser] = useState(null);

  //FUNCION PARA LOS ROLES
  async function getRol(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    return infoFinal;
  }

  //FUNCION PARA ESTABLECER EL ROL DEL USUARIO
  async function setUserWithFirebaseAndRol (usuarioFirebase){
    getRol(usuarioFirebase.uid).then((rol) =>{ 
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUser(userData);
      console.log("Usuario Final", userData)
    });
  }

  onAuthStateChanged(auth, (usuarioFirebase) =>{
    if (usuarioFirebase) {
      //FUNCION FINAL
      if (!user) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }



    } else {
      setUser(null);
    }
  })

  return <>{user ? <Home user={user} /> : <Login />}</>;
}

export default App;
