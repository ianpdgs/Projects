const restaurantsData = [
  {
    id: 1,
    name: "Pizza Palace",
    category: "pizza",
    rating: 4.8,
    reviews: 245,
    deliveryTime: "25-30 min",
    deliveryFee: "$2.99",
    icon: "🍕",
    menu: [
      {
        id: 101,
        name: "Margherita Pizza",
        description: "Fresh mozzarella, basil, tomato sauce",
        price: 12.99,
        icon: "🍕",
      },
      { id: 102, name: "Pepperoni Pizza", description: "Classic pepperoni with cheese", price: 14.99, icon: "🍕" },
      { id: 103, name: "Veggie Pizza", description: "Bell peppers, onions, mushrooms", price: 13.99, icon: "🍕" },
      { id: 104, name: "Garlic Bread", description: "Crispy bread with garlic butter", price: 5.99, icon: "🥖" },
    ],
  },
  {
    id: 2,
    name: "Burger Barn",
    category: "burger",
    rating: 4.6,
    reviews: 189,
    deliveryTime: "20-25 min",
    deliveryFee: "$1.99",
    icon: "🍔",
    menu: [
      { id: 201, name: "Classic Burger", description: "Beef patty, lettuce, tomato, cheese", price: 9.99, icon: "🍔" },
      {
        id: 202,
        name: "Double Cheeseburger",
        description: "Two beef patties with double cheese",
        price: 12.99,
        icon: "🍔",
      },
      { id: 203, name: "Bacon Burger", description: "Crispy bacon with cheddar cheese", price: 11.99, icon: "🍔" },
      { id: 204, name: "French Fries", description: "Golden crispy fries", price: 4.99, icon: "🍟" },
    ],
  },
  {
    id: 3,
    name: "Asian Fusion",
    category: "asian",
    rating: 4.7,
    reviews: 312,
    deliveryTime: "30-35 min",
    deliveryFee: "$3.99",
    icon: "🍜",
    menu: [
      {
        id: 301,
        name: "Pad Thai",
        description: "Stir-fried noodles with shrimp and peanuts",
        price: 11.99,
        icon: "🍜",
      },
      {
        id: 302,
        name: "Chicken Fried Rice",
        description: "Jasmine rice with chicken and vegetables",
        price: 10.99,
        icon: "🍚",
      },
      { id: 303, name: "Spring Rolls", description: "Crispy rolls with peanut sauce", price: 7.99, icon: "🥟" },
      { id: 304, name: "Mango Sticky Rice", description: "Sweet mango with sticky rice", price: 6.99, icon: "🥭" },
    ],
  },
  {
    id: 4,
    name: "Sweet Treats",
    category: "dessert",
    rating: 4.9,
    reviews: 428,
    deliveryTime: "15-20 min",
    deliveryFee: "$1.99",
    icon: "🍰",
    menu: [
      { id: 401, name: "Chocolate Cake", description: "Rich chocolate cake with frosting", price: 8.99, icon: "🍰" },
      { id: 402, name: "Cheesecake", description: "Creamy New York style cheesecake", price: 9.99, icon: "🍰" },
      { id: 403, name: "Ice Cream Sundae", description: "Vanilla ice cream with toppings", price: 6.99, icon: "🍨" },
      { id: 404, name: "Donut Box", description: "Assorted glazed donuts (6 pack)", price: 7.99, icon: "🍩" },
    ],
  },
]

let cart = []
let currentRestaurant = null
let currentItem = null
let currentQuantity = 1
let orderHistory = []

document.addEventListener("DOMContentLoaded", () => {
  loadCartFromStorage()
  loadOrderHistory()
  renderRestaurants()
  setupEventListeners()
  updateCartCount()
  updateOrdersCount()
  renderCart()
  renderOrders()
})

