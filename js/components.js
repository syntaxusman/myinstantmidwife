/* ============================================================
   COMPONENTS.JS - Reusable Header & Footer Components
   ============================================================
   This file injects the shared header (navbar) and footer
   into every page via placeholder divs:
     - #header-placeholder  -> Navbar
     - #footer-placeholder  -> "Have any questions?" + Footer
   ============================================================ */

(function () {
    "use strict";

    /* ----------------------------------------------------------
       HELPER: Detect the current page from the URL so we can
       highlight the active nav link.
    ---------------------------------------------------------- */
    function getCurrentPage() {
        const path = window.location.pathname.toLowerCase();
        if (path.includes("about")) return "about";
        if (path.includes("courses")) return "courses";
        if (path.includes("testimonials")) return "testimonials";
        if (path.includes("faq")) return "faq";
        if (path.includes("contact")) return "contact";
        return "home";
    }

    const activePage = getCurrentPage();

    /* Determine base paths dynamically depending on whether we are in the root directory or pages subdirectory */
    const isPagesDir = window.location.pathname.toLowerCase().includes('/pages/');
    const baseDir = isPagesDir ? '../' : '';
    const pagesDir = isPagesDir ? '' : 'pages/';

    /* ----------------------------------------------------------
       HEADER / NAVBAR
       - Fixed white bar with MIM logo, navigation links,
         and a "BOOK NOW" CTA button.
       - On mobile a hamburger menu icon is shown.
    ---------------------------------------------------------- */
    const headerHTML = `
    <nav class="navbar">
        <!-- Logo -->
        <a href="${baseDir}index.html" class="logo">
            <img src="${baseDir}images/Group.png" alt="My Instant Midwife Logo">
        </a>

        <!-- Desktop Navigation Links -->
        <ul class="nav-links">
            <li><a href="${baseDir}index.html" class="${activePage === 'home' ? 'active' : ''}">HOME</a></li>
            <li><a href="${pagesDir}about.html" class="${activePage === 'about' ? 'active' : ''}">WHO I AM</a></li>
            <li><a href="${pagesDir}courses.html" class="${activePage === 'courses' ? 'active' : ''}">COURSES</a></li>
            <li><a href="${pagesDir}testimonials.html" class="${activePage === 'testimonials' ? 'active' : ''}">TESTIMONIALS</a></li>
            <li><a href="${pagesDir}faq.html" class="${activePage === 'faq' ? 'active' : ''}">FAQ'S</a></li>
            <li><a href="${pagesDir}contact.html" class="${activePage === 'contact' ? 'active' : ''}">CONTACT ME</a></li>
            <li><a href="${pagesDir}subscription.html" class="${activePage === 'subscription' ? 'active' : ''}">SUBSCRIPTION</a></li>
        </ul>

        <!-- Search & Book Now CTA -->
        <div style="display: flex; align-items: center; gap: 20px;">
            <a href="#" style="color: var(--text-dark); font-size: 18px;"></a>
            <a href="${pagesDir}subscription.html" class="book-now-btn">BOOK NOW <i class="fas fa-arrow-right diag-icon"></i></a>
        </div>

        <!-- Mobile Hamburger Button (hidden on desktop) -->
        <button class="mobile-menu-btn" aria-label="Toggle menu">
            <i class="fas fa-bars"></i>
        </button>
    </nav>
    `;

    /* ----------------------------------------------------------
       FOOTER
       Composed of three visual blocks:
       1. "Have any questions?" call-to-action strip
       2. Gallery image strip (4 thumbnails)
       3. Main footer columns (logo, quick links, contact, social)
       4. Copyright bar
    ---------------------------------------------------------- */
    const footerHTML = `
    <!-- ====== Have Any Questions? CTA Section ====== -->
    <section class="questions-cta">
        <div class="questions-content">
            <div class="questions-text">
                <h3>Have any questions?</h3>
                <p>Get in touch to find our more about our services and how we can support you</p>
            </div>
            <a href="${pagesDir}contact.html" class="btn-beige">CONTACT me <i class="fas fa-times"></i></a>
        </div>
    </section>

    

    <!-- ====== Main Footer ====== -->
    <footer class="contact-footer">
        <div class="footer-columns">
            <!-- Column 1: Logo & Description -->
            <div class="footer-logo-area">
                <a href="${baseDir}index.html" class="logo">
                    <img src="${baseDir}images/Group.png" alt="My Instant Midwife Logo">
                </a>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.</p>
            </div>

            <!-- Column 2: Quick Links -->
            <div class="quick-links">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="${baseDir}index.html">Home</a></li>
                    <li><a href="${pagesDir}about.html">Who I Am</a></li>
                    <li><a href="#">Areas</a></li>
                    <li><a href="#">Blogs</a></li>
                    <li><a href="${pagesDir}testimonials.html">Testimonials</a></li>
                    <li><a href="${pagesDir}faq.html">FAQ's</a></li>
                    <li><a href="${pagesDir}contact.html">Contact Me</a></li>
                     <li><a href="${pagesDir}subscription.html">Subscription</a></li>
                      <li><a href="${pagesDir}terms-conditions.html">Terms & Conditions</a></li>
                        <li><a href="${pagesDir}privacy-policy.html">Privacy Policy</a></li>

                </ul>
            </div>

          
                <div class="contact-info">  
                 
                 
                </div>
                <div class="follow">
                    <h4>Follow Us</h4>
                    <div class="social-icons">
                        <a href="#" class="social-circle" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social-circle" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="social-circle" aria-label="X (Twitter)"><i class="fab fa-x-twitter"></i></a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Copyright Bar -->
        <div class="copyright">
            <span>Copyright &copy; 2026. My Instant Midwife. All rights reserved.</span>
            <div class="copyright-links">
              <a href="/pages/privacy-policy.html">Privacy Policy</a> &nbsp;|&nbsp;  <a href="/pages/terms-conditions.html">Terms & Conditions</a>
            </div>
              
   
  
       
   

        </div>
    </footer>
    `;

    /* ----------------------------------------------------------
       INJECT: Insert header & footer HTML into their
       respective placeholder elements on DOM ready.
    ---------------------------------------------------------- */
    function injectComponents() {
        const headerEl = document.getElementById("header-placeholder");
        const footerEl = document.getElementById("footer-placeholder");

        if (headerEl) headerEl.innerHTML = headerHTML;
        if (footerEl) footerEl.innerHTML = footerHTML;
    }

    /* Run when DOM is ready */
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", injectComponents);
    } else {
        injectComponents();
    }

})();
