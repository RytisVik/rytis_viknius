function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').textContent = currentTime;
  }
  
  // Call the function immediately and set it to update every second
  updateClock();
  setInterval(updateClock, 1000);
  
  document.getElementById("submitBtn").addEventListener("click", function () {
    // Capture form data
    const name = document.getElementById("name");
    const surname = document.getElementById("surname");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const address = document.getElementById("address");
    const attributes = [
      document.getElementById("attribute1"),
      document.getElementById("attribute2"),
      document.getElementById("attribute3"),
      document.getElementById("attribute4"),
      document.getElementById("attribute5"),
    ];
  
    let isValid = true;
  
    // Reset all input borders
    [name, surname, email, phone, address, ...attributes].forEach((field) => {
      field.style.border = "";
    });
  
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      email.style.border = "2px solid red";
      alert("Įveskite tinkamą el. pašto adresą.");
      isValid = false;
    }
  
    // Validate phone
    const phoneRegex = /^[0-9]{8,15}$/; // Allows 8-15 digits
    if (!phoneRegex.test(phone.value.trim())) {
      phone.style.border = "2px solid red";
      alert("Įveskite tinkamą telefono numerį (tik skaičiai, 8-15 simbolių).");
      isValid = false;
    }
  
    // Validate address
    if (address.value.trim().length < 5) {
      address.style.border = "2px solid red";
      alert("Adresas turi būti ne trumpesnis nei 5 simboliai.");
      isValid = false;
    }
  
    // Validate numeric attributes
    attributes.forEach((attribute) => {
      if (isNaN(attribute.value.trim()) || attribute.value.trim() === "") {
        attribute.style.border = "2px solid red";
        alert("Visi požymiai turi būti skaičiai.");
        isValid = false;
      }
    });
  
    // Stop execution if validation fails
    if (!isValid) {
      return;
    }
  
    // Store data in an object
    const formData = {
      name: name.value.trim(),
      surname: surname.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      address: address.value.trim(),
      attributes: attributes.map((attribute) => parseFloat(attribute.value)),
    };
  
    // Combine address and attributes into a single string
    const combinedAddress = `Adresas: ${formData.address}, Atsakymai: ${formData.attributes.join(", ")}`;
  
    // Calculate the average of attributes
    const average =
      formData.attributes.reduce((sum, value) => sum + value, 0) /
      formData.attributes.length;
  
    // Determine the color based on the average value
    let averageColor = "black";
    if (average < 3) {
      averageColor = "red"; // Low value
    } else if (average < 7) {
      averageColor = "orange"; // Medium value
    } else {
      averageColor = "green"; // High value
    }
  
    // Display the results
    const output = document.getElementById("output");
    output.innerHTML = `
      <p><strong>Vardas:</strong> ${formData.name}</p>
      <p><strong>Pavardė:</strong> ${formData.surname}</p>
      <p><strong>El. paštas:</strong> ${formData.email}</p>
      <p><strong>Telefonas:</strong> ${formData.phone}</p>
      <p><strong>Sujungtas tekstas:</strong> ${combinedAddress}</p>
      <p><strong>${formData.name} ${formData.surname} (${formData.email}):</strong> <span style="color: ${averageColor}; font-weight: bold;">${average.toFixed(
      2
    )}</span></p>
    `;
  
    // Log the stored object to the console
    console.log("Stored Form Data:", formData);
  });
  