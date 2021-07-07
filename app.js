// Dom elements
const bookForm = document.querySelector('.book-form');
const booksContainer = document.querySelector('.books-container');
const addBookBtn = document.querySelector('.add-book-btn');
const modalForm = document.querySelector('.modal-form');
const closeModal = document.querySelector('.close');
// Initialize library with two books
let myLibrary = [new Book('Catcher in the Rye', 'J D Salinger', 327, 'true'), new Book('The Grapes of Wrath', 'John Steinbeck', 897, 'false')];

// Book constructor
function Book(title, author, pageCount, haveRead) {
    this.title = title
    this.author = author
    this.pageCount = pageCount
    this.haveRead = haveRead === 'true'
}

// Prototype method to make haveRead more readable
Book.prototype.prettifyHaveRead = function() {
    let result = (this.haveRead ? 'Yes!' : 'Not yet!');
    return result;
} 

Book.prototype.iReadIt = function() {
    this.haveRead = true;
}

// Renders full myLibarary in books container
function renderMyLibrary() {
    let booksContainerHTML = '';
    
    myLibrary.forEach( (book, index) => {
        bookCardHTML = `<div class="col-sm-6 col-lg-4">
            <div class="book-card">
                <ul class="book-info">
                    <li class="book-info-item"><strong>Title:</strong> ${book.title}</li>
                    <li class="book-info-item"><strong>Author:</strong> ${book.author}</li>
                    <li class="book-info-item"><strong>Page Count:</strong> ${book.pageCount}</li>
                    <li class="book-info-item"><strong>Read Yet?</strong> ${book.prettifyHaveRead()}</li>
                </ul>
                <button class="btn btn-primary delete-btn" data-id="${index}">Delete</button>`;
        // Only add the Read it! button if the book has not been read
        if (!book.haveRead) {
            bookCardHTML += `<button class="btn btn-primary read-btn" data-id="${index}">I read it!</button>`;
        }
        // Close out .book-card and .col
        bookCardHTML += "</div></div>";
                
        booksContainerHTML += bookCardHTML;
    })

    booksContainer.innerHTML = booksContainerHTML;
    addEventListenersToDelete();
    addEventListenersToRead();
}

// Delete book
function addEventListenersToDelete() {
    document.querySelectorAll('.delete-btn').forEach( btn => {
        btn.addEventListener('click', deleteBook);
    });

}

function deleteBook(event) {
    const deleteBookId = event.target.dataset.id;
    myLibrary.splice(deleteBookId, 1);
    renderMyLibrary();
}

// Read button
function addEventListenersToRead() {
    document.querySelectorAll('.read-btn').forEach( btn => {
        btn.addEventListener('click', markAsRead);
    })
}

function markAsRead(event) {
    readBookId = event.target.dataset.id;
    myLibrary[parseInt(readBookId)].iReadIt();
    renderMyLibrary();
}
// Submit new book

bookForm.addEventListener('submit', function(evt) {
    evt.preventDefault();

    // Build newBook from form data
    const formData = new FormData(bookForm);
    const newBook = new Book(...formData.values())
    // Add it to myLibrary
    myLibrary.push(newBook);
    
    // Reset form, rerender library and remove form
    bookForm.reset();
    renderMyLibrary();
    hideModal();
})

// Modal functionality

function hideModal() {
    modalForm.style.display = "none";
}

// Open modal
addBookBtn.addEventListener('click', function() {
    modalForm.style.display = "flex";
})

// Close model when user clicks 'x' or outside of modal
closeModal.addEventListener('click', function() {
    hideModal();
})

window.addEventListener('click', function(evt) {
    if (evt.target == modalForm) {
        hideModal();
    }
})

renderMyLibrary();
addEventListenersToDelete();