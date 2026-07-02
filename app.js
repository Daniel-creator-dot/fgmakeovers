/* ==========================================================================
   FG MAKEOVERS - APPLICATION CORE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 0. Admin Configuration ---
    // Change this to the published CSV URL of the owner's Google Sheet
    const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1JvqTnv_9l3kB5el5gdpfjx-EyjYLd4icfijNrAPuSo0/export?format=csv";

    // --- 1. Service Data ---
    const services = [
        // --- Bridal Services ---
        {
            id: 1,
            title: "Bridal Trial & Consultation",
            price: 1000,
            duration: 90,
            category: "bridal",
            shortDesc: "Private consultation and preview session to co-create your custom wedding-day look.",
            longDesc: "A private 90-minute trial session in our studio. We discuss your theme, outfit, jewelry, and personal preferences, and perform a full test application of the makeup to ensure you are 100% satisfied with your final bridal look before the wedding day.",
            image: "assets/images/bridal_trial.png",
            gallery: [
                "assets/images/bridal_trial.png",
                "assets/images/white_bridal.png",
                "assets/images/traditional_bridal.png"
            ],
            highlights: [
                "Full face trial application",
                "Color matching & undertone check",
                "Theme & mood board review",
                "Product longevity testing",
                "Lash sizing & styling options"
            ]
        },
        {
            id: 2,
            title: "Bridal Makeup (White Wedding)",
            price: 2500,
            duration: 120,
            category: "bridal",
            shortDesc: "Luminous, long-wear luxury bridal makeup tailored for your white wedding ceremony.",
            longDesc: "Premium bridal beauty package designed to look absolutely flawless under photographer flash and in natural light. We use waterproof and sweat-resistant luxury products to guarantee a radiant finish that lasts throughout the ceremony and reception.",
            image: "assets/images/white_bridal.png",
            gallery: [
                "assets/images/white_bridal.png",
                "assets/images/traditional_bridal.png",
                "assets/images/court_bridal.png",
                "assets/images/bridal_trial.png"
            ],
            highlights: [
                "Luxury skin prep & deep hydration",
                "Camera-ready high-definition finish",
                "Premium individual cluster lashes",
                "On-day touch-up kit (lipstick & blotting paper)",
                "Neck, shoulder, & collarbone body shimmer"
            ]
        },
        {
            id: 3,
            title: "Bridal Makeup (Traditional Wedding)",
            price: 2500,
            duration: 120,
            category: "bridal",
            shortDesc: "Rich, culturally-harmonized traditional wedding glam highlighting your natural features.",
            longDesc: "Specifically curated to match the bold patterns and colors of your traditional Kente outfit. This service ensures your complexion looks smooth, radiant, and perfectly balanced, presenting a flawless traditional bride.",
            image: "assets/images/traditional_bridal.png",
            gallery: [
                "assets/images/traditional_bridal.png",
                "assets/images/white_bridal.png",
                "assets/images/court_bridal.png",
                "assets/images/bridal_trial.png"
            ],
            highlights: [
                "Kente-matched color mapping",
                "Sweat-resistant matte or dewy finish",
                "Signature soft glam eye definition",
                "On-day touch-up kit",
                "Full body highlight application"
            ]
        },
        {
            id: 4,
            title: "Court Wedding Makeup",
            price: 1500,
            duration: 90,
            category: "bridal",
            shortDesc: "Elegant, polished, and timeless makeup styling for your civil registry ceremony.",
            longDesc: "A chic, understated glam that emphasizes clean skin textures and natural definition. Perfect for registry entries, court house weddings, and small intimate gatherings.",
            image: "assets/images/court_bridal.png",
            gallery: [
                "assets/images/court_bridal.png",
                "assets/images/white_bridal.png",
                "assets/images/bridal_trial.png"
            ],
            highlights: [
                "Natural radiant finish base",
                "Classic soft eye shading & brow grooming",
                "Long-wear lip contouring",
                "Setting mist lock for durability",
                "Premium synthetic strip lashes"
            ]
        },
        {
            id: 5,
            title: "Bridal Reception Makeup",
            price: 1200,
            duration: 90,
            category: "bridal",
            shortDesc: "Stunning glam transition or second-look refresh for your reception entrance.",
            longDesc: "A glam touch-up or full transition look for your wedding reception. Turn up the drama with glitter details, bold lips, or high-fashion edits for your reception dress change.",
            image: "assets/images/birthday_glam.png",
            gallery: [
                "assets/images/birthday_glam.png",
                "assets/images/white_bridal.png",
                "assets/images/dinner_glam.png"
            ],
            highlights: [
                "Quick makeup transition from ceremony look",
                "Optional bold lip color change",
                "Added shimmer or graphic liner detailing",
                "T-zone control & oil blotting refresh",
                "Lash check and enhancement"
            ]
        },
        {
            id: 6,
            title: "Thanksgiving Makeup",
            price: 800,
            duration: 75,
            category: "bridal",
            shortDesc: "Sophisticated and glowing makeup for thanksgiving services and post-wedding celebrations.",
            longDesc: "A beautiful, fresh, and radiant look designed for thanksgiving services or family gatherings following your wedding celebrations. Keep the bridal glow alive with this light-capturing makeup package.",
            image: "assets/images/natural.png",
            gallery: [
                "assets/images/natural.png",
                "assets/images/traditional_bridal.png",
                "assets/images/special.png"
            ],
            highlights: [
                "Luminous hydrating skin base",
                "Soft, elegant eye look",
                "Warm color palettes (gold/terracotta)",
                "Full-day wear locking system",
                "Classic natural lash styling"
            ]
        },
        // --- Event Makeup ---
        {
            id: 7,
            title: "Birthday Glam",
            price: 800,
            duration: 75,
            category: "glam",
            shortDesc: "Bespoke beauty styling to make you the star of your birthday celebration.",
            longDesc: "Indulge in a signature birthday makeover. From bold cut-creases to a seamless bronze glow, this look is customized to match your theme, birthday outfit, and confidence level.",
            image: "assets/images/birthday_glam.png",
            gallery: [
                "assets/images/birthday_glam.png",
                "assets/images/special.png",
                "assets/images/dinner_glam.png"
            ],
            highlights: [
                "Full skin prep & facial mapping",
                "Bespoke eyeshadow technique",
                "Premium synthetic lashes included",
                "High-definition nose & cheek contour",
                "Long-lasting setting lock"
            ]
        },
        {
            id: 8,
            title: "Photoshoot Makeup",
            price: 1000,
            duration: 90,
            category: "creative",
            shortDesc: "Studio-lighting friendly makeup designed for photoshoots, branding, or editorial concepts.",
            longDesc: "A specialized photoshoot makeup application. Formulated with zero-flashback powders and high-definition creams so that your skin looks flawless under high-intensity photography lights.",
            image: "assets/images/editorial.png",
            gallery: [
                "assets/images/editorial.png",
                "assets/images/special.png",
                "assets/images/natural.png"
            ],
            highlights: [
                "Zero flashback product mapping",
                "Bold facial contouring for camera angles",
                "Symmetry brow styling",
                "Lash customization matching look",
                "Body highlight for open-neck shoots"
            ]
        },
        {
            id: 9,
            title: "Dinner Event Makeup",
            price: 800,
            duration: 75,
            category: "glam",
            shortDesc: "Elegant and sophisticated evening makeup for gala dinners and black-tie events.",
            longDesc: "Sophisticated glam perfect for evening lights and dinner halls. We focus on enhancing your eyes and lips to create a timeless evening aesthetic.",
            image: "assets/images/dinner_glam.png",
            gallery: [
                "assets/images/dinner_glam.png",
                "assets/images/special.png",
                "assets/images/birthday_glam.png"
            ],
            highlights: [
                "Premium evening skincare prep",
                "Smoky eye or classic wing liner options",
                "Deep lip color mapping",
                "Soft focal highlighting",
                "Lightweight lashes"
            ]
        },
        {
            id: 10,
            title: "Graduation Makeup",
            price: 700,
            duration: 75,
            category: "glam",
            shortDesc: "Fresh, camera-ready makeup to celebrate your academic achievement.",
            longDesc: "A fresh and glowing look designed to photograph beautifully under your graduation cap and gown, keeping you looking radiant all day during photos and family ceremonies.",
            image: "assets/images/graduation.png",
            gallery: [
                "assets/images/graduation.png",
                "assets/images/natural.png",
                "assets/images/special.png"
            ],
            highlights: [
                "Cap-friendly brow and forehead setting",
                "Radiant soft blush and bronze",
                "Groomed brows and light liner",
                "Transfer-proof setting lock",
                "Natural volume lashes"
            ]
        },
        {
            id: 11,
            title: "Corporate Event Makeup",
            price: 800,
            duration: 75,
            category: "glam",
            shortDesc: "Clean, elegant, and headshot-ready makeup for business functions and professional profiles.",
            longDesc: "A clean, modern look designed to look professional, polished, and structured. Perfect for business meetings, conferences, headshots, and corporate parties.",
            image: "assets/images/corporate.png",
            gallery: [
                "assets/images/corporate.png",
                "assets/images/natural.png",
                "assets/images/special.png"
            ],
            highlights: [
                "Matte control long-wear base",
                "Neutral eye contours & soft lip colors",
                "Light-reflecting under-eye brightener",
                "Natural brow fill-in",
                "Mascara or very light individual lashes"
            ]
        },
        {
            id: 12,
            title: "Guest Makeup",
            price: 700,
            duration: 75,
            category: "glam",
            shortDesc: "Beautifully balanced makeup look for wedding guests or celebration attendees.",
            longDesc: "Look elegant and feel confident as a wedding guest or event attendee. A balanced soft glam that complements your styling without overshadowing the hosts.",
            image: "assets/images/special.png",
            gallery: [
                "assets/images/special.png",
                "assets/images/natural.png",
                "assets/images/dinner_glam.png"
            ],
            highlights: [
                "Full-face event color match",
                "Defined brows & flattering shadow",
                "Quality strip lashes",
                "Long-wear complexion setting",
                "Glossy or satin lip finish"
            ]
        },
        // --- Makeup Lessons ---
        {
            id: 13,
            title: "One-on-One Classes",
            price: 1500,
            duration: 180,
            category: "lessons",
            shortDesc: "Personalized private makeup lesson teaching you how to master your own face.",
            longDesc: "A private 3-hour session where you learn how to prep your skin, select the right foundation shade, and master an everyday-to-glam transition. Includes personal makeup bag audit and brush technique coaching.",
            image: "assets/images/one_on_one.png",
            gallery: [
                "assets/images/one_on_one.png",
                "assets/images/masterclass.png",
                "assets/images/natural.png"
            ],
            highlights: [
                "Skin undertone analysis",
                "Step-by-step everyday look mastery",
                "Half-face application guidance",
                "Makeup kit audit & buying list",
                "Certificate of completion"
            ]
        },
        {
            id: 14,
            title: "Group Classes",
            price: 2500,
            duration: 180,
            category: "lessons",
            shortDesc: "Fun, interactive group lesson for friends, bridal showers, or corporate bonding.",
            longDesc: "A lively 3-hour class for groups of 3-6 people. Perfect for a bridal party or girls' night out. Learn signature soft glam techniques, product blending, and everyday beauty hacks together.",
            image: "assets/images/group.png",
            gallery: [
                "assets/images/group.png",
                "assets/images/masterclass.png",
                "assets/images/natural.png"
            ],
            highlights: [
                "Interactive live demonstration",
                "Hands-on practice with artist guidance",
                "Q&A session on skincare & tools"
            ]
        },
        {
            id: 15,
            title: "Masterclasses",
            price: 3500,
            duration: 240,
            category: "lessons",
            shortDesc: "Advanced professional class covering skin prep, photography mapping, and bridal looks.",
            longDesc: "A detailed 4-hour advanced masterclass for aspiring or practicing makeup artists. Covers advanced skin preparation, color correction, photographic highlight/contour mapping, and commercial bridal techniques.",
            image: "assets/images/masterclass.png",
            gallery: [
                "assets/images/masterclass.png",
                "assets/images/group.png",
                "assets/images/editorial.png"
            ],
            highlights: [
                "Advanced skin-prep & texturizing secrets",
                "HD photography mapping & symmetry",
                "Bridal contract & business insights",
                "Professional masterclass certification",
                "Gift pack from sponsor cosmetic brands"
            ]
        },
        // --- Bridal Packages ---
        {
            id: 16,
            title: "Single Ceremony Package",
            price: 1500,
            duration: 120,
            category: "packages",
            shortDesc: "Perfect for the bride who desires elegance for a single celebration.",
            longDesc: "Single Ceremony Bridal Makeup (choose from Traditional, Court, or White Wedding). Price: GH₵1,500 GHS.",
            image: "assets/images/white_bridal.png",
            gallery: ["assets/images/white_bridal.png", "assets/images/traditional_bridal.png", "assets/images/court_bridal.png"],
            highlights: ["Traditional, Court, or White Wedding", "Premium long-wear makeup", "Includes lashes & touch-up kit"]
        },
        {
            id: 17,
            title: "Two-Day Wedding Package",
            price: 3000,
            duration: 120,
            category: "packages",
            shortDesc: "Designed for brides celebrating love across two unforgettable days.",
            longDesc: "Two-Day Wedding Bridal Makeup (includes both Traditional and White Wedding on separate days). Price: GH₵3,000 GHS.",
            image: "assets/images/traditional_bridal.png",
            gallery: ["assets/images/traditional_bridal.png", "assets/images/white_bridal.png"],
            highlights: ["Traditional Wedding Makeup", "White Wedding Makeup", "On separate days", "Includes lashes & touch-up kits"]
        },
        {
            id: 18,
            title: "One-Day Wedding Package",
            price: 3500,
            duration: 180,
            category: "packages",
            shortDesc: "For the bride embracing every moment of her wedding day journey.",
            longDesc: "One-Day Wedding Bridal Makeup (includes both Traditional and White Wedding on the same day with up to 4hr wait interval). Price: GH₵3,500 GHS.",
            image: "assets/images/white_bridal.png",
            gallery: ["assets/images/white_bridal.png", "assets/images/traditional_bridal.png"],
            highlights: ["Traditional & White Wedding on same day", "Up to 4-hour wait interval between looks", "Includes lashes & touch-up kits"]
        },
        {
            id: 19,
            title: "Full-Day Wedding Package",
            price: 5000,
            duration: 180,
            category: "packages",
            shortDesc: "A seamless full-day beauty experience from ceremony to reception.",
            longDesc: "Full-Day Wedding Bridal Makeup (includes Traditional Wedding, White Wedding, and Reception transition makeup). Price: GH₵5,000 GHS.",
            image: "assets/images/birthday_glam.png",
            gallery: ["assets/images/white_bridal.png", "assets/images/traditional_bridal.png", "assets/images/birthday_glam.png"],
            highlights: ["Traditional Wedding Makeup", "White Wedding Makeup", "Reception transition / second look", "Includes lashes & touch-up kits"]
        },
        {
            id: 20,
            title: "Luxury Bridal Package",
            price: 6500,
            duration: 240,
            category: "packages",
            shortDesc: "The ultimate bridal luxury experience.",
            longDesc: "Luxury Bridal Package - Ultimate Bridal Makeup (includes Bridal Trial Session, Traditional Wedding & Reception, White Wedding & Reception, and Thanksgiving Service makeup). Price: GH₵6,500 GHS.",
            image: "assets/images/white_bridal.png",
            gallery: ["assets/images/white_bridal.png", "assets/images/traditional_bridal.png", "assets/images/birthday_glam.png", "assets/images/natural.png"],
            highlights: ["Bridal Trial & Consultation", "Traditional Wedding & Reception", "White Wedding & Reception", "Thanksgiving Service Makeup"]
        }
    ];

    // --- 2. State Variables ---
    let currentActiveBooking = null; // Stores booking details during creation
    let currentSelectedDate = null;
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    const mockBookedSlots = JSON.parse(localStorage.getItem('fg_makeovers_bookings')) || [];

    // Google Sheets Blocked Dates (loaded dynamically)
    let googleBlockedDates = [];
    
    function fetchBlockedDates() {
        if (!GOOGLE_SHEET_CSV_URL || GOOGLE_SHEET_CSV_URL.includes("YOUR_SHEET_ID_HERE") || GOOGLE_SHEET_CSV_URL.includes("YOUR_PUBLISHED_ID")) {
            return Promise.resolve([]);
        }
        return fetch(GOOGLE_SHEET_CSV_URL)
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.text();
            })
            .then(csvText => {
                // Split by newlines and match YYYY-MM-DD
                const dates = csvText.split(/\r?\n/)
                    .map(line => line.trim())
                    .filter(line => /^\d{4}-\d{2}-\d{2}$/.test(line));
                googleBlockedDates = dates;
                return dates;
            })
            .catch(err => {
                console.error("Failed to load blocked dates from Google Sheets:", err);
                return [];
            });
    }

    // --- 3. DOM Cache ---
    const appView = document.getElementById('app-view');
    const views = {
        home: document.getElementById('view-home'),
        services: document.getElementById('view-services'),
        serviceDetail: document.getElementById('view-service-detail'),
        gallery: document.getElementById('view-gallery'),
        about: document.getElementById('view-about'),
        packages: document.getElementById('view-packages')
    };
    
    const navLinks = document.querySelectorAll('.nav-link');
    const homeServicesContainer = document.getElementById('services-list-container');
    const bridalServicesContainer = document.getElementById('all-services-bridal');
    const eventServicesContainer = document.getElementById('all-services-event');
    const lessonsServicesContainer = document.getElementById('all-services-lessons');
    
    // Booking modal elements
    const bookingModal = document.getElementById('booking-modal');
    const bookingModalClose = document.getElementById('booking-modal-close');
    const bookingForm = document.getElementById('booking-form');
    const serviceSelect = document.getElementById('booking-service-select');
    
    // Custom calendar elements
    const calendarMonthYear = document.getElementById('calendar-month-year');
    const calendarDaysGrid = document.getElementById('calendar-days-grid');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const selectedDateInput = document.getElementById('selected-date-input');
    const selectedTimeInput = document.getElementById('selected-time-input');
    const timeSlotsGrid = document.getElementById('time-slots-grid');
    
    // Form buttons and overlays
    const btnSubmitBooking = document.getElementById('btn-submit-booking');
    const bookingSummaryBox = document.getElementById('booking-summary-box');
    const summaryServiceText = document.getElementById('summary-service');
    const summaryDateTimeText = document.getElementById('summary-datetime');
    const summaryPriceText = document.getElementById('summary-price');
    
    // Success Modal elements
    const successModal = document.getElementById('success-modal');
    const successModalClose = document.getElementById('btn-success-close');
    const downloadIcsBtn = document.getElementById('btn-download-ics');
    const sendWhatsappBtn = document.getElementById('btn-send-whatsapp');
    const ticketRef = document.getElementById('ticket-ref');
    const ticketService = document.getElementById('ticket-service');
    const ticketDateTime = document.getElementById('ticket-datetime');
    
    // Mobile navigation toggling
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Lightbox Modal
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    // Scroll to Top Progress indicator
    const progressScroll = document.getElementById('progress-scroll');
    const progressPath = document.getElementById('progress-path');

    // --- 4. Render Service Lists ---
    function renderServices() {
        // Home page: show one from each category for variety
        if (homeServicesContainer) {
            homeServicesContainer.innerHTML = '';
            const featuredServiceIds = [2, 8, 7, 14]; // White Wedding, Photoshoot, Birthday Glam, Group Classes
            services.filter(s => featuredServiceIds.includes(s.id)).forEach(service => {
                homeServicesContainer.appendChild(createServiceCard(service, true, true)); // hidePrice=true, hideBookBtn=true on home page
            });
        }

        // Full services page: split into 3 category grids
        const bridalIds = [1, 2, 3, 4, 5, 6];
        const eventIds  = [7, 8, 9, 10, 11, 12];
        const lessonIds = [13, 14, 15];

        if (bridalServicesContainer) {
            bridalServicesContainer.innerHTML = '';
            services.filter(s => bridalIds.includes(s.id)).forEach(service => {
                bridalServicesContainer.appendChild(createServiceCard(service));
            });
        }
        if (eventServicesContainer) {
            eventServicesContainer.innerHTML = '';
            services.filter(s => eventIds.includes(s.id)).forEach(service => {
                eventServicesContainer.appendChild(createServiceCard(service));
            });
        }
        if (lessonsServicesContainer) {
            lessonsServicesContainer.innerHTML = '';
            services.filter(s => lessonIds.includes(s.id)).forEach(service => {
                lessonsServicesContainer.appendChild(createServiceCard(service));
            });
        }

        // Populate service select options in the booking form
        if (serviceSelect) {
            serviceSelect.innerHTML = '<option value="" disabled selected>Choose a service...</option>';
            // Group options by category for readability
            const groups = [
                { label: 'Bridal Services', ids: bridalIds },
                { label: 'Bridal Packages', ids: [16, 17, 18, 19, 20] },
                { label: 'Event Makeup',    ids: eventIds },
                { label: 'Makeup Lessons',  ids: lessonIds }
            ];
            groups.forEach(group => {
                const optgroup = document.createElement('optgroup');
                optgroup.label = group.label;
                services.filter(s => group.ids.includes(s.id)).forEach(service => {
                    const opt = document.createElement('option');
                    opt.value = service.id;
                    opt.textContent = `${service.title} — GH₵${service.price}`;
                    optgroup.appendChild(opt);
                });
                serviceSelect.appendChild(optgroup);
            });
        }
    }
    
    function createServiceCard(service, hidePrice = false, hideBookBtn = false) {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <div class="service-img-wrapper">
                <img src="${service.image}" alt="${service.title}" class="service-img" loading="lazy">
                ${hidePrice ? '' : `<span class="service-price-tag">GH₵${service.price}</span>`}
            </div>
            <div class="service-details">
                <div class="service-meta">
                    <span><i class="bi bi-clock"></i> ${service.duration} mins</span>
                    <span><i class="bi bi-tag"></i> ${service.category}</span>
                </div>
                <h3>${service.title}</h3>
                <p>${service.shortDesc}</p>
                <div class="service-actions">
                    <a href="#/service/${service.id}" class="btn btn-outline">Details</a>
                    ${hideBookBtn ? '' : `<button class="btn btn-primary btn-book-service" data-id="${service.id}">Book Now</button>`}
                </div>
            </div>
        `;
        
        // Add event listener to Book Now button inside the card (if present)
        const bookBtn = card.querySelector('.btn-book-service');
        if (bookBtn) {
            bookBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openBookingWithService(service.id);
            });
        }
        
        return card;
    }

    // --- 5. Dynamic Routing System (SPA Router) ---
    function handleRouting() {
        const hash = window.location.hash || '#/';
        
        // Hide mobile navigation if open
        navMenu.classList.remove('active');
        mobileToggle.querySelector('i').className = 'bi bi-list';
        
        // Reset active state for all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Route: Home page
        if (hash === '#/' || hash === '') {
            showView('home');
            const link = document.querySelector('.nav-link[data-target="home"]');
            if (link) link.classList.add('active');
        } 
        // Route: Services menu page
        else if (hash === '#/services') {
            showView('services');
            const link = document.querySelector('.nav-link[data-target="services"]');
            if (link) link.classList.add('active');
        }
        // Route: Bridal Packages page
        else if (hash === '#/packages') {
            showView('packages');
            const link = document.querySelector('.nav-link[data-target="packages"]');
            if (link) link.classList.add('active');
            initTermsAccordion();
        }
        // Route: Dynamic Service Detail Page
        else if (hash.startsWith('#/service/')) {
            const serviceId = parseInt(hash.replace('#/service/', ''));
            const selectedService = services.find(s => s.id === serviceId);
            
            if (selectedService) {
                renderServiceDetailView(selectedService);
                showView('serviceDetail');
            } else {
                // If service ID not found, redirect to home
                window.location.hash = '#/';
            }
        } 
        // Route: Portfolio/Gallery
        else if (hash === '#/gallery') {
            showView('gallery');
            const link = document.querySelector('.nav-link[data-target="gallery"]');
            if (link) link.classList.add('active');
        } 
        // Route: About & Contact
        else if (hash === '#/about') {
            showView('about');
            const link = document.querySelector('.nav-link[data-target="about"]');
            if (link) link.classList.add('active');
        }
    }
    
    function showView(viewKey) {
        Object.keys(views).forEach(key => {
            if (key === viewKey) {
                views[key].classList.add('active');
            } else {
                views[key].classList.remove('active');
            }
        });
    }

    // --- 5b. Terms & Conditions Accordion ---
    function initTermsAccordion() {
        const accordion = document.getElementById('terms-accordion');
        if (!accordion || accordion.dataset.initialized) return;
        accordion.dataset.initialized = 'true';

        accordion.querySelectorAll('.terms-trigger').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const targetId = trigger.dataset.target;
                const body = document.getElementById(targetId);
                const chevron = trigger.querySelector('.terms-chevron');
                const isOpen = body.classList.contains('open');

                // Close all others
                accordion.querySelectorAll('.terms-body').forEach(b => b.classList.remove('open'));
                accordion.querySelectorAll('.terms-trigger').forEach(t => {
                    t.classList.remove('active');
                    t.querySelector('.terms-chevron').style.transform = 'rotate(0deg)';
                });

                // Toggle current
                if (!isOpen) {
                    body.classList.add('open');
                    trigger.classList.add('active');
                    chevron.style.transform = 'rotate(180deg)';
                }
            });
        });
    }

    function renderServiceDetailView(service) {
        const galleryHtml = service.gallery && service.gallery.length > 0
            ? `<div class="detail-gallery">
                ${service.gallery.map((img, idx) => `
                    <div class="detail-gallery-thumb ${idx === 0 ? 'active' : ''}" data-img="${img}">
                        <img src="${img}" alt="${service.title} view ${idx + 1}" loading="lazy">
                    </div>
                `).join('')}
               </div>`
            : '';

        views.serviceDetail.innerHTML = `
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="detail-main-img-wrapper">
                        <img src="${service.image}" alt="${service.title}" class="detail-main-img" id="detail-active-img">
                    </div>
                    ${galleryHtml}
                    <div class="detail-badge-row">
                        <div class="detail-badge"><i class="bi bi-clock"></i> ${service.duration} mins</div>
                        <div class="detail-badge"><i class="bi bi-tag"></i> ${service.category}</div>
                    </div>
                    <h1 class="detail-title">${service.title}</h1>
                    <div class="detail-price">GH₵${service.price}</div>
                    <p class="detail-desc">${service.longDesc}</p>
                    
                    <div class="detail-highlights">
                        <h3>What's Included in the Session</h3>
                        <ul>
                            ${service.highlights.map(item => `<li><i class="bi bi-check-circle-fill"></i> <span>${item}</span></li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="detail-sidebar">
                    <div class="sidebar-box">
                        <h3>Reserve This Look</h3>
                        <p>Secure your makeup session. Choose your preferred date, select a convenient time, and get confirmed instantly.</p>
                        
                        <div class="info-rows">
                            <div class="info-row">
                                <span>Artistry level</span>
                                <strong>Senior Artist</strong>
                            </div>
                            <div class="info-row">
                                <span>Duration</span>
                                <strong>${service.duration} minutes</strong>
                            </div>
                            <div class="info-row">
                                <span>Price</span>
                                <strong>GH₵${service.price} GHS</strong>
                            </div>
                            <div class="info-row">
                                <span>Location</span>
                                <strong>Mataheko, Accra</strong>
                            </div>
                        </div>
                        
                        <button class="btn btn-primary btn-block btn-book-service-detail" data-id="${service.id}">Book Appointment</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add booking listener to sidebar button
        views.serviceDetail.querySelector('.btn-book-service-detail').addEventListener('click', () => {
            openBookingWithService(service.id);
        });

        // Setup gallery thumbnail clicks
        const thumbs = views.serviceDetail.querySelectorAll('.detail-gallery-thumb');
        const activeImg = views.serviceDetail.querySelector('#detail-active-img');
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const newSrc = thumb.getAttribute('data-img');
                if (newSrc && activeImg) {
                    activeImg.src = newSrc;
                    thumbs.forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                }
            });
        });
    }

    // --- 6. Custom Interactive Booking Panel & Calendar ---
    
    // Open Booking Panel with a pre-selected service
    function openBookingWithService(serviceId) {
        if (serviceSelect) {
            serviceSelect.value = serviceId;
            updateBookingSummary();
        }
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scrolling
        
        // Reset calendar and date inputs
        currentSelectedDate = null;
        selectedDateInput.value = '';
        selectedTimeInput.value = '';
        timeSlotsGrid.innerHTML = '<p class="select-date-message">Please select a date to view available time slots.</p>';
        btnSubmitBooking.disabled = true;
        
        currentMonth = new Date().getMonth();
        currentYear = new Date().getFullYear();
        renderCalendar();
    }
    
    function renderCalendar() {
        const date = new Date(currentYear, currentMonth, 1);
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        calendarMonthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        calendarDaysGrid.innerHTML = '';
        
        // Get index of first day of the month
        const firstDayIndex = date.getDay();
        
        // Get total days in the month
        const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // Get total days in the previous month
        const prevMonthTotalDays = new Date(currentYear, currentMonth, 0).getDate();
        
        // Today's date reference
        const today = new Date();
        today.setHours(0,0,0,0);
        
        // Render empty cells for previous month padding
        for (let i = firstDayIndex; i > 0; i--) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarDaysGrid.appendChild(emptyDay);
        }
        
        // Render month days
        for (let day = 1; day <= totalDays; day++) {
            const dayCell = document.createElement('button');
            dayCell.type = 'button';
            dayCell.className = 'calendar-day';
            dayCell.textContent = day;
            
            const cellDate = new Date(currentYear, currentMonth, day);
            cellDate.setHours(0,0,0,0);
            
            const yearStr = cellDate.getFullYear();
            const monthStr = String(cellDate.getMonth() + 1).padStart(2, '0');
            const dayStr = String(cellDate.getDate()).padStart(2, '0');
            const dateKey = `${yearStr}-${monthStr}-${dayStr}`;
            const isDateBlocked = googleBlockedDates.includes(dateKey);
            
            // Check if day is in the past or blocked in Google Sheets
            if (cellDate < today || isDateBlocked) {
                dayCell.classList.add('disabled');
                dayCell.disabled = true;
                if (isDateBlocked) {
                    dayCell.title = "Date Unavailable";
                }
            } else {
                dayCell.classList.add('active-day');
                
                // Keep selected day highlighted on calendar re-render
                if (currentSelectedDate && cellDate.getTime() === currentSelectedDate.getTime()) {
                    dayCell.classList.add('selected-day');
                }
                
                dayCell.addEventListener('click', () => {
                    // Remove selection from previous day
                    const activeDays = calendarDaysGrid.querySelectorAll('.selected-day');
                    activeDays.forEach(d => d.classList.remove('selected-day'));
                    
                    // Highlight selected day
                    dayCell.classList.add('selected-day');
                    currentSelectedDate = cellDate;
                    
                    const yearStr = currentSelectedDate.getFullYear();
                    const monthStr = String(currentSelectedDate.getMonth() + 1).padStart(2, '0');
                    const dayStr = String(currentSelectedDate.getDate()).padStart(2, '0');
                    selectedDateInput.value = `${yearStr}-${monthStr}-${dayStr}`;
                    
                    selectedTimeInput.value = '';
                    generateTimeSlots(currentSelectedDate);
                    updateBookingSummary();
                });
            }
            
            calendarDaysGrid.appendChild(dayCell);
        }
    }
    
    // Generate Time Slots based on chosen date
    function generateTimeSlots(date) {
        timeSlotsGrid.innerHTML = '';
        
        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();
        
        // Available standard slots
        const standardSlots = [
            { label: "09:00 AM", hour: 9, minute: 0 },
            { label: "10:30 AM", hour: 10, minute: 30 },
            { label: "12:00 PM", hour: 12, minute: 0 },
            { label: "01:30 PM", hour: 13, minute: 30 },
            { label: "03:00 PM", hour: 15, minute: 0 },
            { label: "04:30 PM", hour: 16, minute: 30 },
            { label: "06:00 PM", hour: 18, minute: 0 }
        ];
        
        const serviceId = parseInt(serviceSelect.value);
        const dateString = selectedDateInput.value; // YYYY-MM-DD
        
        standardSlots.forEach(slot => {
            const slotBtn = document.createElement('button');
            slotBtn.type = 'button';
            slotBtn.className = 'time-slot-btn';
            slotBtn.textContent = slot.label;
            
            // Check if slot has already been booked (persisted check)
            const isBooked = mockBookedSlots.some(b => b.date === dateString && b.time === slot.label);
            
            // Check if slot time has already passed for today
            const slotTime = new Date(date);
            slotTime.setHours(slot.hour, slot.minute, 0, 0);
            const hasPassed = isToday && slotTime < now;
            
            if (isBooked || hasPassed) {
                slotBtn.disabled = true;
            } else {
                slotBtn.addEventListener('click', () => {
                    const activeSlots = timeSlotsGrid.querySelectorAll('.time-slot-btn.selected');
                    activeSlots.forEach(s => s.classList.remove('selected'));
                    
                    slotBtn.classList.add('selected');
                    selectedTimeInput.value = slot.label;
                    updateBookingSummary();
                });
            }
            
            timeSlotsGrid.appendChild(slotBtn);
        });
        
        if (timeSlotsGrid.children.length === 0) {
            timeSlotsGrid.innerHTML = '<p class="select-date-message">No slots available for this day.</p>';
        }
    }
    
    // Live Summary Box Updates
    function updateBookingSummary() {
        const serviceId = parseInt(serviceSelect.value);
        const serviceObj = services.find(s => s.id === serviceId);
        const dateVal = selectedDateInput.value;
        const timeVal = selectedTimeInput.value;
        
        if (serviceObj && dateVal && timeVal) {
            const formattedDate = new Date(dateVal).toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
            
            summaryServiceText.textContent = serviceObj.title;
            summaryDateTimeText.textContent = `${formattedDate} at ${timeVal}`;
            summaryPriceText.textContent = `GH₵${serviceObj.price} GHS`;
            
            bookingSummaryBox.style.display = 'block';
            btnSubmitBooking.disabled = false;
        } else {
            bookingSummaryBox.style.display = 'none';
            btnSubmitBooking.disabled = true;
        }
    }
    
    // --- 7. Booking Form Submission and Local Storage Persistence ---
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const serviceId = parseInt(serviceSelect.value);
            const serviceObj = services.find(s => s.id === serviceId);
            const dateVal = selectedDateInput.value;
            const timeVal = selectedTimeInput.value;
            const clientName = document.getElementById('client-name').value;
            const clientEmail = document.getElementById('client-email').value;
            const clientPhone = document.getElementById('client-phone').value;
            const clientNotes = document.getElementById('client-notes').value;
            
            const refCode = `FG-${Math.floor(1000 + Math.random() * 9000)}`;
            
            // Construct booking details object
            currentActiveBooking = {
                ref: refCode,
                serviceId: serviceId,
                serviceTitle: serviceObj.title,
                price: serviceObj.price,
                duration: serviceObj.duration,
                date: dateVal,
                time: timeVal,
                clientName: clientName,
                clientEmail: clientEmail,
                clientPhone: clientPhone,
                notes: clientNotes
            };
            
            // Persist the booked slot to block out future bookings on this client
            mockBookedSlots.push({
                date: dateVal,
                time: timeVal,
                serviceId: serviceId
            });
            localStorage.setItem('fg_makeovers_bookings', JSON.stringify(mockBookedSlots));
            
            // Close Booking Drawer
            bookingModal.classList.remove('active');
            document.body.style.overflow = ''; // Unlock scrolling
            bookingForm.reset();
            
            // Populate Ticket Details in Confirmation Modal
            const formattedDate = new Date(dateVal).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });
            ticketRef.textContent = `#${refCode}`;
            ticketService.textContent = serviceObj.title;
            ticketDateTime.textContent = `${formattedDate} at ${timeVal}`;
            
            // Generate WhatsApp link and update the button
            const whatsappNumber = "233553923935";
            const messageText = `Hi FG Makeovers! I would like to confirm my makeup appointment:

*Reference:* #${refCode}
*Service:* ${serviceObj.title}
*Price:* GHS ${serviceObj.price}
*Date:* ${formattedDate}
*Time:* ${timeVal}

*My Details:*
*Name:* ${clientName}
*Phone:* ${clientPhone}
*Email:* ${clientEmail}
*Notes:* ${clientNotes || 'None'}

Please confirm my booking!`;

            const encodedMessage = encodeURIComponent(messageText);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            if (sendWhatsappBtn) {
                sendWhatsappBtn.href = whatsappUrl;
            }
            
            // Automatically try to open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');
            
            // Open Success Popup
            successModal.classList.add('active');
        });
    }

    // --- 8. Dynamic ICS Calendar File Exporter ---
    function formatIcsDateTime(dateStr, timeStr) {
        // Parse "09:30 AM" or "01:30 PM"
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        
        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        
        const date = new Date(dateStr);
        date.setHours(hours, minutes, 0, 0);
        
        // Convert to UTC/Zulu format: YYYYMMDDTHHMMSSZ
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hour = String(date.getUTCHours()).padStart(2, '0');
        const min = String(date.getUTCMinutes()).padStart(2, '0');
        const sec = String(date.getUTCSeconds()).padStart(2, '0');
        
        return `${year}${month}${day}T${hour}${min}${sec}Z`;
    }
    
    function downloadIcsCalendar(booking) {
        const startDateTime = formatIcsDateTime(booking.date, booking.time);
        
        // Add duration minutes to find end time
        const [time, modifier] = booking.time.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        
        const startDate = new Date(booking.date);
        startDate.setHours(hours, minutes, 0, 0);
        
        const endDate = new Date(startDate.getTime() + booking.duration * 60000);
        
        const endYear = endDate.getUTCFullYear();
        const endMonth = String(endDate.getUTCMonth() + 1).padStart(2, '0');
        const endDay = String(endDate.getUTCDate()).padStart(2, '0');
        const endHour = String(endDate.getUTCHours()).padStart(2, '0');
        const endMin = String(endDate.getUTCMinutes()).padStart(2, '0');
        const endSec = String(endDate.getUTCSeconds()).padStart(2, '0');
        const endDateTime = `${endYear}${endMonth}${endDay}T${endHour}${endMin}${endSec}Z`;
        
        const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        
        // ICS file content body
        const icsContent = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//FG Makeovers//Booking System//EN",
            "CALSCALE:GREGORIAN",
            "METHOD:PUBLISH",
            "BEGIN:VEVENT",
            `UID:fg-booking-${booking.ref}@fgmakeovers.com`,
            `DTSTAMP:${stamp}`,
            `DTSTART:${startDateTime}`,
            `DTEND:${endDateTime}`,
            `SUMMARY:FG Makeovers - ${booking.serviceTitle}`,
            `DESCRIPTION:Hi ${booking.clientName},\\n\\nYour makeup appointment is confirmed!\\nService: ${booking.serviceTitle}\\nReference: #${booking.ref}\\nNotes: ${booking.notes || 'None'}\\n\\nSee you at the studio!`,
            "LOCATION:Mataheko, Accra, Ghana",
            "STATUS:CONFIRMED",
            "SEQUENCE:0",
            "END:VEVENT",
            "END:VCALENDAR"
        ].join("\r\n");
        
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `FG_Makeovers_Booking_${booking.ref}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    if (downloadIcsBtn) {
        downloadIcsBtn.addEventListener('click', () => {
            if (currentActiveBooking) {
                downloadIcsCalendar(currentActiveBooking);
            }
        });
    }

    // --- 9. Navigation Triggering ---

    // Delegated booking trigger — handles all .btn-book-trigger buttons anywhere in the page
    document.addEventListener('click', (e) => {
        const bookBtn = e.target.closest('.btn-book-trigger');
        if (bookBtn) {
            const serviceId = bookBtn.getAttribute('data-id');
            if (serviceId) {
                openBookingWithService(parseInt(serviceId));
            } else {
                openBookingWithService(services[0].id);
            }
        }
    });

    // Header menu navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('data-target');
            if (target) {
                // If on mobile, closing menu drawer
                navMenu.classList.remove('active');
                mobileToggle.querySelector('i').className = 'bi bi-list';
            }
        });
    });

    // Mobile Menu Toggle click
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            mobileToggle.querySelector('i').className = isOpen ? 'bi bi-x-lg' : 'bi bi-list';
        });
    }
    
    // Calendar month switching
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            const today = new Date();
            const firstOfCurrent = new Date(currentYear, currentMonth, 1);
            const firstOfToday = new Date(today.getFullYear(), today.getMonth(), 1);
            
            // Prevent going into months past the current active month
            if (firstOfCurrent > firstOfToday) {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                renderCalendar();
            }
        });
    }
    
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        });
    }
    
    // Form service selector changes
    if (serviceSelect) {
        serviceSelect.addEventListener('change', () => {
            updateBookingSummary();
            renderCalendar(); // Re-render calendar to reflect correct disabled states
            if (currentSelectedDate) {
                generateTimeSlots(currentSelectedDate);
            }
        });
    }
    
    // Closing booking panel drawer
    if (bookingModalClose) {
        bookingModalClose.addEventListener('click', () => {
            bookingModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Closing confirmation success popups
    if (successModalClose) {
        successModalClose.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
    }

    // --- 10. Portfolio Lightbox Viewer ---
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-zoom-gallery');
        if (btn) {
            e.preventDefault();
            e.stopPropagation();
            const imgSrc = btn.getAttribute('data-img');
            const parentOverlay = btn.closest('.showcase-overlay') || btn.closest('.gallery-card-overlay');
            let label = "FG Makeovers Masterpiece";
            
            if (parentOverlay) {
                const titleEl = parentOverlay.querySelector('.overlay-tag') || parentOverlay.querySelector('h4');
                if (titleEl) label = titleEl.textContent;
            }
            
            if (imgSrc) {
                lightboxImg.src = imgSrc;
                lightboxCaption.textContent = label;
                lightboxModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    });
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightboxModal.classList.remove('active');
            if (!bookingModal.classList.contains('active')) {
                document.body.style.overflow = '';
            }
        });
    }
    
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove('active');
                if (!bookingModal.classList.contains('active')) {
                    document.body.style.overflow = '';
                }
            }
        });
    }

    // --- 11. Custom Portfolio Gallery Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');
            
            // Toggle active button status
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- 12. Testimonials Carousel Slider Logic ---
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const track = document.getElementById('testimonial-track');
    const slides = Array.from(track ? track.children : []);
    const dotsNav = document.getElementById('carousel-dots');
    
    if (track && slides.length > 0) {
        let currentSlideIndex = 0;
        
        // Generate dot elements based on slides count
        slides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => moveToSlide(idx));
            dotsNav.appendChild(dot);
        });
        
        const dots = Array.from(dotsNav.children);
        
        function moveToSlide(targetIndex) {
            track.style.transform = `translateX(-${targetIndex * 33.333}%)`;
            
            slides[currentSlideIndex].classList.remove('active');
            slides[targetIndex].classList.add('active');
            
            dots[currentSlideIndex].classList.remove('active');
            dots[targetIndex].classList.add('active');
            
            currentSlideIndex = targetIndex;
        }
        
        prevBtn.addEventListener('click', () => {
            let prevIndex = currentSlideIndex - 1;
            if (prevIndex < 0) prevIndex = slides.length - 1;
            moveToSlide(prevIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            let nextIndex = currentSlideIndex + 1;
            if (nextIndex >= slides.length) nextIndex = 0;
            moveToSlide(nextIndex);
        });
        
        // Optional: Auto-slide testimonials every 8 seconds
        setInterval(() => {
            let nextIndex = currentSlideIndex + 1;
            if (nextIndex >= slides.length) nextIndex = 0;
            moveToSlide(nextIndex);
        }, 8000);
    }

    // --- 13. Circular Scroll-to-Top Progress Indicator ---
    if (progressScroll && progressPath) {
        const pathLength = progressPath.getTotalLength();
        progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        
        const updateProgress = () => {
            const scroll = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
            
            if (scroll > 150) {
                progressScroll.classList.add('active-progress');
            } else {
                progressScroll.classList.remove('active-progress');
            }
        };
        
        updateProgress();
        window.addEventListener('scroll', updateProgress);
        
        progressScroll.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 14. Shrink Navigation Header on Scroll ---
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- 15. App Initialization ---
    renderServices();
    
    // Watch for hash routing
    window.addEventListener('hashchange', handleRouting);
    // Initial router check
    handleRouting();

    // Fetch Google Sheets blocked dates
    fetchBlockedDates().then(() => {
        // Re-render calendar once dates are loaded to reflect disabled/blocked states
        renderCalendar();
    });
});
