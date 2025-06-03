import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Configuration Firebase pour le développement
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app) 