document.addEventListener('DOMContentLoaded', function () {
  const moreButtons = document.querySelectorAll('.moreButton');
  const detailedCardOverlay = document.getElementById('detailedCardOverlay');
  const closeDetailedCard = document.getElementById('closeDetailedCard');

  moreButtons.forEach(button => {
    button.addEventListener('click', function () {
      const tableRow = this.closest('tr');
      const title = tableRow.querySelector('td:nth-child(1)').innerText;
      const developer = tableRow.querySelector('td:nth-child(2)').innerText;
      const year = tableRow.querySelector('td:nth-child(3)').innerText;
      const genre = tableRow.querySelector('td:nth-child(4)').innerText;
      const status = tableRow.querySelector('td:nth-child(5)').innerText;
      const score = tableRow.querySelector('td:nth-child(6)').innerText;
      const time = tableRow.querySelector('td:nth-child(7)').innerText;
      const entryID = this.getAttribute('data-id');

      document.getElementById('detailedCardTitle').innerText = title;
      document.getElementById('detailedCardDeveloper').innerText = `Developer: ${developer}`;
      document.getElementById('detailedCardYear').innerText = `Year: ${year}`;
      document.getElementById('detailedCardGenre').innerText = `Genre: ${genre}`;
      document.getElementById('detailedCardStatus').innerText = `Status: ${status}`;
      document.getElementById('detailedCardScore').innerText = `Your Score: ${score}`;
      document.getElementById('detailedCardTime').innerText = `Time Played: ${time}`;

      detailedCardOverlay.style.display = 'block';
      const deleteButton = document.querySelector('.deleteButton');
      deleteButton.setAttribute('data-id', entryID);
      deleteButton.addEventListener('click', () => deleteEntry(entryID));

      const editButton = document.querySelector('.editButton');
      editButton.setAttribute('data-id', entryID);
      editButton.addEventListener('click', () => editEntry(entryID));
    });
  });

  const editEntry = (entryID) => {
    const title = document.getElementById('detailedCardTitle').innerText;
    const developer = document.getElementById('detailedCardDeveloper').innerText;
    const year = document.getElementById('detailedCardYear').innerText;
    const genre = document.getElementById('detailedCardGenre').innerText;
    const status = document.getElementById('detailedCardStatus').innerText;
    const score = document.getElementById('detailedCardScore').innerText;
    const time = document.getElementById('detailedCardTime').innerText;

    const newEntry = {
      title: title,
      developer: developer,
      year: year,
      genre: genre,
      status: status,
      score: score,
      time: time,
    };

    fetch("/games/edit/" + entryID, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry),
    }).then(() => {
      alert("Entry edited!");
      location.reload();
    });
  }

  closeDetailedCard.addEventListener('click', function () {
    detailedCardOverlay.style.display = 'none';
  });

  document.getElementById("addButton").addEventListener("click", addEntry);
  document.getElementById("logoutButton").addEventListener("click", () => {
    fetch("/auth/logout", {
      method: "POST",
    }).then(() => {
      alert("You are now logged out");
      window.location.href = "/auth/register";
    });
  });
});

function addEntry() {
  const entryTitle = document.getElementById("newEntryTitle").value;
  const entryDeveloper = document.getElementById("newEntryDeveloper").value;
  const entryYear = document.getElementById("newEntryYear").value;
  const entryGenre = document.getElementById("newEntryGenre").value;
  const entryStatus = document.getElementById("newEntryStatus").value;
  const entryScore = document.getElementById("newEntryScore").value;
  const entryTime = document.getElementById("newEntryTime").value;

  const newEntry = {
    title: entryTitle,
    developer: entryDeveloper,
    year: entryYear,
    genre: entryGenre,
    status: entryStatus,
    score: entryScore,
    time: entryTime,
  };

  fetch("/media/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEntry),
  }).then(() => {
    alert("New entry added!");
    location.reload();
  });
}

function deleteEntry(entryID) {
  try {
    fetch("/media/delete/" + entryID, {
      method: "DELETE",
    }).then(() => {
      location.reload();
    });
  } catch (error) {
    console.error(error);
  }
}