function setupEventListeners() {
  // Navigation
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const section = e.target.closest(".nav-link").dataset.section
      navigateToSection(section)
    })
  })

  // Search and Filter
  document.getElementById("searchInput").addEventListener("input", filterRestaurants)
  document.getElementById("categoryFilter").addEventListener("change", filterRestaurants)

  document.addEventListener("change", (e) => {
    if (e.target.classList.contains("cart-quantity-input")) {
      const itemId = Number.parseInt(e.target.dataset.itemId)
      const newQuantity = Number.parseInt(e.target.value)
      updateCartItemQuantity(itemId, newQuantity)
    }
  })
}

// Navigation
function navigateToSection(sectionId) {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active")
  })

  document.getElementById(sectionId).classList.add("active")

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.dataset.section === sectionId) {
      link.classList.add("active")
    }
  })

  window.scrollTo(0, 0)
}

// Render Restaurants
function renderRestaurants() {
  const grid = document.getElementById("restaurantsGrid")
  grid.innerHTML = restaurantsData
    .map(
      (restaurant) => `
        <div class="restaurant-card" onclick="selectRestaurant(${restaurant.id})">
            <div class="restaurant-image">${restaurant.icon}</div>
            <div class="restaurant-info">
                <div class="restaurant-name">${restaurant.name}</div>
                <div class="restaurant-category">${restaurant.category.charAt(0).toUpperCase() + restaurant.category.slice(1)}</div>
                <div class="restaurant-rating">
                    <span class="rating-stars">⭐ ${restaurant.rating}</span>
                    <span>(${restaurant.reviews})</span>
                </div>
                <div class="restaurant-meta">
                    <span>⏱️ ${restaurant.deliveryTime}</span>
                    <span>🚚 ${restaurant.deliveryFee}</span>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Filter Restaurants
function filterRestaurants() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase()
  const category = document.getElementById("categoryFilter").value

  const filtered = restaurantsData.filter((restaurant) => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm)
    const matchesCategory = !category || restaurant.category === category
    return matchesSearch && matchesCategory
  })

  const grid = document.getElementById("restaurantsGrid")
  if (filtered.length === 0) {
    grid.innerHTML =
      '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #999;">No restaurants found</div>'
  } else {
    grid.innerHTML = filtered
      .map(
        (restaurant) => `
            <div class="restaurant-card" onclick="selectRestaurant(${restaurant.id})">
                <div class="restaurant-image">${restaurant.icon}</div>
                <div class="restaurant-info">
                    <div class="restaurant-name">${restaurant.name}</div>
                    <div class="restaurant-category">${restaurant.category.charAt(0).toUpperCase() + restaurant.category.slice(1)}</div>
                    <div class="restaurant-rating">
                        <span class="rating-stars">⭐ ${restaurant.rating}</span>
                        <span>(${restaurant.reviews})</span>
                    </div>
                    <div class="restaurant-meta">
                        <span>⏱️ ${restaurant.deliveryTime}</span>
                        <span>🚚 ${restaurant.deliveryFee}</span>
                    </div>
                </div>
            </div>
        `,
      )
      .join("")
  }
}

// Select Restaurant
function selectRestaurant(restaurantId) {
  currentRestaurant = restaurantsData.find((r) => r.id === restaurantId)
  document.getElementById("restaurantName").textContent = currentRestaurant.name
  renderMenu()
  navigateToSection("menu")
}

// Render Menu
function renderMenu() {
  const grid = document.getElementById("menuGrid")
  grid.innerHTML = currentRestaurant.menu
    .map(
      (item) => `
        <div class="menu-item" onclick="openItemModal(${item.id})">
            <div class="menu-item-image">${item.icon}</div>
            <div class="menu-item-content">
                <div class="menu-item-name">${item.name}</div>
                <div class="menu-item-description">${item.description}</div>
                <div class="menu-item-footer">
                    <div class="menu-item-price">$${item.price.toFixed(2)}</div>
                    <button class="btn btn-primary" onclick="event.stopPropagation(); openItemModal(${item.id})">Add</button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

function openItemModal(itemId) {
  currentItem = currentRestaurant.menu.find((item) => item.id === itemId)
  currentQuantity = 1

  document.getElementById("itemName").textContent = currentItem.name
  document.getElementById("itemDescription").textContent = currentItem.description
  document.getElementById("itemPrice").textContent = `$${currentItem.price.toFixed(2)}`
  document.getElementById("itemImage").textContent = currentItem.icon
  document.getElementById("quantity").value = 1

  document.getElementById("itemModal").classList.add("active")
}

function closeModal() {
  document.getElementById("itemModal").classList.remove("active")
  currentQuantity = 1
}

function increaseQuantity() {
  currentQuantity++
  document.getElementById("quantity").value = currentQuantity
}

function decreaseQuantity() {
  if (currentQuantity > 1) {
    currentQuantity--
    document.getElementById("quantity").value = currentQuantity
  }
}

function addToCart() {
  const quantity = Number.parseInt(document.getElementById("quantity").value)

  if (quantity < 1) {
    showNotification("Please select a valid quantity", "error")
    return
  }

  const existingItem = cart.find((item) => item.id === currentItem.id)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({
      ...currentItem,
      quantity: quantity,
      restaurantId: currentRestaurant.id,
      restaurantName: currentRestaurant.name,
    })
  }

  saveCartToStorage()
  updateCartCount()
  renderCart()
  closeModal()
  showNotification(`${currentItem.name} added to cart!`, "success")
}

function removeFromCart(itemId) {
  const item = cart.find((i) => i.id === itemId)
  cart = cart.filter((item) => item.id !== itemId)
  saveCartToStorage()
  updateCartCount()
  renderCart()
  showNotification(`${item.name} removed from cart`, "success")
}

function updateCartItemQuantity(itemId, quantity) {
  const item = cart.find((item) => item.id === itemId)
  if (item) {
    const newQuantity = Math.max(1, Number.parseInt(quantity))
    item.quantity = newQuantity
    saveCartToStorage()
    updateCartCount()
    renderCart()
  }
}

function renderCart() {
  const cartItemsContainer = document.getElementById("cartItems")

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
                <button class="btn btn-primary" onclick="navigateToSection('restaurants')" style="margin-top: 1rem;">Start Ordering</button>
            </div>
        `
    document.querySelector(".cart-summary").style.display = "none"
    return
  }

  document.querySelector(".cart-summary").style.display = "block"

  cartItemsContainer.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <div class="cart-item-image">${item.icon}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
                <div style="font-size: 0.85rem; color: #999; margin-top: 0.25rem;">${item.restaurantName}</div>
            </div>
            <div class="cart-item-controls">
                <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})">−</button>
                <input type="number" class="cart-quantity-input" data-item-id="${item.id}" value="${item.quantity}" min="1">
                <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <div style="text-align: right;">
                <div style="font-weight: bold; color: var(--primary-color); margin-bottom: 0.5rem;">$${(item.price * item.quantity).toFixed(2)}</div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `,
    )
    .join("")

  updateCartSummary()
}

