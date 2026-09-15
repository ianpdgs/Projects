// script.js

// Sample boarding house data with coordinates for map
const properties = [
  {
    id: 1,
    title: "Cozy Jaro Apartment",
    location: "Jaro, Iloilo City",
    price: 3500,
    image: "img/jaro.jpg",
    type: "apartment",
    features: { beds: 1, baths: 1, area: "25 sqm" },
    description: "A cozy and modern apartment located in the heart of Jaro, just 5 minutes away from universities and shopping centers. Perfect for students and young professionals.",
    amenities: ["Wi-Fi", "Air Conditioning", "Kitchen", "Laundry", "Security"],
    contact: "0912-345-6789",
    lat: 10.7202,
    lng: 122.5621
  },
  {
    id: 2,
    title: "La Paz Boarding House",
    location: "La Paz, Iloilo City",
    price: 2500,
    image: "img/lapaz bh.jpg",
    type: "boarding-house",
    features: { beds: 1, baths: 1, area: "20 sqm" },
    description: "Affordable boarding house in La Paz with easy access to public transportation and local markets. Includes basic furnishings and utilities.",
    amenities: ["Fan", "Common CR", "Cooking Area", "Water Included"],
    contact: "0917-123-4567",
    lat: 10.7125,
    lng: 122.5628
  },
  {
    id: 3,
    title: "Mandurriao Dormitory",
    location: "Mandurriao, Iloilo City",
    price: 2800,
    image: "img/mandurriao.jpg",
    type: "dormitory",
    features: { beds: 1, baths: 1, area: "18 sqm" },
    description: "Student-friendly dormitory located near SM City Iloilo and other commercial establishments. Safe and secure environment with 24/7 security.",
    amenities: ["Wi-Fi", "Study Area", "Security", "Common Kitchen", "Laundry"],
    contact: "0918-765-4321",
    lat: 10.7200,
    lng: 122.5510
  },
  {
    id: 4,
    title: "City Proper Studio",
    location: "City Proper, Iloilo City",
    price: 4500,
    image: "https://via.placeholder.com/400x300?text=City+Proper+Studio",
    type: "apartment",
    features: { beds: 1, baths: 1, area: "28 sqm" },
    description: "Modern studio apartment in the city center with easy access to business districts, government offices, and cultural landmarks.",
    amenities: ["Air Conditioning", "Wi-Fi", "Cable TV", "Kitchenette", "Security"],
    contact: "0919-555-1234",
    lat: 10.7000,
    lng: 122.5640
  },
  {
    id: 5,
    title: "Molo Affordable Room",
    location: "Molo, Iloilo City",
    price: 2000,
    image: "https://via.placeholder.com/400x300?text=Molo+Affordable+Room",
    type: "boarding-house",
    features: { beds: 1, baths: 1, area: "15 sqm" },
    description: "Budget-friendly room for rent in a quiet neighborhood in Molo. Close to churches, markets, and public transportation.",
    amenities: ["Fan", "Shared CR", "Cooking Area", "Water Included"],
    contact: "0916-789-0123",
    lat: 10.7205,
    lng: 122.5530
  },
  {
    id: 6,
    title: "Jaro Executive Suite",
    location: "Jaro, Iloilo City",
    price: 6000,
    image: "https://via.placeholder.com/400x300?text=Jaro+Executive+Suite",
    type: "apartment",
    features: { beds: 1, baths: 1, area: "35 sqm" },
    description: "Premium executive suite with modern amenities and city views. Ideal for professionals looking for comfort and convenience.",
    amenities: ["Air Conditioning", "Wi-Fi", "Smart TV", "Kitchen", "Laundry", "Parking", "Gym Access"],
    contact: "0915-444-7777",
    lat: 10.7210,
    lng: 122.5600
  }
];

// DOM elements
const propertiesContainer = document.getElementById('properties-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('property-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const closeModalButton = document.querySelector('.close-modal');

let map;
let markers = [];

// Initialize Google Map
function initMap() {
  const center = { lat: 10.7167, lng: 122.5621 }; // Iloilo City center
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: center,
  });
  displayProperties(properties);
  placeMarkers(properties);
}

// Place markers on map
function placeMarkers(propertiesToShow) {
  // Clear existing markers
  markers.forEach(marker => marker.setMap(null));
  markers = [];

  propertiesToShow.forEach(property => {
    if (property.lat && property.lng) {
      const marker = new google.maps.Marker({
        position: { lat: property.lat, lng: property.lng },
        map: map,
        title: property.title,
      });
      marker.addListener('click', () => {
        showPropertyDetails(property.id);
      });
      markers.push(marker);
    }
  });
}

