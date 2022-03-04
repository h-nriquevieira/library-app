const modal = document.querySelector('.modal');
const library = document.querySelector('.library');
const addBookButton = document.querySelector('.add-book');
const closeButton = document.querySelector('.close');
const sendNewBook = document.querySelector('.send-book');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPage = document.querySelector('#pages');
const inputRead = document.querySelector('#read');
let removeButtons;
let readButtons;

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
  while (library.firstChild) {
    library.removeChild(library.firstChild);
  }
  for (let i = 0; i < myLibrary.length; i++) {
    const bookCard = document.createElement('div');
    const title = document.createElement('h2');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const read = document.createElement('p');
    const remove = document.createElement('button');
    const isRead = document.createElement('button');
    bookCard.classList.add('book-card');
    bookCard.dataset.index = i;
    remove.classList.add('remove-book');
    read.classList.add('read-indicator');
    read.classList.add('mark-read');
    isRead.classList.add('mark-read');
    if (myLibrary[i].read) {isRead.classList.add('read'); read.classList.add('read')};
    title.textContent = myLibrary[i].title;
    author.textContent = myLibrary[i].author;
    pages.textContent = myLibrary[i].pages;
    read.textContent = myLibrary[i].read ? 'already read' : 'not read';
    remove.textContent = 'Delete book';
    isRead.textContent = isRead.classList.contains('read') ? 'Make as not read' : 'Mark as read';
    bookCard.append(title, author, pages, read, remove, isRead);
    library.appendChild(bookCard);
  }
}

function updateRemoveButtons() {
  removeButtons = document.querySelectorAll('.remove-book');
  removeButtons.forEach(button => button.addEventListener('click', removeBook));
}

function updateReadButtons() {
  readButtons = document.querySelectorAll('.mark-read')
  readButtons.forEach(button => button.addEventListener('click', changeReadStatus));
}

function changeReadStatus() {
  let buttons = this.parentNode.querySelectorAll('.mark-read')
  if (this.classList.contains('read')) {
      for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.toggle('read');
      if (buttons[i].classList.contains('read-indicator')) {
        buttons[i].textContent = 'not read';
      } else {
        buttons[i].textContent = 'Mark as read';
      }
    }
  } else {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.toggle('read');
      if (buttons[i].classList.contains('read-indicator')) {
        buttons[i].textContent = 'already read';
      } else {
        buttons[i].textContent = 'Mark as not read';
      }
  }
}
}

function removeBook() {
  let currentCardIndex = this.parentNode.dataset.index;
  myLibrary.splice(currentCardIndex, 1);
  updateIndexes();
  displayBooks();
  updateRemoveButtons();
  updateReadButtons();
}

function updateIndexes() {
  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].index = i;
  }
}

function getNewBook() {
  if (inputTitle.value && inputAuthor.value && inputPage.value) {
    const newBook = new Book(inputTitle.value, inputAuthor.value, inputPage.value, inputRead.checked);
    addBookToLibrary(newBook);
    displayBooks();
    resetInputs();
    updateRemoveButtons();
    updateReadButtons();
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
updateReadButtons();


addBookButton.addEventListener('click', () => modal.style.display = 'block');
closeButton.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => { if(e.target == modal) {modal.style.display = 'none'}});
sendNewBook.addEventListener('click', getNewBook);