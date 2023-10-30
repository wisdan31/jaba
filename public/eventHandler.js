function addEntry(){
    console.log("Adding entry...")
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
        time: entryTime
    };

    fetch("/games/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEntry)
    }).then(() => {
        alert("New entry added!");
    })
}

const deleteButtons = document.getElementsByClassName("deleteButton");
Array.from(deleteButtons).forEach(button => {
    button.addEventListener("click", () => {
        const entryID = button.getAttribute("data-id");

        try {
            fetch("/games/delete/" + entryID, {
                method: "DELETE"
            }).then(() => {
                alert("Entry deleted!");
                location.reload();
            })
        } catch (error) {
            console.error(error);
        }
    })
});

document.getElementById("addButton").addEventListener("click", addEntry);