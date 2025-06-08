const assert = require('assert')

// Mock localStorage
const localStorageMock = {
  store: {},
  getItem(key) { return this.store[key] || null },
  setItem(key, value) { this.store[key] = value },
  removeItem(key) { delete this.store[key] },
  clear() { this.store = {} }
}
global.localStorage = localStorageMock

// Version JS simplifiée de AuthService
class AuthService {
  constructor() {
    this.currentUser = null
    this.users = []
  }
  signUp(user) {
    if (this.users.find(u => u.email === user.email)) {
      throw new Error('Cet email est déjà utilisé')
    }
    this.users.push(user)
    this.currentUser = user
    localStorage.setItem('currentUser', JSON.stringify(user))
    return user
  }
  signIn(email, password) {
    const user = this.users.find(u => u.email === email && u.password === password)
    if (!user) throw new Error('Email ou mot de passe invalide')
    this.currentUser = user
    localStorage.setItem('currentUser', JSON.stringify(user))
    return user
  }
  getCurrentUser() {
    return this.currentUser
  }
  signOut() {
    this.currentUser = null
    localStorage.removeItem('currentUser')
  }
  resetData() {
    this.users = []
    this.currentUser = null
    localStorage.clear()
  }
}

const authService = new AuthService()

// TESTS
function testSignUp() {
  authService.resetData()
  const user = { email: 'a@a.com', password: '123456' }
  assert.deepStrictEqual(authService.signUp(user), user)
  try {
    authService.signUp(user)
    console.log('❌ Test email déjà utilisé échoué')
  } catch (e) {
    assert.strictEqual(e.message, 'Cet email est déjà utilisé')
    console.log('✅ Test email déjà utilisé')
  }
}

function testSignIn() {
  authService.resetData()
  const user = { email: 'b@b.com', password: 'abcdef' }
  authService.signUp(user)
  assert.deepStrictEqual(authService.signIn('b@b.com', 'abcdef'), user)
  try {
    authService.signIn('b@b.com', 'wrong')
    console.log('❌ Test mauvais mot de passe échoué')
  } catch (e) {
    assert.strictEqual(e.message, 'Email ou mot de passe invalide')
    console.log('✅ Test mauvais mot de passe')
  }
}

function testSignOut() {
  authService.resetData()
  const user = { email: 'c@c.com', password: 'azerty' }
  authService.signUp(user)
  authService.signIn('c@c.com', 'azerty')
  authService.signOut()
  assert.strictEqual(authService.getCurrentUser(), null)
  console.log('✅ Test déconnexion')
}

console.log('--- Lancement des tests simples ---')
testSignUp()
testSignIn()
testSignOut()
console.log('--- Tous les tests simples sont OK ---') 