/* ============================================================
   SCRIPT.JS - My Instant Midwife - Main JavaScript
   ============================================================
   Table of Contents:
   1. Testimonial Slider (data + rotation)
   2. Smooth Scroll for Anchor Links
   3. Button Hover Animations
   4. Scroll-triggered Fade-in Animations
   5. Mobile Menu Toggle
   6. Gallery Drag-to-Scroll
   7. FAQ Accordion
   ============================================================ */


/* ==========================================================
   1. TESTIMONIAL SLIDER
   Rotates through client quotes with fade animation.
   Controlled by dot pagination and auto-advances every 7s.
   ========================================================== */

const testimonialsArr = [
    {
        text: "\u201CAs first-time parents, we weren't sure what to expect from a biomechanics class, but it genuinely exceeded all expectations. Understanding how positioning and movement could influence labour felt like being given information we didn't even know we were missing. The class gave us real confidence going into birth and we can honestly say it made a difference. We can't recommend it highly enough.\u201D",
        name: "Beth & Nathan",
        location: "Biomechanics in Labour Course"
    },
    {
        text: "\u201COur labour was incredibly fast, which we didn't anticipate — but looking back, I truly believe that understanding what was happening to my body made all the difference. The course gave me a level of awareness that kept me calm and in control even when things moved quickly. Honestly, it was the knowledge more than anything else that carried me through.\u201D",
        name: "India & Jack",
        location: "Biomechanics in Labour Course"
    },
    {
        text: "\u201CI absolutely love my visits and would recommend Tas to anybody without hesitation. I've had pregnancy massages and more recently the post-dates treatment she offers, and every single session has been wonderful. What makes it so special is that alongside the treatments, Tas takes the time to talk things through — I always leave feeling so much more confident, informed, and of course completely chilled out. I can't recommend her enough.\u201D",
        name: "Megan",
        location: "Pregnancy Massage & Post-Dates Treatment"
    },
    {
        text: "\u201CMy postnatal massage with Tas was such a wonderful experience. My breastfeeding baby was a little fussy during the session, but Tas was incredibly understanding — she patiently helped me settle my little one while making sure I still had time to properly relax and enjoy the treatment. Her soothing touch and genuine attention to how I was feeling left me completely at ease, both physically and mentally. I'd highly recommend Tas to any new mum looking for truly supportive postnatal care.\u201D",
        name: "Melissa",
        location: "Postnatal Massage"
    },
    {
        text: "\u201CI've been meaning to write this review since finishing our hypnobirthing course with Tas — but in the meantime I've had my gorgeous little boy, and I can honestly say that hypnobirthing truly worked for us. To cut a short labour story even shorter, I dilated fully at home and used every technique Tas had taught us to get through it. I barely remember pain — just the music, the breathing, and focusing through the pressure. All down to Tas. And then, as if it was meant to be, when I arrived at the hospital — Tas was on duty. Her calm presence, her techniques, and her ability to refocus me when I went slightly off track meant more to me than I will ever be able to put into words. I couldn't recommend her highly enough.\u201D",
        name: "Lynsay",
        location: "Hypnobirthing Course"
    },
    {
        text: "\u201CMiM was the perfect support throughout our pregnancy journey. Due to a pre-existing medical condition, a caesarean section was the safest option for us — and while we knew it was the right decision, it naturally brought its own anxieties for both myself and my husband. Tas tailored our hypnobirthing sessions entirely to our individual needs, addressing our fears around the antenatal period, the birth itself, and recovery. Over five sessions she guided us through techniques that genuinely transformed how we felt going into theatre — she even suggested we choose our own music, which made the experience feel personal and calm rather than clinical. Our hypnobirthing journey prepared us for the most wonderful birth experience, and I would wholeheartedly recommend it to any couple, whether you are planning a natural birth or a caesarean.\u201D",
        name: "Hayley & Husband",
        location: "Hypnobirthing Sessions"
    }
];

/* DOM element references */
let currentIdx = 0;
const textEl = document.getElementById('testimonialText');
const nameEl = document.querySelector('.client-name');
const locationEl = document.querySelector('.client-location');
const dots = document.querySelectorAll('.dot');
const prevArrow = document.querySelector('.nav-arrow.left');
const nextArrow = document.querySelector('.nav-arrow.right');

/**
 * Updates the testimonial content with a fade transition.
 * @param {number} index - Index of the testimonial to show
 */
