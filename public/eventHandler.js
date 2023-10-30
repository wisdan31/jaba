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

document.getElementById("addButton").addEventListener("click", addEntry);