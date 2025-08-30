// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
  
    // Mobile Menu Toggle
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
  
      // Close mobile menu when a link is clicked
      mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          mobileMenu.classList.add("hidden");
        });
      });
    }
  
    // Sticky Navbar Shadow on Scroll
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("shadow-lg");
      } else {
        header.classList.remove("shadow-lg");
      }
    });
  
    // Smooth Scroll for Anchor Links (for same-page sections)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70, // offset for fixed navbar
            behavior: "smooth"
          });
        }
      });
    });
  });