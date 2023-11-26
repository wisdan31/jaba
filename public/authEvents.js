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
  
    switch (response.status) {
      case 200:
        alert(result);
        window.location.href = "/games";
        break;
      case 401:
        alert(result);
        break;
      default:
        alert("Something went wrong.");
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
  
    switch (response.status) {
      case 201:
        alert(`${result}. You can now log in.`);
        location.reload();
        break;
      case 400:
        alert(result);
        break;
      default:
        alert("Something went wrong.");
    }
  });
  