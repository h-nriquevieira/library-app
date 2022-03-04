const modal = document.querySelector('.modal');
const addBookButton = document.querySelector('.add-book');
const closeButton = document.querySelector('.close');
const sendNewBook = document.querySelector('.send-book');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPage = document.querySelector('#pages');
const inputRead = document.querySelector('#read');
let removeButtons;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.index = myLibrary.length;
}

Book.prototype.info = function() {
    let isItRead = 'not read yet';
    if (this.read) {
      isItRead = 'already read'
    }
    return `${this.title} by ${this.author}, ${this.pages} pages, ${isItRead}.`;
}

let myLibrary = [];


function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    const bookCard = document.createElement('div');
    const title = document.createElement('h2');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const read = document.createElement('p');
    const remove = document.createElement('button')
    bookCard.classList.add('book-card');
    remove.classList.add('remove-book');
    title.textContent = myLibrary[0].title;
    author.textContent = myLibrary[0].author;
    pages.textContent = myLibrary[0].pages;
    read.textContent = myLibrary[0].read ? 'already read' : 'not read';
    remove.textContent = 'Delete book';
    bookCard.append(title, author, pages, read, remove);
    document.body.appendChild(bookCard);
  }
}

function updateRemoveButtons() {
  removeButtons = document.querySelectorAll('.remove-book');
  removeButtons.forEach(button => button.addEventListener('click', removeBook));
}

function removeBook() {
  let currentCard = this.parentNode;
  document.body.removeChild(currentCard);
}

function getNewBook() {
  if (inputTitle.value && inputAuthor.value && inputPage.value) {
    const newBook = new Book(inputTitle.value, inputAuthor.value, inputPage.value, inputRead.checked);
    addBookToLibrary(newBook);
    displayBooks();
    resetInputs();
    updateRemoveButtons();
    modal.style.display = 'none';
  }
}

function resetInputs() {
  inputTitle.value = '';
  inputAuthor.value = '';
  inputPage.value = '';
  inputRead.checked = false;
}

const hobbit = new Book('The Hobbit', 'JRR Tolkien', 295, true);
addBookToLibrary(hobbit);
displayBooks();
updateRemoveButtons();



addBookButton.addEventListener('click', () => modal.style.display = 'block');
closeButton.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => { if(e.target == modal) {modal.style.display = 'none'}});
sendNewBook.addEventListener('click', getNewBook);
