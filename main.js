let myLibrary = [];

const shelf = document.querySelector(".shelf");

function Book(title,author,pages,read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    this.uuid = Math.floor(Math.random()*1000000),
    this.card = document.createElement("div");
    this.card.className = "book-card";
    let txt;
    let color;
    if (this.read == "on") {
        txt = "read";
        color = "green";
    } else {
        txt = "not read";
        color = "red";
    }
    this.card.innerHTML = `
    <img src="" alt="${title+' cover image.'}">
    <h1>${title}</h1>
    <button type="button" class="read-button rr${this.uuid}" onclick="toggleRead(${this.uuid});" style="background-color: ${color}">${txt}</button>
    <button type="button" class="rmv-book-btn" onclick="removeBook(${this.uuid});">X</button>
    `;
}

Book.prototype.removeSelf = function() {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].uuid == this.uuid) {
            myLibrary.splice(i,1);
            return;
        }
    }
}

function addBook(title,author,pages,read) {
    let x = new Book(title,author,pages,read);
    myLibrary.push(x);
    shelf.appendChild(x.card);
}

const newBookForm = document.createElement("form");

newBookForm.style.position = "absolute";
newBookForm.style.top = "20%";
newBookForm.style.bottom = "20%";
newBookForm.style.left = "20%";
newBookForm.style.right = "20%";
newBookForm.className = "new-book-form";

newBookForm.innerHTML = `
<div class="container">
    <h1>New Book:</h1>
    <div>
        <label for="title">Title:</label>
        <input type="text" name="title" id="title">
    </div>
    <div>
        <label for="author">Author:</label>
        <input type="text" name="author" id="author">
    </div>
    <div>
        <label for="pages">Pages:</label>
        <input type="number" name="pages" id="pages">
    </div>
    <span>
        <label for="read">I've read this before</label>
        <input type="checkbox" name="read" id="read">
    </span>
    <button type="button" class="submit-form" onclick="formSubmitter()">Submit</button>
</div>
<button type="button" class="close-form" onclick="closeBookForm()">X</button>`;

const newBookBtn = document.getElementsByClassName("new-book");
newBookBtn[0].addEventListener('click', e => {
    addBookForm();
});

let submitBtn;
let closeBtn;

function addBookForm() {
    document.body.appendChild(newBookForm);
    submitBtn = document.getElementsByClassName("submit-form");
    closeBtn = document.getElementsByClassName("close-form");
}

function closeBookForm() {
    document.body.removeChild(newBookForm);
}

function formSubmitter() {
    const form = new FormData(newBookForm);
    addBook(form.get("title"),form.get("author"),form.get("pages"),form.get("read"));
    console.log(myLibrary);
    document.body.removeChild(newBookForm);
}

function getByUUID(uuid, object) {
    for (let item of object) {
        if (item.uuid == uuid) {
            return item;
        }
    }
}

function removeBook(uuid) {
    let x = getByUUID(uuid,myLibrary);
    shelf.removeChild(x.card);
    x.removeSelf();
}

function toggleRead(uuid) {
    let x = getByUUID(uuid,myLibrary);
    if (x.read == "on") {
        x.read = "off";
    } else {
        x.read = "on";
    }
    const readBtn = document.querySelector(`.rr${uuid}`);
    if (x.read == "on") {
        readBtn.textContent = "read";
        readBtn.style.backgroundColor = "green";
    } else {
        readBtn.textContent = "not read";
        readBtn.style.backgroundColor = "red";
    }
    console.log(readBtn);
}