// Display properties in grid
function displayProperties(propertiesToShow) {
  propertiesContainer.innerHTML = '';
  if (propertiesToShow.length === 0) {
    propertiesContainer.innerHTML = `<p>No properties found matching your criteria.</p>`;
    return;
  }
  propertiesToShow.forEach(property => {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.innerHTML = `
      <img src="${property.image}" alt="${property.title}" class="property-image" />
      <div class="property-details">
        <h3 class="property-title">${property.title}</h3>
        <div class="property-location">📍 ${property.location}</div>
        <div class="property-price">₱${property.price.toLocaleString()}/month</div>
        <div class="property-features">
          <div class="property-feature">🛏️ ${property.features.beds} Bed</div>
          <div class="property-feature">🚿 ${property.features.baths} Bath</div>
          <div class="property-feature">📐 ${property.features.area}</div>
        </div>
        <button class="view-btn" data-id="${property.id}">View Details</button>
      </div>
    `;
    propertiesContainer.appendChild(card);
  });
  // Add event listeners to view buttons
  document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', () => {
      const id = parseInt(button.getAttribute('data-id'));
      showPropertyDetails(id);
    });
  });
}

// Show property details modal
function showPropertyDetails(id) {
  const property = properties.find(p => p.id === id);
  if (!property) return;
  modalTitle.textContent = property.title;
  modalBody.innerHTML = `
    <img src="${property.image}" alt="${property.title}" class="property-modal-image" />
    <div><strong>Location:</strong> ${property.location}</div>
    <div><strong>Price:</strong> ₱${property.price.toLocaleString()}/month</div>
    <p>${property.description}</p>
    <h3>Features</h3>
    <div class="modal-features">
      <div class="modal-feature">🛏️ ${property.features.beds} Bedroom</div>
      <div class="modal-feature">🚿 ${property.features.baths} Bathroom</div>
      <div class="modal-feature">📐 ${property.features.area}</div>
      <div class="modal-feature">🏢 ${property.type.charAt(0).toUpperCase() + property.type.slice(1)}</div>
    </div>
    <h3>Amenities</h3>
    <ul class="amenities-list">
      ${property.amenities.map(a => `<li>${a}</li>`).join('')}
    </ul>
    <button class="contact-btn" id="contact-owner">Contact Owner: ${property.contact}</button>
  `;
  modal.style.display = 'flex';

  document.getElementById('contact-owner').addEventListener('click', () => {
    alert(`You can contact the owner at ${property.contact}`);
  });
}

// Close modal
closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
});
modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Filter properties based on search form
function applyFilters() {
  const locationFilter = document.getElementById('location').value.toLowerCase();
  const typeFilter = document.getElementById('type').value.toLowerCase();
  const priceFilter = document.getElementById('price').value;

  let filtered = properties.filter(p => {
    let matchesLocation = locationFilter === '' || p.location.toLowerCase().includes(locationFilter);
    let matchesType = typeFilter === '' || p.type === typeFilter;
    let matchesPrice = priceFilter === '' || p.price <= parseInt(priceFilter);
    return matchesLocation && matchesType && matchesPrice;
  });

  // Also apply quick filter if any active
  const activeFilterBtn = document.querySelector('.filter-btn.active');
  if (activeFilterBtn && activeFilterBtn.dataset.filter !== 'all') {
    filtered = applyQuickFilter(activeFilterBtn.dataset.filter, filtered);
  }

  displayProperties(filtered);
  placeMarkers(filtered);
}

// Quick filter buttons functionality
function applyQuickFilter(filter, list = properties) {
  switch(filter) {
    case 'all':
      return list;
    case 'near-school':
      return list.filter(p =>
        p.location.toLowerCase().includes('jaro') ||
        p.description.toLowerCase().includes('student') ||
        p.description.toLowerCase().includes('university')
      );
    case 'affordable':
      return list.filter(p => p.price <= 3000);
    case 'furnished':
      return list.filter(p =>
        p.amenities.some(a => ['Air Conditioning', 'Furnished'].includes(a)) || p.type === 'apartment'
      );
    default:
      return list;
  }
}

// Filter buttons event listeners
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilters();
  });
});

// Contact form submission simulation
function submitContactForm(event) {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }
  alert(`Thank you, ${name}! Your message has been sent.`);
  document.getElementById('contact-form').reset();
}

// Navigation active link highlight on scroll
const navLinks = document.querySelectorAll('nav a');
window.addEventListener('scroll', () => {
  let fromTop = window.scrollY + 80;
  navLinks.forEach(link => {
    const section = document.querySelector(link.hash);
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Initialize page
window.initMap = initMap; // Google Maps callback
