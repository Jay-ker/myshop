document.getElementById("quoteForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const service = document.getElementById("service").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const finish = document.getElementById("finish").value;
    const result = document.getElementById("quoteResult");
  
    if (!service || quantity < 1) {
      result.textContent = "Please select a service and enter a valid quantity.";
      result.style.color = "red";
      return;
    }
  
    // Base prices per unit
    const basePrices = {
      fabricBox: 7500,
      vehicleWrap: 45000,
      weddingStationery: 25000,
      signage: 10000,
      carrierBags: 15000
    };
  
    // Finish multipliers
    const finishMultiplier = {
      standard: 1,
      premium: 1.2,
      luxury: 1.5
    };
  
    const base = basePrices[service];
    const multiplier = finishMultiplier[finish];
    const total = base * quantity * multiplier;
  
    result.textContent = `Estimated Quote: ₦${total.toLocaleString()}`;
    result.style.color = "green";
  });
  