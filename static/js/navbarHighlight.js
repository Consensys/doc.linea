document.addEventListener("DOMContentLoaded", function () {
    console.log("Navbar highlighting script loaded!");
  
    function handleNavbarLinks() {
      const navbarLinks = document.querySelectorAll('.navbar__link');
      
      if (navbarLinks.length === 0) {
        console.log("No navbar links found yet.");
        return;
      }
  
      console.log("Found navbar links: ", navbarLinks);
  
      // Check if a previously clicked link is stored
      const storedHref = localStorage.getItem('activeNavLink');
  
      // If a link is stored, apply aria-current="page" to that link
      if (storedHref) {
        const activeLink = document.querySelector(`.navbar__link[href="${storedHref}"]`);
        if (activeLink) {
          activeLink.setAttribute('aria-current', 'page');
          console.log(`Persisting highlight for stored link: ${storedHref}`);
        }
      }
  
      // Add click event listeners to each navbar link
      navbarLinks.forEach(link => {
        link.addEventListener('click', function () {
          console.log(`Clicked link: ${this.href}`);
  
          // Remove aria-current from all links
          navbarLinks.forEach(link => link.removeAttribute('aria-current'));
  
          // Add aria-current to the clicked link
          this.setAttribute('aria-current', 'page');
          console.log(`Set aria-current for link: ${this.href}`);
  
          // Store the clicked link's href in localStorage
          localStorage.setItem('activeNavLink', this.getAttribute('href'));
        });
      });
    }
  
    // Observe DOM changes to ensure we catch dynamic content loading
    const observer = new MutationObserver((mutationsList, observer) => {
      if (document.querySelectorAll('.navbar__link').length > 0) {
        handleNavbarLinks(); // Call the logic to highlight the navbar links
        observer.disconnect(); // Stop observing once links are found
      }
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  });
