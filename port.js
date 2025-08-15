
        // Project Carousel Class (dynamic slides & indicators)
        class ProjectCarousel {
            constructor(options = {}) {
                this.track = document.getElementById('carouselTrack');
                this.prevBtn = document.getElementById('prevBtn');
                this.nextBtn = document.getElementById('nextBtn');
                this.indicatorsContainer = document.getElementById('carouselIndicators');

                // internal state
                this.currentSlide = 0;
                this.slides = Array.from(this.track ? this.track.children : []);
                this.totalSlides = this.slides.length || 0;
                this.autoSlideInterval = null;

                // swipe/mouse variables
                this.startX = 0;
                this.endX = 0;
                this.isMouseDown = false;
                this.startMouseX = 0;
                this.endMouseX = 0;

                if (this.totalSlides > 0) {
                    this.init();
                }
            }

            init() {
                this.buildIndicators();
                this.updateCarousel();
                this.addEventListeners();
                this.startAutoSlide();
            }

            buildIndicators() {
                if (!this.indicatorsContainer) return;
                this.indicatorsContainer.innerHTML = '';
                this.indicators = [];

                for (let i = 0; i < this.totalSlides; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'indicator' + (i === 0 ? ' active' : '');
                    dot.setAttribute('data-slide', i);
                    dot.setAttribute('role', 'button');
                    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
                    dot.addEventListener('click', () => this.goToSlide(i));
                    this.indicatorsContainer.appendChild(dot);
                    this.indicators.push(dot);
                }
            }

            addEventListeners() {
                if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.previousSlide());
                if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());

                // touch support
                this.track.addEventListener('touchstart', (e) => {
                    this.startX = e.touches[0].clientX;
                });

                this.track.addEventListener('touchend', (e) => {
                    this.endX = e.changedTouches[0].clientX;
                    this.handleSwipe();
                });

                // mouse drag support
                this.track.addEventListener('mousedown', (e) => {
                    this.isMouseDown = true;
                    this.startMouseX = e.clientX;
                    this.track.style.cursor = 'grabbing';
                });

                document.addEventListener('mousemove', (e) => {
                    if (!this.isMouseDown) return;
                    e.preventDefault();
                });

                document.addEventListener('mouseup', (e) => {
                    if (!this.isMouseDown) return;
                    this.isMouseDown = false;
                    this.endMouseX = e.clientX;
                    this.track.style.cursor = 'grab';
                    this.handleMouseDrag();
                });

                // pause on hover
                this.track.addEventListener('mouseenter', () => this.stopAutoSlide());
                this.track.addEventListener('mouseleave', () => this.startAutoSlide());

                // keyboard support (left/right)
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') this.previousSlide();
                    if (e.key === 'ArrowRight') this.nextSlide();
                });
            }

            handleSwipe() {
                const threshold = 40;
                const diff = this.startX - this.endX;
                if (Math.abs(diff) > threshold) {
                    if (diff > 0) this.nextSlide();
                    else this.previousSlide();
                }
            }

            handleMouseDrag() {
                const threshold = 50;
                const diff = this.startMouseX - this.endMouseX;
                if (Math.abs(diff) > threshold) {
                    if (diff > 0) this.nextSlide();
                    else this.previousSlide();
                }
            }

            nextSlide() {
                this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
                this.updateCarousel();
                this.restartAutoSlide();
            }

            previousSlide() {
                this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
                this.updateCarousel();
                this.restartAutoSlide();
            }

            goToSlide(index) {
                if (index < 0 || index >= this.totalSlides) return;
                this.currentSlide = index;
                this.updateCarousel();
                this.restartAutoSlide();
            }

            updateCarousel() {
                const offset = -this.currentSlide * 100;
                this.track.style.transform = `translateX(${offset}%)`;
                // update indicators
                if (this.indicators && this.indicators.length) {
                    this.indicators.forEach((dot, idx) => {
                        dot.classList.toggle('active', idx === this.currentSlide);
                    });
                }
            }

            startAutoSlide() {
                if (this.autoSlideInterval) return;
                this.autoSlideInterval = setInterval(() => {
                    this.nextSlide();
                }, 5000);
            }

            stopAutoSlide() {
                clearInterval(this.autoSlideInterval);
                this.autoSlideInterval = null;
            }

            restartAutoSlide() {
                this.stopAutoSlide();
                this.startAutoSlide();
            }
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                const target = document.querySelector(href);
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        // Fade in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.addEventListener('DOMContentLoaded', () => {
            // Observe fade-in elements
            document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

            // Type writer effect (defensive null check)
            const heroTitleEl = document.querySelector('.hero-content h1');
            if (heroTitleEl) {
                const text = heroTitleEl.textContent;
                heroTitleEl.textContent = '';
                let i = 0;
                function typeWriter() {
                    if (i < text.length) {
                        heroTitleEl.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, 60);
                    }
                }
                setTimeout(typeWriter, 700);
            }

            // Initialize carousel
            new ProjectCarousel();
        });

        // Download resume function
        function downloadResume() {
            const resumeContent = `
KHAJA RAHMATHULLA
Full Stack Developer
📧 khajarahmathulla8931@gmail.com
📞 +91 6301654727
🌐 LinkedIn: https://www.linkedin.com/in/khaja-rahmathulla-360998316

PROFESSIONAL SUMMARY
Computer Science student with 9.31 CGPA and experience architecting 4+ web applications using JavaScript, API integrations, and modern frameworks.

TECHNICAL SKILLS
• Java, Python, C, JavaScript (ES6+)
• HTML5, CSS3, React.js, Bootstrap, Tailwind CSS, REST APIs
• JSP, Servlets, JDBC, Node.js, MySQL

EDUCATION
Raghu Engineering College (2023-2027)
B.Tech in Computer Science & Engineering
CGPA: 9.31/10.0

PROJECTS
1. Real-Time Weather Application
2. Currency Converter Application
3. Interactive Hand Cricket Game
4. Portfolio Website

ACHIEVEMENTS
• First Place Winner - Ideathon
• Top 5% Performer - Skillrack DSA
            `;

            const blob = new Blob([resumeContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Khaja_Rahmathulla_Resume.txt';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            alert('Resume downloaded successfully!');
        }

        // Floating elements (simple particles)
        function createFloatingElements() {
            const container = document.body;
            const colors = ['rgba(255, 255, 255, 0.06)', 'rgba(102, 126, 234, 0.06)', 'rgba(118, 75, 162, 0.06)'];

            for (let i = 0; i < 6; i++) {
                const element = document.createElement('div');
                element.style.position = 'fixed';
                element.style.width = Math.random() * 12 + 6 + 'px';
                element.style.height = element.style.width;
                element.style.background = colors[Math.floor(Math.random() * colors.length)];
                element.style.borderRadius = '50%';
                element.style.left = Math.random() * 100 + '%';
                element.style.top = Math.random() * 100 + '%';
                element.style.opacity = '0.45';
                element.style.pointerEvents = 'none';
                element.style.zIndex = '-1';

                container.appendChild(element);

                element.animate([
                    { transform: 'translateY(0px) translateX(0px)' },
                    { transform: `translateY(-${Math.random() * 120 + 40}px) translateX(${Math.random() * 120 - 60}px)` }
                ], {
                    duration: Math.random() * 4000 + 3000,
                    iterations: Infinity,
                    direction: 'alternate'
                });
            }
        }
        createFloatingElements();

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar-custom');
            if (!navbar) return;
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.14)';
                navbar.style.backdropFilter = 'blur(8px)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.06)';
                navbar.style.backdropFilter = 'blur(6px)';
            }
        });

        // Small page load fade
        window.addEventListener('load', function () {
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.8s ease';
                document.body.style.opacity = '1';
            }, 80);
        });

        // Easter egg (Konami)
        (function () {
            let konamiCode = [];
            const correctCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
            document.addEventListener('keydown', function (e) {
                konamiCode.push(e.code);
                if (konamiCode.length > correctCode.length) konamiCode.shift();
                if (JSON.stringify(konamiCode) === JSON.stringify(correctCode)) {
                    document.body.style.animation = 'rainbow 2s infinite';
                    setTimeout(() => {
                        document.body.style.animation = '';
                        alert('🎉 Easter egg activated! You found the secret code!');
                    }, 2000);
                }
            });
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }
            `;
            document.head.appendChild(style);
        })();