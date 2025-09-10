// src/stores/auth.js
import { defineStore } from 'pinia'
import axios from 'axios' // For making API requests
import router from '@/routers/index.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null, // Load token from localStorage on init
    isLoggedIn: !!localStorage.getItem('token'), // Check if token exists on init
    loginError: null,
  }),
  getters: {
    isAuthenticated: (state) => state.isLoggedIn,
    currentUser: (state) => state.user,
  },
  actions: {
    async login(credentials) {
      try {
        this.loginError = null // Clear previous errors

        // Simulate API call - replace with your actual backend endpoint
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, credentials)

        const { user, accessToken } = response.data

        this.user = user
        this.token = accessToken
        this.isLoggedIn = true

        // Store token in localStorage for persistence
        localStorage.setItem('token', accessToken)
        // Optionally store user data if needed for display
        localStorage.setItem('user', JSON.stringify(user))

        // Set Authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

        // Redirect to a protected dashboard or home page
        router.push('/admin/dashboard')
      } catch (error) {
        console.error('Login failed:', error)
        //this.loginError = error.response?.data?.message || 'Invalid credentials';
        //this.logout(); // Ensure state is cleared on failed login
      }
    },
    async logout() {
      this.user = null
      this.token = null
      this.isLoggedIn = false
      this.loginError = null

      // If using Laravel Sanctum
      //await axios.post(`${import.meta.env.VITE_API_URL}/logout`) // Optional: for Sanctum logout

      // Clear from localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      // Remove Authorization header
      delete axios.defaults.headers.common['Authorization']

      // Redirect to login page
      router.push('/');
    },
    // Action to initialize authentication state from localStorage on app load
    initializeAuth() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      if (token && user) {
        this.token = token
        this.user = JSON.parse(user)
        this.isLoggedIn = true
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } else {
        this.logout() // Ensure clean state if only one exists or is invalid
      }
    },
  },
})
