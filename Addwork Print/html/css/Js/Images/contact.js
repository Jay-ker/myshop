document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const status = document.getElementById("formStatus");
  
    if (!name || !email || !message) {
      status.textContent = "Please fill out all fields.";
      status.style.color = "red";
      return;
    }
  
    // Simulate form submission
    status.textContent = "Message sent successfully!";
    status.style.color = "green";
  
    // Clear form
    document.getElementById("contactForm").reset();
  });
  