function updateTestimonial(index) {
    currentIdx = (index + testimonialsArr.length) % testimonialsArr.length;
    const t = testimonialsArr[currentIdx];

    /* Fade out, swap content, fade in */
    if (textEl) {
        textEl.style.opacity = '0';
        setTimeout(() => {
            textEl.innerText = t.text;
            textEl.style.opacity = '1';
        }, 150);
    }

    if (nameEl) {
        nameEl.style.opacity = '0';
        setTimeout(() => {
            nameEl.innerText = t.name;
            nameEl.style.opacity = '1';
        }, 150);
    }

    if (locationEl) {
        locationEl.style.opacity = '0';
        setTimeout(() => {
            locationEl.innerText = t.location;
            locationEl.style.opacity = '1';
        }, 150);
    }

    /* Highlight the active dot */
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIdx);
    });
}

/* Attach click handlers to each dot */
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        updateTestimonial(i);
        resetAutoRotate();
    });
});

/* Reset auto rotation timer when manually clicking */
function resetAutoRotate() {
    clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(() => {
        updateTestimonial(currentIdx + 1);
    }, 7000);
}

/* Attach click handlers to arrows */
if (prevArrow) {
    prevArrow.addEventListener('click', () => {
        updateTestimonial(currentIdx - 1);
        resetAutoRotate();
    });
}

if (nextArrow) {
    nextArrow.addEventListener('click', () => {
        updateTestimonial(currentIdx + 1);
        resetAutoRotate();
    });
}

/* Auto-rotate testimonials every 7 seconds */
let autoRotateInterval = setInterval(() => {
    updateTestimonial(currentIdx + 1);
}, 7000);

/* Pause rotation on hover, resume on leave */
const testimonialSection = document.querySelector('.testimonials');
if (testimonialSection) {
    testimonialSection.addEventListener('mouseenter', () => {
        clearInterval(autoRotateInterval);
    });
    testimonialSection.addEventListener('mouseleave', () => {
        resetAutoRotate();
    });
}


/* ==========================================================
   2. SMOOTH SCROLL FOR ANCHOR LINKS
   Enables smooth scrolling when clicking in-page #hash links.
   ========================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// PACKAGES SECTION - EXPAND/COLLAPSE FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Get all package cards
    const packageCards = document.querySelectorAll('.package-card');
    
    // Loop through each card and add click functionality to expand button
    packageCards.forEach(card => {
        const expandBtn = card.querySelector('.expand-btn');
        
        if (expandBtn) {
            expandBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent any parent click events
                
                // Get current expanded state
                const isExpanded = card.getAttribute('data-expanded') === 'true';
                
                // Toggle the expanded state
                if (isExpanded) {
                    // Collapse the card
                    card.setAttribute('data-expanded', 'false');
                    expandBtn.innerHTML = 'READ MORE <i class="fas fa-chevron-down expand-icon"></i>';
                } else {
                    // Expand the card
                    card.setAttribute('data-expanded', 'true');
                    expandBtn.innerHTML = 'READ LESS <i class="fas fa-chevron-up expand-icon"></i>';
                    
                    // Optional: Smooth scroll to the expanded card
                    setTimeout(() => {
                        const cardRect = card.getBoundingClientRect();
                        const isVisible = (cardRect.top >= 0 && cardRect.bottom <= window.innerHeight);
                        
                        if (!isVisible) {
                            card.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 100);
                }
            });
        }
        
        // Optional: Close expanded card when clicking outside (if needed)
        // This is commented out to keep functionality simple
    });
    
    // Optional: Ensure that when one card expands, others can remain expanded
    // This allows multiple cards to be expanded at once
    console.log('Expand/collapse functionality initialized');
});
/* ==========================================================
   3. BUTTON HOVER ANIMATIONS
   Slides the arrow icon right on hover for all CTA buttons.
   ========================================================== */

const allButtons = document.querySelectorAll('.btn-beige, .btn-dark, .card-btn, .book-now-btn, .btn-outline');
allButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function () {
        const icon = this.querySelector('i');
        if (icon) icon.style.transform = 'translateX(5px)';
    });
    btn.addEventListener('mouseleave', function () {
        const icon = this.querySelector('i');
        if (icon) icon.style.transform = 'translateX(0)';
    });
});


/* ==========================================================
   4. SCROLL-TRIGGERED FADE-IN ANIMATIONS
   Sections fade up into view as the user scrolls down.
   Uses IntersectionObserver for performance.
   ========================================================== */

