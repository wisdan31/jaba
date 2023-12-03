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
      document.getElementById('deleteButton').setAttribute('data-id', entryID);
    });
  });

  closeDetailedCard.addEventListener('click', function () {
    detailedCardOverlay.style.display = 'none';
  });

  const deleteButton = document.getElementById('deleteButton');
  deleteButton.addEventListener('click', function () {
    const entryID = this.getAttribute('data-id');
    console.log('Delete button clicked for entry with ID:', entryID);
  });
});

function addEntry() {
  console.log("Adding entry...");
  const entryTitle = document.getElementById("newEntryTitle").value;
  const entryDelevoper = document.getElementById("newEntryDeveloper").value;
  const entryYear = document.getElementById("newEntryYear").value;
  const entryGenre = document.getElementById("newEntryGenre").value;
  const entryStatus = document.getElementById("newEntryStatus").value;
  const entryScore = document.getElementById("newEntryScore").value;
  const entryTime = document.getElementById("newEntryTime").value;

  const newEntry = {
    title: entryTitle,
    developer: entryDelevoper,
    year: entryYear,
    genre: entryGenre,
    status: entryStatus,
    score: entryScore,
    time: entryTime,
  };

  fetch("/games/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEntry),
  }).then(() => {
    alert("New entry added!");
    location.reload();
  });
}

function deleteEntry(button) {
  const entryID = button.getAttribute("data-id");

  try {
    fetch("/games/delete/" + entryID, {
      method: "DELETE",
    }).then(() => {
      alert("Entry deleted!");
      location.reload();
    });
  } catch (error) {
    console.error(error);
  }
}

const deleteButtons = document.getElementsByClassName("deleteButton");
Array.from(deleteButtons).forEach((button) => {
  button.addEventListener("click", () => deleteEntry(button));
});

document.getElementById("addButton").addEventListener("click", addEntry);

document.getElementById("logoutButton").addEventListener("click", () => {
    fetch("/auth/logout", {
        method: "POST",
    }).then(() => {
        alert("You are now logged out");
        window.location.href = "/auth/register";
    });
})