console.log("Welome to notes app");
showNotes();

// if user add a note add it to local storage
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', function (e) {
    let addtxt = document.getElementById('addtxt');
    let addtitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title : addtitle.value,
        text : addtxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addtxt.value = "";
    addtitle.value = "";
    // console.log(notesObj);
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="notecard my-2 mx-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <div class="form-floating">
                        <p class="card-text">${element.text}</p>
                    </div>
                    <button onClick = "deleteNote(this.id)" class="btn btn-primary" id="${index}">Delete Note</button>
                </div>
            </div>
        `
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add a note " section to add notes.`;
    }
}

// Function to delete notes

function deleteNote(index) {
    // console.log('I am deleting',index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

let searchTxt = document.getElementById('searchtxt');
searchTxt.addEventListener("input", function () {
    let inputVal = searchTxt.value.toLowerCase();
    // console.log('Input event fired',inputVal);
    let notecards = document.getElementsByClassName(`notecard`);
    Array.from(notecards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    });
});