function updateCartSummary() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 2.99
  const tax = subtotal * 0.08
  const total = subtotal + deliveryFee + tax

  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`
  document.getElementById("tax").textContent = `$${tax.toFixed(2)}`
  document.getElementById("total").textContent = `$${total.toFixed(2)}`
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  document.getElementById("cartCount").textContent = count
}

function updateOrdersCount() {
  document.getElementById("ordersCount").textContent = orderHistory.length
}

function renderOrders() {
  const ordersList = document.getElementById("ordersList")

  if (orderHistory.length === 0) {
    ordersList.innerHTML = `
            <div class="empty-orders">
                <div class="empty-orders-icon">📋</div>
                <p>No orders yet</p>
                <button class="btn btn-primary" onclick="navigateToSection('restaurants')" style="margin-top: 1rem;">Start Ordering</button>
            </div>
        `
    return
  }

  ordersList.innerHTML = orderHistory
    .map(
      (order) => `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <div class="order-id">${order.id}</div>
                    <div class="order-date">${order.timestamp}</div>
                </div>
                <div class="order-status">✓ Delivered</div>
            </div>
            <div class="order-items">
                ${order.items
                  .map(
                    (item) => `
                    <div class="order-item">
                        <span class="order-item-name">${item.quantity}x ${item.name}</span>
                        <span class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `,
                  )
                  .join("")}
            </div>
            <div class="order-footer">
                <div class="order-total">Total: $${order.total.toFixed(2)}</div>
                <div class="order-delivery">
                    <div>Delivered at ${order.estimatedDelivery}</div>
                    <div style="font-size: 0.85rem; margin-top: 0.25rem;">From: ${order.items[0].restaurantName}</div>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

