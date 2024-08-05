import { initializeApp } from "firebase/app";
import { getAuth , updateEmail } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc , updateDoc } from "firebase/firestore"; 
import encrypt from "./validadores/encrypt";

const firebaseConfig = {
  apiKey: "AIzaSyA0cs-pFgNfuZ3WBB1-y-JWgIFO7HtabNk",
  authDomain: "dossier-f6634.firebaseapp.com",
  projectId: "dossier-f6634",
  storageBucket: "dossier-f6634.appspot.com",
  messagingSenderId: "372146943992",
  appId: "1:372146943992:web:4a95bf8bcb7087fdce880d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth}

//obtner referencias a la base de datos

  const db = getFirestore(app);

//funciones de registro

async function addUsr(nombre, apellidos, correo, contraseña, uid) {

  let encryptPass =  encrypt(contraseña)
  console.log(uid)
  try {

    await setDoc(doc(db, "usuarios", uid), {
      nombre: nombre,
      apellidos: apellidos,
      correo: correo,
      contraseña: encryptPass
    });

  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function editNombre(uid, nombre) {

  const referencia = doc(db, "usuarios", uid);

  await updateDoc(referencia, {
    nombre: nombre
  });
}

async function editApellidos(uid, apellidos) {

  const referencia = doc(db, "usuarios", uid);

  await updateDoc(referencia, {
    nombre: apellidos
  });
}

async function editEmail(currentUser, email) {
  updateEmail(currentUser, email).then(() => {

  }).catch((error) => {
    console.log(error)
  });
}

const exportFuncionesCuenta = {
  db,
  addUsr,
  editApellidos,
  editNombre,
  editEmail
}

export default exportFuncionesCuenta;
