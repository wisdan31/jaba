document.addEventListener('DOMContentLoaded', function () {
    const moreButtons = document.querySelectorAll('.moreButton');
    const detailedCardOverlay = document.getElementById('detailedCardOverlay');
    const closeDetailedCard = document.getElementById('closeDetailedCard');

    moreButtons.forEach(button => {
        button.addEventListener('click', function () {
            const tableRow = this.closest('tr');
            const title = tableRow.querySelector('td:nth-child(1)').innerText;
            const author = tableRow.querySelector('td:nth-child(2)').innerText;
            const year = tableRow.querySelector('td:nth-child(3)').innerText;
            const genre = tableRow.querySelector('td:nth-child(4)').innerText;
            const status = tableRow.querySelector('td:nth-child(5)').innerText;
            const score = tableRow.querySelector('td:nth-child(6)').innerText;
            const entryID = this.getAttribute('data-id');

            document.getElementById('detailedCardTitle').innerText = title;
            document.getElementById('detailedCardAuthor').innerText = `Author: ${author}`;
            document.getElementById('detailedCardYear').innerText = `Year: ${year}`;
            document.getElementById('detailedCardGenre').innerText = `Genre: ${genre}`;
            document.getElementById('detailedCardStatus').innerText = `Status: ${status}`;
            document.getElementById('detailedCardScore').innerText = `Your Score: ${score}`;

            detailedCardOverlay.style.display = 'block';
            const deleteButton = document.querySelector('.deleteButton');
            deleteButton.setAttribute('data-id', entryID);
            deleteButton.addEventListener('click', () => deleteEntry(entryID));
        });
    });

    closeDetailedCard.addEventListener('click', function () {
        detailedCardOverlay.style.display = 'none';
    });

    document.getElementById("addButton").addEventListener("click", addBook);
    document.getElementById("logoutButton").addEventListener("click", () => {
        fetch("/auth/logout", {
            method: "POST",
        }).then(() => {
            alert("You are now logged out");
            window.location.href = "/auth/register";
        });
    });
});

function addBook() {
    const entryTitle = document.getElementById("newEntryTitle").value;
    const entryAuthor = document.getElementById("newEntryAuthor").value;
    const entryYear = document.getElementById("newEntryYear").value;
    const entryGenre = document.getElementById("newEntryGenre").value;
    const entryStatus = document.getElementById("newEntryStatus").value;
    const entryScore = document.getElementById("newEntryScore").value;

    const newEntry = {
        title: entryTitle,
        author: entryAuthor,
        year: entryYear,
        genre: entryGenre,
        status: entryStatus,
        score: entryScore,
    };

    fetch("/media/addBook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
    }).then(() => {
        alert("New book added!");
        location.reload();
    });
}

function deleteEntry(entryID) {
    try {
        fetch("/media/deleteBook/" + entryID, {
            method: "DELETE",
        }).then(() => {
            location.reload();
        });
    } catch (error) {
        console.error(error);
    }
}
