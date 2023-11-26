document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
  
    const result = await response.text();
  
    if (response.status === 200) {
        alert(`${result} You are now logged in.`);
        window.location.href = "/games";
      }      
  });

document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
  
    const result = await response.text();
  
    if (response.status === 201) {
        alert(`${result} You can now log in.`);
      location.reload();
    }
  });
  