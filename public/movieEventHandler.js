document.addEventListener('DOMContentLoaded', function () {
    const moreButtons = document.querySelectorAll('.moreButton');
    const detailedCardOverlay = document.getElementById('detailedCardOverlay');
    const closeDetailedCard = document.getElementById('closeDetailedCard');
  
    moreButtons.forEach(button => {
      button.addEventListener('click', function () {
        const tableRow = this.closest('tr');
        const title = tableRow.querySelector('td:nth-child(1)').innerText;
        const director = tableRow.querySelector('td:nth-child(2)').innerText;
        const year = tableRow.querySelector('td:nth-child(3)').innerText;
        const genre = tableRow.querySelector('td:nth-child(4)').innerText;
        const status = tableRow.querySelector('td:nth-child(5)').innerText;
        const score = tableRow.querySelector('td:nth-child(6)').innerText;
        
        const entryID = this.getAttribute('data-id');
  
        document.getElementById('detailedCardTitle').innerText = title;
        document.getElementById('detailedCardDirector').innerText = `Director: ${director}`;
        document.getElementById('detailedCardYear').innerText = `Year: ${year}`;
        document.getElementById('detailedCardGenre').innerText = `Genre: ${genre}`;
        document.getElementById('detailedCardStatus').innerText = `Status: ${status}`;
        document.getElementById('detailedCardScore').innerText = `Your Score: ${score}`;
  
        detailedCardOverlay.style.display = 'block';
        const deleteButton = document.querySelector('.deleteButton');
        deleteButton.setAttribute('data-id', entryID);
        deleteButton.addEventListener('click', () => deleteMovie(entryID));
      });
    });
  
    closeDetailedCard.addEventListener('click', function () {
      detailedCardOverlay.style.display = 'none';
    });
  
    document.getElementById("addButton").addEventListener("click", addMovie);
    document.getElementById("logoutButton").addEventListener("click", () => {
      fetch("/auth/logout", {
        method: "POST",
      }).then(() => {
        alert("You are now logged out");
        window.location.href = "/auth/register";
      });
    });
  });
  
  function deleteMovie(entryID) {
    try {
      fetch("/media/deleteMovie/" + entryID, {
        method: "DELETE",
      }).then(() => {
        location.reload();
      });
    } catch (error) {
      console.error(error);
    }
  }

  function addMovie() {
    const movieTitle = document.getElementById("newEntryTitle").value;
    const movieDirector = document.getElementById("newEntryDirector").value;
    const movieYear = document.getElementById("newEntryYear").value;
    const movieGenre = document.getElementById("newEntryGenre").value;
    const movieStatus = document.getElementById("newEntryStatus").value;
    const movieScore = document.getElementById("newEntryScore").value;
  
    const newMovie = {
      title: movieTitle,
      director: movieDirector,
      year: movieYear,
      genre: movieGenre,
      status: movieStatus,
      score: movieScore,
    };
  
    fetch("/media/addMovie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    }).then(() => {
      alert("New movie added!");
      location.reload();
    });
  }
  
  