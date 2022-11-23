import express from 'express'
import bcrypt from 'bcrypt'
import { initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvpzA-SjgPzFa6N4mZwnphQB-_Xh6uEYg",
  authDomain: "integrador-9aa2a.firebaseapp.com",
  projectId: "integrador-9aa2a",
  storageBucket: "integrador-9aa2a.appspot.com",
  messagingSenderId: "471250525389",
  appId: "1:471250525389:web:9f8c207b3139718bcadd84"
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore()


//inicializar el server
const app = express()

//inicializamos el middleware
app.use(express.static('public'))
app.use(express.json())

//Rutas del backend
//Ruta home
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: 'public'})
})

//Arrancamos el server
const Port = process.env.Port || 5000
app.listen(Port, () => {
    console.log(`Server in Port: ${Port}`)
})