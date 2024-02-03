import React from 'react'

import AdminView from "../components/AdminView";
import UserView from "../components/UserView";


//IMPORTANDO CREDENCIALES
import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(firebaseApp);


function Home({ user }) {
  return (
    <div>
      Homeee 
      <button onClick={()=> signOut(auth)}>CERRAR SESION</button>


      {user.rol === 'admin' ? <AdminView /> : <UserView />}
    </div>
  );
  
  
}
export default Home