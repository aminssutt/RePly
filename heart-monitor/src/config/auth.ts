import usersData from './users.json'

interface User {
  email: string
  password: string
  weight: string
  height: string
  age: string
  gender: string
  activityLevel: string
}

interface AuthResponse {
  success: boolean
  error?: string
  user?: Omit<User, 'password'>
}

class AuthService {
  private currentUser: User | null = null
  private users: User[] = []

  constructor() {
    // Charger les utilisateurs depuis le localStorage au démarrage
    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
      this.users = JSON.parse(storedUsers)
    } else {
      // Si aucun utilisateur n'est stocké, initialiser avec les données du fichier JSON
      this.users = usersData.users
      this.saveUsers()
    }
  }

  private saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users))
  }

  async signIn(email: string, password: string): Promise<User | null> {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000))

    const user = this.users.find(u => u.email === email && u.password === password)
    if (user) {
      this.currentUser = user
      localStorage.setItem('currentUser', JSON.stringify(user))
      return user
    }
    throw new Error('Email ou mot de passe invalide')
  }

  async signUp(userData: User): Promise<User | null> {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000))

    const existingUser = this.users.find(u => u.email === userData.email)
    if (existingUser) {
      throw new Error('Cet email est déjà utilisé')
    }

    const newUser = { ...userData }
    this.users.push(newUser)
    this.saveUsers()
    this.currentUser = newUser
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    return newUser
  }

  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) {
      return this.currentUser
    }

    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser)
      return this.currentUser
    }

    return null
  }

  signOut(): void {
    this.currentUser = null
    localStorage.removeItem('currentUser')
  }

  // Méthode pour réinitialiser les données (utile pour le débogage)
  resetData(): void {
    this.users = []
    this.currentUser = null
    localStorage.removeItem('users')
    localStorage.removeItem('currentUser')
  }
}

export const authService = new AuthService() 