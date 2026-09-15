// Mock Database and Authentication System
class AuthSystem {
  constructor() {
    this.initializeStorage()
    this.currentUser = this.getCurrentUser()
  }

  initializeStorage() {
    // Initialize users storage if it doesn't exist
    if (!localStorage.getItem("cyboard_users")) {
      const defaultUsers = [
        {
          id: 1,
          email: "admin@cyboard.com",
          password: "admin123",
          name: "Admin User",
          role: "admin",
          createdAt: new Date().toISOString(),
        },
      ]
      localStorage.setItem("cyboard_users", JSON.stringify(defaultUsers))
    }

    // Initialize properties storage if it doesn't exist
    if (!localStorage.getItem("cyboard_properties")) {
      const defaultProperties = [
        {
          id: 1,
          title: "Cozy Studio Near University",
          location: "Jaro, Iloilo City",
          price: 8000,
          type: "Studio",
          amenities: ["WiFi", "AC", "Kitchen"],
          image: "/cozy-studio-apartment.png",
          ownerId: 1,
          status: "available",
        },
        {
          id: 2,
          title: "Shared Room for Students",
          location: "La Paz, Iloilo City",
          price: 5000,
          type: "Shared",
          amenities: ["WiFi", "Laundry", "Common Area"],
          image: "/shared-student-room.jpg",
          ownerId: 1,
          status: "available",
        },
      ]
      localStorage.setItem("cyboard_properties", JSON.stringify(defaultProperties))
    }
  }

  // User Registration
  register(userData) {
    const users = JSON.parse(localStorage.getItem("cyboard_users") || "[]")

    // Check if email already exists
    if (users.find((user) => user.email === userData.email)) {
      return { success: false, message: "Email already exists" }
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      email: userData.email,
      password: userData.password,
      name: userData.name,
      role: "user",
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem("cyboard_users", JSON.stringify(users))

    return { success: true, message: "Registration successful", user: newUser }
  }

  // User Login
  login(email, password) {
    const users = JSON.parse(localStorage.getItem("cyboard_users") || "[]")
    const user = users.find((u) => u.email === email && u.password === password)

    if (user) {
      localStorage.setItem("cyboard_current_user", JSON.stringify(user))
      this.currentUser = user
      return { success: true, message: "Login successful", user }
    }

    return { success: false, message: "Invalid email or password" }
  }

  // User Logout
  logout() {
    localStorage.removeItem("cyboard_current_user")
    this.currentUser = null
    window.location.href = "index.html"
  }

  // Get Current User
  getCurrentUser() {
    const user = localStorage.getItem("cyboard_current_user")
    return user ? JSON.parse(user) : null
  }

  // Check if user is admin
  isAdmin() {
    return this.currentUser && this.currentUser.role === "admin"
  }

  // Check if user is logged in
  isLoggedIn() {
    return this.currentUser !== null
  }

  // Get all users (admin only)
  getAllUsers() {
    if (!this.isAdmin()) return []
    return JSON.parse(localStorage.getItem("cyboard_users") || "[]")
  }

  // Delete user (admin only)
  deleteUser(userId) {
    if (!this.isAdmin()) return { success: false, message: "Unauthorized" }

    const users = JSON.parse(localStorage.getItem("cyboard_users") || "[]")
    const filteredUsers = users.filter((user) => user.id !== userId)
    localStorage.setItem("cyboard_users", JSON.stringify(filteredUsers))

    return { success: true, message: "User deleted successfully" }
  }

  // Get all properties
  getAllProperties() {
    return JSON.parse(localStorage.getItem("cyboard_properties") || "[]")
  }

  // Add property (admin only)
  addProperty(propertyData) {
    if (!this.isAdmin()) return { success: false, message: "Unauthorized" }

    const properties = JSON.parse(localStorage.getItem("cyboard_properties") || "[]")
    const newProperty = {
      id: Date.now(),
      ...propertyData,
      ownerId: this.currentUser.id,
      status: "available",
    }

    properties.push(newProperty)
    localStorage.setItem("cyboard_properties", JSON.stringify(properties))

    return { success: true, message: "Property added successfully", property: newProperty }
  }

  // Delete property (admin only)
  deleteProperty(propertyId) {
    if (!this.isAdmin()) return { success: false, message: "Unauthorized" }

    const properties = JSON.parse(localStorage.getItem("cyboard_properties") || "[]")
    const filteredProperties = properties.filter((property) => property.id !== propertyId)
    localStorage.setItem("cyboard_properties", JSON.stringify(filteredProperties))

    return { success: true, message: "Property deleted successfully" }
  }
}

// Initialize auth system
const auth = new AuthSystem()

// Utility functions
function showMessage(message, type = "info") {
  const messageDiv = document.createElement("div")
  messageDiv.className = `message message-${type}`
  messageDiv.textContent = message
  messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `

  if (type === "success") messageDiv.style.backgroundColor = "#4CAF50"
  else if (type === "error") messageDiv.style.backgroundColor = "#f44336"
  else messageDiv.style.backgroundColor = "#2196F3"

  document.body.appendChild(messageDiv)

  setTimeout(() => {
    messageDiv.remove()
  }, 3000)
}

function updateNavigation() {
  const nav = document.querySelector("nav ul")
  if (!nav) return

  const authLinks = nav.querySelector(".auth-links")
  if (authLinks) authLinks.remove()

  const authLinksContainer = document.createElement("div")
  authLinksContainer.className = "auth-links"
  authLinksContainer.style.cssText = "display: flex; gap: 15px; margin-left: auto;"

  if (auth.isLoggedIn()) {
    authLinksContainer.innerHTML = `
            <span style="color: white; padding: 10px;">Welcome, ${auth.currentUser.name}</span>
            ${auth.isAdmin() ? '<a href="admin.html" style="color: white; text-decoration: none; padding: 10px; background: rgba(255,255,255,0.2); border-radius: 5px;">Admin</a>' : ""}
            <button onclick="auth.logout()" style="color: white; background: #ff4757; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;">Logout</button>
        `
  } else {
    authLinksContainer.innerHTML = `
            <a href="index.html" style="color: white; text-decoration: none; padding: 10px; background: rgba(255,255,255,0.2); border-radius: 5px;">Login / Register</a>
        `
  }

  nav.appendChild(authLinksContainer)
}

// Initialize navigation on page load
document.addEventListener("DOMContentLoaded", updateNavigation)
