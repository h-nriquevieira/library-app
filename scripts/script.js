let myLibrary = [];
const modal = document.querySelector('.modal');
const addBookButton = document.querySelector('.add-book');
const closeButton = document.querySelector('.close');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    let isItRead = 'not read yet';
    if (this.read) {
      isItRead = 'already read'
    }
    return `${this.title} by ${this.author}, ${this.pages} pages, ${isItRead}.`;
  }
}

myLibrary.push(new Book('The Hobbit', 'Tolkien', 295, true));
myLibrary.push(new Book('The Great Gatsby', 'Francis Scott Fitzgerald', 163, true));

function addBookToLibrary(title, author, pages, isItRead) {
  myLibrary.push(new Book(title, author, pages, isItRead));
}

function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    let bookCard = document.createElement('div');
    let bookTitle = document.createElement('h2');
    let bookAuthor = document.createElement('p');
    let bookPages = document.createElement('p');
    let bookRead = document.createElement('p');
    bookTitle.textContent = myLibrary[i].title;
    bookAuthor.textContent = myLibrary[i].author;
    bookPages.textContent = myLibrary[i].pages;
    if (myLibrary[i].read) {
      bookRead.textContent = 'Read';
    } else {bookRead.textContent = 'Not read'}
    bookCard.append(bookTitle, bookAuthor, bookPages, bookRead);
    document.body.appendChild(bookCard);
  }
}

addBookButton.addEventListener('click', () => modal.style.display = 'block');
closeButton.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => {if(e.target == modal) modal.style.display = 'none'});