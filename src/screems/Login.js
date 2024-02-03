import React, {useState} from 'react'

//IMPORTANDO CREDENCIALES
import firebaseApp from "../firebase/credenciales";
import { getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword 
} from "firebase/auth";

//IMPORTANDO BASE DE DATOS
import { getFirestore, doc, setDoc } from "firebase/firestore";

//VARIABLE DE CREDENCIALES
const auth = getAuth(firebaseApp);



//FUNCION LOGIN
function Login() {
  //VARIABLE DE BD
  const firestore = getFirestore(firebaseApp);

  const [isRegistrando, setIsRegistrando] = useState(false);

  //FUNCION PARA REGISTRAR USUARIO ASYNCRONA
  async function registrarUsuario(email, password, rol) {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth, 
      email, 
      password
      ).then((usuarioFirebase) => {
        return usuarioFirebase
      });

      console.log(infoUsuario.user.uid);

      const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
      setDoc(docuRef, {
        correo: email,
        rol: rol,
      })
  }

  //FUNCION PARA REGISTRAR
  function submitHandler(e) {
    e.preventDefault();
    
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = e.target.elements.rol.value;

    console.log('submit', email, password, rol);

    if (isRegistrando) {
      //UTILIZAMOS LA FUNCION DE ARRIBA registrarUsuario();
      registrarUsuario(email,password,rol);
    } else {
      //Login
      signInWithEmailAndPassword(auth, email, password)
    }
  }


  return( 
  <div> 
    <h1>{isRegistrando ? "Registrate" : "Inicia Sesion"}</h1>
  

    {/* FORMULARIO */}
    <form onSubmit= { submitHandler }>
      <label>
        Correo Electronico:
        <input type='email' id='email'/>
      </label> 

      <label>
        Contraseña:
        <input type='password' id='password'/>
      </label>

      <label>
        Rol:
        <select id='rol'>
          <option value="admin">Administrador</option>
          <option value="user">Usuarios</option>
        </select>
      </label>

      <input
        type='submit'
        value={isRegistrando ? "Registrar" : "Iniciar Sesion"}
      />
    </form> 

    {/* BOTON DE OPCIONES REGISTRAR O YA TENGO CUENTA */}
    <button onClick={()=> setIsRegistrando(!isRegistrando)}>
      {isRegistrando ? "Ya tengo una cuenta" : "Quiero registrarme"}
    </button>
  </div>)
  
}

export default Login
