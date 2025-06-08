import { describe, expect, it, beforeEach, vi } from 'vitest'
import { authService } from './auth'

describe('AuthService', () => {
  beforeEach(() => {
    // Réinitialiser les données avant chaque test
    authService.resetData()
    // Réinitialiser les mocks du localStorage
    vi.clearAllMocks()
  })

  describe('signUp', () => {
    const validUser = {
      email: 'test@example.com',
      password: 'password123',
      weight: '70',
      height: '175',
      age: '25',
      gender: 'male',
      activityLevel: 'moderate'
    }

    it('devrait créer un nouvel utilisateur avec des données valides', async () => {
      const user = await authService.signUp(validUser)
      expect(user).toEqual(validUser)
    })

    it('devrait rejeter un email invalide', async () => {
      const invalidUser = { ...validUser, email: 'invalid-email' }
      await expect(authService.signUp(invalidUser)).rejects.toThrow('Format d\'email invalide')
    })

    it('devrait rejeter un mot de passe trop court', async () => {
      const invalidUser = { ...validUser, password: '123' }
      await expect(authService.signUp(invalidUser)).rejects.toThrow('Le mot de passe doit contenir au moins 6 caractères')
    })

    it('devrait rejeter un utilisateur avec des champs manquants', async () => {
      const invalidUser = { ...validUser, weight: '' }
      await expect(authService.signUp(invalidUser)).rejects.toThrow('Tous les champs sont obligatoires')
    })

    it('devrait rejeter un email déjà utilisé', async () => {
      await authService.signUp(validUser)
      await expect(authService.signUp(validUser)).rejects.toThrow('Cet email est déjà utilisé')
    })
  })

  describe('signIn', () => {
    const validUser = {
      email: 'test@example.com',
      password: 'password123',
      weight: '70',
      height: '175',
      age: '25',
      gender: 'male',
      activityLevel: 'moderate'
    }

    beforeEach(async () => {
      await authService.signUp(validUser)
    })

    it('devrait connecter un utilisateur avec des identifiants valides', async () => {
      const user = await authService.signIn(validUser.email, validUser.password)
      expect(user).toEqual(validUser)
    })

    it('devrait rejeter un email invalide', async () => {
      await expect(authService.signIn('wrong@example.com', validUser.password))
        .rejects.toThrow('Email ou mot de passe invalide')
    })

    it('devrait rejeter un mot de passe invalide', async () => {
      await expect(authService.signIn(validUser.email, 'wrongpassword'))
        .rejects.toThrow('Email ou mot de passe invalide')
    })

    it('devrait rejeter une connexion sans email', async () => {
      await expect(authService.signIn('', validUser.password))
        .rejects.toThrow('Email et mot de passe requis')
    })

    it('devrait rejeter une connexion sans mot de passe', async () => {
      await expect(authService.signIn(validUser.email, ''))
        .rejects.toThrow('Email et mot de passe requis')
    })
  })

  describe('getCurrentUser', () => {
    const validUser = {
      email: 'test@example.com',
      password: 'password123',
      weight: '70',
      height: '175',
      age: '25',
      gender: 'male',
      activityLevel: 'moderate'
    }

    it('devrait retourner null quand aucun utilisateur n\'est connecté', async () => {
      const user = await authService.getCurrentUser()
      expect(user).toBeNull()
    })

    it('devrait retourner l\'utilisateur connecté', async () => {
      await authService.signUp(validUser)
      await authService.signIn(validUser.email, validUser.password)
      const user = await authService.getCurrentUser()
      expect(user).toEqual(validUser)
    })
  })

  describe('signOut', () => {
    const validUser = {
      email: 'test@example.com',
      password: 'password123',
      weight: '70',
      height: '175',
      age: '25',
      gender: 'male',
      activityLevel: 'moderate'
    }

    it('devrait déconnecter l\'utilisateur', async () => {
      await authService.signUp(validUser)
      await authService.signIn(validUser.email, validUser.password)
      authService.signOut()
      const user = await authService.getCurrentUser()
      expect(user).toBeNull()
    })
  })
}) 