import { initializeApp } from "firebase/app";

//Credenciales
const firebaseConfig = {
    apiKey: "AIzaSyAN6dImU5qIil4b0SNiSfuy8t52IsVxVms",
    authDomain: "inicio-bellagio.firebaseapp.com",
    projectId: "inicio-bellagio",
    storageBucket: "inicio-bellagio.appspot.com",
    messagingSenderId: "514064681413",
    appId: "1:514064681413:web:2fc0fdbf157b5cb42963ac",
};

//Inicio de a aplicacion y la guarda en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;