let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read){
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}


function addBook(e){

    e.preventDefault();

    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let read = readInput.checked;

    addBookToLibrary(title, author, pages, read);
    renderTable();

    addBookForm.reset();
    console.log(myLibrary);
}


function createBookRow(i, book){
    const row = document.createElement('tr');
    row.dataset.bookId = i;
    row.innerHTML = `
        <th scope="row">${i+1}</th>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td >
            ${ book.read ? '<button class="btn btn-success col-12" data-readStatus >Read</button>' : '<button class="btn btn-warning col-12" data-readStatus >Not Read</button>'} 
        </td>
        <td>
            <button class="btn btn-danger"  data-deleteBook ><i class="bi bi-trash-fill"></i></button>
        </td>
    `
    row.querySelector('[data-readStatus]').onclick = toggleReadStatus;
    row.querySelector('[data-deleteBook]').onclick = deleteBook;

    return row;
}

function toggleReadStatus(e){
    let bookId = e.currentTarget.parentElement.parentElement.dataset.bookId;
    myLibrary[bookId].read = !(myLibrary[bookId].read);

    renderTable();
}

function deleteBook(e){
    let bookId = e.currentTarget.parentElement.parentElement.dataset.bookId;
    console.log('deleting book with id : ',bookId);
    myLibrary.splice(bookId, 1);
    renderTable();
}

function renderTable(){

    booksTableBody.innerHTML = "";

    for( let [i,book] of myLibrary.entries() ){
        booksTableBody.appendChild( createBookRow(i, book) );
    }
}

const addBookForm = document.getElementById('addBookForm');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');

const refreshBtn = document.getElementById('refreshButton');

const booksTableBody = document.getElementById('booksTableBody');

refreshBtn.onclick = renderTable;
addBookForm.onsubmit = addBook;
renderTable();


