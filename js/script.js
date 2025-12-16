// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Table Data - ЗАПОЛНЕНА!
const tableData = [
    { 
        name: "NeoBank Dashboard", 
        client: "FinTech Startup", 
        year: "2024", 
        timeline: "3 months", 
        team: "4 people", 
        impact: "+42% engagement", 
        status: "completed" 
    },
    { 
        name: "MedTrack Pro", 
        client: "HealthTech Inc", 
        year: "2023", 
        timeline: "4 months", 
        team: "3 people", 
        impact: "+65% completion", 
        status: "completed" 
    },
    { 
        name: "UrbanStyle AR", 
        client: "Fashion Retail", 
        year: "2024", 
        timeline: "5 months", 
        team: "6 people", 
        impact: "+28% conversion", 
        status: "live" 
    },
    { 
        name: "Travel AI Assistant", 
        client: "TravelTech", 
        year: "2023", 
        timeline: "2 months", 
        team: "3 people", 
        impact: "+37% retention", 
        status: "live" 
    },
    { 
        name: "EduPlatform Redesign", 
        client: "EdTech Company", 
        year: "2024", 
        timeline: "6 months", 
        team: "5 people", 
        impact: "+51% outcomes", 
        status: "completed" 
    },
    { 
        name: "Smart Home App", 
        client: "IoT Solutions", 
        year: "2023", 
        timeline: "4 months", 
        team: "4 people", 
        impact: "+48% satisfaction", 
        status: "live" 
    },
    { 
        name: "Food Delivery Service", 
        client: "Delivery Startup", 
        year: "2024", 
        timeline: "3 months", 
        team: "3 people", 
        impact: "+33% frequency", 
        status: "completed" 
    },
    { 
        name: "Fitness Tracker", 
        client: "Health & Wellness", 
        year: "2024", 
        timeline: "5 months", 
        team: "5 people", 
        impact: "+56% active users", 
        status: "live" 
    }
];

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded - Vova Andrianov');
    
    // Initialize all components
    initTypewriter();
    initStatsCounter();
    initTable();
    initContactForm();
    initScrollAnimations();
    initNavigation();
    initProjectHover();
});

// Typewriter effect for hero
function initTypewriter() {
    const typingText = document.querySelector('.typing-text');
    const texts = [
        'PRODUCT DESIGNER',
        'UI/UX SPECIALIST',
        'FRONT-END DEVELOPER',
        'DIGITAL CREATOR'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function type() {
        const currentText = texts[textIndex];
        
        if (!isPaused) {
            if (!isDeleting && charIndex < currentText.length) {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(type, 100);
            } else if (isDeleting && charIndex > 0) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(type, 50);
            } else if (!isDeleting && charIndex === currentText.length) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    setTimeout(type, 1500);
                }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
            }
        }
    }

    // Start typing effect
    setTimeout(type, 1000);
}

// Animated stats counter
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

// Initialize table with data
function initTable() {
    const tbody = document.querySelector('#projectsTable tbody');
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Populate table with data
    tableData.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.name}</td>
            <td>${row.client}</td>
            <td>${row.year}</td>
            <td>${row.timeline}</td>
            <td>${row.team}</td>
            <td>${row.impact}</td>
            <td><span class="status-badge ${row.status}">${row.status.toUpperCase()}</span></td>
            <td><button class="table-action" data-index="${index}">VIEW</button></td>
        `;
        tbody.appendChild(tr);
    });
    
    // Add click events for actions
    document.querySelectorAll('.table-action').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            showProjectDetails(index);
        });
    });
    
    // Table sorting
    document.getElementById('sortName').addEventListener('click', () => {
        sortTable('name');
    });
    
    document.getElementById('sortImpact').addEventListener('click', () => {
        sortTable('impact');
    });
    
    document.getElementById('highlightLive').addEventListener('click', () => {
        highlightLiveProjects();
    });
    
    document.getElementById('resetTable').addEventListener('click', () => {
        resetTable();
    });
    
    // Add hover effects
    tbody.querySelectorAll('tr').forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.backgroundColor = 'rgba(0, 255, 157, 0.05)';
        });
        
        row.addEventListener('mouseleave', () => {
            row.style.backgroundColor = '';
        });
    });
}

function sortTable(sortBy) {
    const tbody = document.querySelector('#projectsTable tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        const aValue = a.cells[sortBy === 'name' ? 0 : 5].textContent;
        const bValue = b.cells[sortBy === 'name' ? 0 : 5].textContent;
        
        if (sortBy === 'name') {
            return aValue.localeCompare(bValue);
        } else {
            // Extract numbers from impact string (e.g., "+42% engagement" -> 42)
            const aNum = parseInt(aValue.match(/\d+/)?.[0] || 0);
            const bNum = parseInt(bValue.match(/\d+/)?.[0] || 0);
            return bNum - aNum;
        }
    });
    
    // Animate sorting
    rows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        setTimeout(() => {
            tbody.appendChild(row);
            gsap.to(row, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                delay: index * 0.05
            });
        }, 50);
    });
}

function highlightLiveProjects() {
    const rows = document.querySelectorAll('#projectsTable tbody tr');
    
    rows.forEach(row => {
        if (row.cells[6].textContent.includes('LIVE')) {
            gsap.to(row, {
                backgroundColor: 'rgba(0, 255, 157, 0.1)',
                duration: 0.5,
                yoyo: true,
                repeat: 1
            });
        } else {
            row.style.opacity = '0.5';
        }
    });
}

function resetTable() {
    const rows = document.querySelectorAll('#projectsTable tbody tr');
    
    rows.forEach(row => {
        row.style.backgroundColor = '';
        row.style.opacity = '1';
    });
}

function showProjectDetails(index) {
    const project = tableData[index];
    alert(`📊 Project Details:\n\n📁 Name: ${project.name}\n👥 Client: ${project.client}\n📅 Year: ${project.year}\n⏱️ Timeline: ${project.timeline}\n👨‍💻 Team: ${project.team}\n📈 Impact: ${project.impact}\n✅ Status: ${project.status}`);
}

// Contact form
function initContactForm() {
    const form = document.getElementById('contactForm');
    const messageDiv = document.getElementById('formMessage');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showMessage('Sending message...', 'info');
        
        setTimeout(() => {
            showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            
            // Reset message after 5 seconds
            setTimeout(() => {
                messageDiv.textContent = '';
                messageDiv.className = '';
            }, 5000);
        }, 1500);
    });
    
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = type;
        messageDiv.style.color = type === 'success' ? 'var(--accent-green)' : 
                               type === 'error' ? 'var(--accent-red)' : 
                               'var(--accent-cyan)';
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

// Scroll animations
function initScrollAnimations() {
    // Animate project cards on scroll
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out"
        });
    });
    
    // Animate about section
    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
    
    gsap.from('.skills-terminal', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
    
    // Animate metrics table
    gsap.from('.metrics-terminal', {
        scrollTrigger: {
            trigger: '.metrics',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });
}

// Navigation
function initNavigation() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button
    document.querySelector('.back-top').addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Project hover effects
function initProjectHover() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});