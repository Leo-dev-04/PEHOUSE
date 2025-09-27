// Sample pet data (In a real application, this would come from a database)
const samplePets = [
    {
        id: 1,
        name: "Luna",
        type: "gatos",
        age: "2 años",
        size: "Mediano",
        description: "Luna es una gata muy cariñosa que busca una familia que le dé mucho amor. Le encanta jugar y dormir al sol.",
        organization: "Albergue Esperanza",
        contact: "info@albergueesperanza.com"
    },
    {
        id: 2,
        name: "Max",
        type: "perros",
        age: "3 años",
        size: "Grande",
        description: "Max es un perro muy juguetón y leal. Es perfecto para familias con niños y le encanta salir a caminar.",
        organization: "Veterinaria San Francisco",
        contact: "contacto@vetsanfrancisco.com"
    },
    {
        id: 3,
        name: "Mimi",
        type: "gatos",
        age: "1 año",
        size: "Pequeño",
        description: "Mimi es una gatita muy dulce y tranquila. Es perfecta para apartamentos y personas que buscan compañía silenciosa.",
        organization: "Rescatistas Unidos",
        contact: "rescatistasunidos@email.com"
    },
    {
        id: 4,
        name: "Rocky",
        type: "perros",
        age: "5 años",
        size: "Mediano",
        description: "Rocky es un perro maduro y equilibrado. Ya está entrenado y es perfecto para personas que buscan un compañero tranquilo.",
        organization: "Albergue Ciudad",
        contact: "info@albergueciudad.org"
    },
    {
        id: 5,
        name: "Coco",
        type: "otros",
        age: "1 año",
        size: "Pequeño",
        description: "Coco es un conejo muy sociable que busca un hogar donde pueda saltar y jugar libremente.",
        organization: "Rescate de Mascotas Exóticas",
        contact: "exoticas@rescate.com"
    },
    {
        id: 6,
        name: "Bella",
        type: "perros",
        age: "2 años",
        size: "Pequeño",
        description: "Bella es una perrita muy cariñosa y energética. Le encanta jugar y es muy inteligente para aprender trucos.",
        organization: "Albergue Esperanza",
        contact: "info@albergueesperanza.com"
    }
];

class PetHouseApp {
    constructor() {
        this.pets = samplePets;
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupPetFilters();
        this.setupForms();
        this.renderPets();
        this.setupSmoothScrolling();
        this.setupAnimations();
    }

    setupNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Highlight active section in navigation
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupPetFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update current filter and render pets
                this.currentFilter = button.dataset.filter;
                this.renderPets();
            });
        });
    }

    renderPets() {
        const petsGrid = document.getElementById('petsGrid');
        if (!petsGrid) return;

        // Filter pets based on current filter
        let filteredPets = this.pets;
        if (this.currentFilter !== 'all') {
            filteredPets = this.pets.filter(pet => pet.type === this.currentFilter);
        }

        // Render pet cards
        petsGrid.innerHTML = filteredPets.map(pet => this.createPetCard(pet)).join('');
        
        // Add animation
        const petCards = petsGrid.querySelectorAll('.pet-card');
        petCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 100);
        });
    }

    createPetCard(pet) {
        const typeIcons = {
            'perros': 'fas fa-dog',
            'gatos': 'fas fa-cat',
            'otros': 'fas fa-paw'
        };

        return `
            <div class="pet-card">
                <div class="pet-image">
                    <i class="${typeIcons[pet.type] || 'fas fa-paw'}"></i>
                </div>
                <div class="pet-info">
                    <h3 class="pet-name">${pet.name}</h3>
                    <div class="pet-details">
                        <span>${pet.age}</span> • <span>${pet.size}</span>
                    </div>
                    <p class="pet-description">${pet.description}</p>
                    <div class="pet-contact">
                        <span class="pet-organization">${pet.organization}</span>
                        <button class="contact-btn" onclick="app.contactOrganization('${pet.contact}', '${pet.name}')">
                            Contactar
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    contactOrganization(email, petName) {
        const subject = `Interés en adoptar a ${petName}`;
        const body = `Hola,\n\nEstoy interesado/a en adoptar a ${petName}. Me gustaría obtener más información sobre el proceso de adopción.\n\nGracias,`;
        
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    }

    setupForms() {
        this.setupRegistrationForm();
        this.setupContactForm();
    }

    setupRegistrationForm() {
        const form = document.getElementById('registrationForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                this.showNotification('¡Registro enviado exitosamente! Te contactaremos pronto.', 'success');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    setupContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                this.showNotification('¡Mensaje enviado exitosamente! Te responderemos pronto.', 'success');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe sections for animation
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add styles for notification
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 1001;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        `;

        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1rem;
            padding: 0;
        `;

        // Add to DOM and animate
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Method to add new pets (for future use)
    addPet(petData) {
        const newPet = {
            id: this.pets.length + 1,
            ...petData
        };
        this.pets.push(newPet);
        this.renderPets();
    }

    // Method to search pets (for future use)
    searchPets(query) {
        const filtered = this.pets.filter(pet => 
            pet.name.toLowerCase().includes(query.toLowerCase()) ||
            pet.description.toLowerCase().includes(query.toLowerCase()) ||
            pet.organization.toLowerCase().includes(query.toLowerCase())
        );
        
        const petsGrid = document.getElementById('petsGrid');
        if (petsGrid) {
            petsGrid.innerHTML = filtered.map(pet => this.createPetCard(pet)).join('');
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new PetHouseApp();
    
    // Add some loading animation
    document.body.classList.add('fade-in');
});

// Handle form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#e5e7eb';
        }
    });
    
    return isValid;
}

// Handle email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Handle phone validation
function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Utility functions
const utils = {
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('es-ES');
    },
    
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
};

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PetHouseApp, utils };
}