function checkout() {
  if (cart.length === 0) {
    showNotification("Your cart is empty!", "error")
    return
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const total = subtotal + 2.99 + tax

  document.getElementById("checkoutSubtotal").textContent = `$${subtotal.toFixed(2)}`
  document.getElementById("checkoutTax").textContent = `$${tax.toFixed(2)}`
  document.getElementById("checkoutTotal").textContent = `$${total.toFixed(2)}`

  document.getElementById("checkoutForm").reset()
  document.getElementById("checkoutModal").classList.add("active")
}

function closeCheckout() {
  document.getElementById("checkoutModal").classList.remove("active")
}

function submitOrder(event) {
  event.preventDefault()

  const fullName = document.getElementById("fullName").value.trim()
  const email = document.getElementById("email").value.trim()
  const phone = document.getElementById("phone").value.trim()
  const address = document.getElementById("address").value.trim()
  const paymentMethod = document.getElementById("paymentMethod").value

  if (!fullName || !email || !phone || !address || !paymentMethod) {
    showNotification("Please fill in all required fields", "error")
    return
  }

  if (!/^\d{10}$/.test(phone.replace(/\D/g, ""))) {
    showNotification("Please enter a valid phone number", "error")
    return
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const total = subtotal + 2.99 + tax

  const order = {
    id: "ORD" + Date.now(),
    customerName: fullName,
    email: email,
    phone: phone,
    address: address,
    paymentMethod: paymentMethod,
    items: [...cart],
    subtotal: subtotal,
    tax: tax,
    deliveryFee: 2.99,
    total: total,
    timestamp: new Date().toLocaleString(),
    estimatedDelivery: new Date(Date.now() + 30 * 60000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  }

  orderHistory.push(order)
  saveOrderHistory()

  document.getElementById("orderId").textContent = order.id
  document.getElementById("confirmationTotal").textContent = `$${order.total.toFixed(2)}`
  document.getElementById("deliveryTime").textContent = order.estimatedDelivery
  document.getElementById("confirmationMessage").textContent =
    `Your order from ${cart[0].restaurantName} has been confirmed!`

  closeCheckout()
  document.getElementById("confirmationModal").classList.add("active")

  cart = []
  saveCartToStorage()
  updateCartCount()
  renderCart()
  updateOrdersCount()
  renderOrders()
}

function closeConfirmation() {
  document.getElementById("confirmationModal").classList.remove("active")
  navigateToSection("restaurants")
}

// Storage Functions
function saveCartToStorage() {
  localStorage.setItem("cateringAppCart", JSON.stringify(cart))
}

function loadCartFromStorage() {
  const saved = localStorage.getItem("cateringAppCart")
  if (saved) {
    cart = JSON.parse(saved)
  }
}

function saveOrderHistory() {
  localStorage.setItem("cateringAppOrders", JSON.stringify(orderHistory))
}

function loadOrderHistory() {
  const saved = localStorage.getItem("cateringAppOrders")
  if (saved) {
    orderHistory = JSON.parse(saved)
  }
}

function showNotification(message, type = "success") {
  const notification = document.createElement("div")
  const bgColor = type === "error" ? "var(--error-color)" : "var(--success-color)"

  notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
    `
  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out"
    setTimeout(() => notification.remove(), 300)
  }, 3000)
}

// Add animation styles
const style = document.createElement("style")
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)
