const modal = document.querySelector('.modal');
const addBookButton = document.querySelector('.add-book');
const closeButton = document.querySelector('.close');
const sendNewBook = document.querySelector('.send-book');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPage = document.querySelector('#pages');
const inputRead = document.querySelector('#read');


function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
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
  const bookCard = document.createElement('div');
  const title = document.createElement('h2');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const read = document.createElement('p');
  bookCard.classList.add('.book-card');
  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages;
  read.textContent = book.read ? 'already read' : 'not read';
  bookCard.append(title, author, pages, read);
  myLibrary.push(bookCard);
}

function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    document.body.appendChild(myLibrary[i]);
  }
}

function getNewBook() {
  if (inputTitle.value && inputAuthor.value && inputPage.value) {
    const newBook = new Book(inputTitle.value, inputAuthor.value, inputPage.value, inputRead.checked);
    console.dir(newBook);
    addBookToLibrary(newBook);
    displayBooks();
    resetInputs();
  }
}

function resetInputs() {
  inputTitle.value = '';
  inputAuthor.value = '';
  inputPage.value = '';
  inputRead.checked = false;
}

const hobbit = new Book('The Hobbit', 'JRR Tolkien', 295, true);



addBookButton.addEventListener('click', () => modal.style.display = 'block');
closeButton.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => { if(e.target == modal) {modal.style.display = 'none'}});
sendNewBook.addEventListener('click', getNewBook);