const sections = document.querySelectorAll(
    '.who-we-are, .packages, .midwife-section, .serve-section, ' +
    '.testimonials, .birthing-choices, .get-in-touch, .thank-you-section'
);

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

/* Set initial hidden state and start observing */
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});


/* ==========================================================
   5. MOBILE MENU TOGGLE
   Shows/hides nav links when hamburger button is tapped.
   ========================================================== */

(function () {
    /* Wait for components.js to inject the navbar */
    function initMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        if (!menuBtn || !navLinks) return;

        menuBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.contains('mobile-open');
            if (isOpen) {
                navLinks.classList.remove('mobile-open');
                navLinks.style.display = '';
            } else {
                navLinks.classList.add('mobile-open');
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'white';
                navLinks.style.padding = '20px';
                navLinks.style.gap = '15px';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                navLinks.style.zIndex = '100';
            }
        });
    }

    /* Run after a short delay to ensure components are injected */
    setTimeout(initMobileMenu, 100);
})();


/* ==========================================================
   6. GALLERY AUTO-LOOP MARQUEE
   Automatically scrolls the gallery continuously.
   ========================================================== */

(function () {
    function initGalleryLoop() {
        const galleries = document.querySelectorAll('.gallery');
        galleries.forEach(gallery => {
            if (gallery.querySelector('.gallery-track')) return; // Already initialized
            
            const originalItems = Array.from(gallery.children);
            if (originalItems.length === 0) return;

            // Add Instagram overlay to every gallery item
            originalItems.forEach(item => {
                // Only add if overlay doesn't already exist
                if (!item.querySelector('.ig-overlay')) {
                    const overlay = document.createElement('div');
                    overlay.className = 'ig-overlay';
                    const icon = document.createElement('i');
                    icon.className = 'fab fa-instagram';
                    overlay.appendChild(icon);
                    item.appendChild(overlay);
                }
            });

            // Create the track element that will animate
            const track = document.createElement('div');
            track.className = 'gallery-track';

            // Append all original items to the track
            originalItems.forEach(item => track.appendChild(item));

            // Clone and append items for a seamless loop
            originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                track.appendChild(clone);
            });

            // Put the track back into the gallery wrapper
            gallery.appendChild(track);
        });
    }

    /* Initialise after components are loaded */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGalleryLoop);
    } else {
        initGalleryLoop();
    }
})();

  
  
// ========== PDF DOWNLOAD FROM PDFS FOLDER ==========
// Note: courses.html pages folder mein hai, isliye path mein "../" lagega

function downloadActualPDF(pdfFileName, displayName) {
    // pages folder se root folder mein jane ke liye "../" use karna hoga
    // phir pdfs folder mein jaana hai
    const pdfPath = `../pdf/${pdfFileName}`;
    
    console.log('Downloading from:', pdfPath); // Debug ke liye
    
    // Create anchor element for download
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = displayName;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Attach click handlers to download buttons
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded - setting up download buttons');
    
    // Select all download buttons
    const downloadButtons = document.querySelectorAll('.btn-download-dark, .btn-download-light');
    
    console.log('Found buttons:', downloadButtons.length);
    
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const pdfType = this.getAttribute('data-pdf');
            console.log('Download clicked for:', pdfType);
            
            // Map each button to its PDF file - EXACT NAMES USE KAR RAHE HAIN
            if (pdfType === 'biomechanics') {
                downloadActualPDF('MIM-Biomechanics-in-Labour.pdf', 'MIM_Biomechanics_in_Labour.pdf');
            } 
            else if (pdfType === 'babymoon') {
                downloadActualPDF('MIM-Baby-Moon-40-Days.pdf', 'MIM_Baby_Moon_40_Days.pdf');
            } 
            else if (pdfType === 'hypnobirthing') {
                downloadActualPDF('MIM-Hypnobirthing-Course.pdf', 'MIM_Hypnobirthing_Course.pdf');
            }
        });
    });
});
/* ==========================================================
   7. FAQ ACCORDION
   Click a question to expand/collapse its answer.
   Only one item can be open at a time.
   ========================================================== */

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            /* Close all items first */
            faqItems.forEach(faq => {
                faq.classList.remove('open');
                const icon = faq.querySelector('.fas');
                if (icon) {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            });

            /* Toggle the clicked item */
            if (!isOpen) {
                item.classList.add('open');
                const icon = item.querySelector('.fas');
                if (icon) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
            }
        });
    }
});


/* ==========================================================
   INITIALISATION LOG
   ========================================================== */
console.log('My Instant Midwife - Website Loaded Successfully');
