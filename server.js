
import express from 'express'
import bcrypt from 'bcrypt'
import { initializeApp } from 'firebase/app'
import { collection, getDoc, getFirestore, setDoc, doc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyA38VLzQ0ODYxvycIoL-mIN5YdtDL-j6AY",
 authDomain: "integrador-ffe3e.firebaseapp.com",
 projectId: "integrador-ffe3e",
 storageBucket: "integrador-ffe3e.appspot.com",
 messagingSenderId: "1018051851238",
 appId: "1:1018051851238:web:5ae41a810cb651981c9c27"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig)
const db = getFirestore()

// Inicializar el servidor
const app = express()

// Inicializamos el Middleware
app.use(express.static('public'))
app.use(express.json())




// Rutas del Backend
// Ruta Home
app.get('/', (req, res) => {
 res.sendFile('index.html', {root: 'public'})
})

// ruta login 
app.get('/login', (req, res) => {
 res.sendFile('login.html', {root: 'public'})
})

// signup 
app.get('/signup', (req, res) => {
res.sendFile('signup.html', {root: 'public'})
})

app.post('/signup', (req, res) => {
  const {fname, email, phone, job, pass} = req.body

  const users = collection(db, "users")
  getDoc(doc(users, email)).then(user => {
    if(user.exists ()) {
      return res.json({
        'mensaje': 'correo ya existente'
      })
    } else {
      //Encriptar la contraseña
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(pass, salt, (err, hash) => {
          req.body.pass = hash
          setDoc(doc(users, email), req.body).then(data => {
            res.json({
              'mensaje': 'seccess', 
              'data': {
                fname,
                email,
                phone
              }
            })
          })
        })
      })
    }
  })
})

// Arrancamos el servidor
const Port = process.env.PORT || 5000
app.listen(Port, () => {
 console.log(`Server in Port: ${Port}`)
})

