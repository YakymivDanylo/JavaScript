function libraryManagement() {

    let library = [
        { title: "1984", author: "George Orwell", genre: "Dystopian", pages: 328, isAvailable: true },
        { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", pages: 281, isAvailable: true },
        { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", pages: 180, isAvailable: false },
        { title: "Moby-Dick", author: "Herman Melville", genre: "Adventure", pages: 585, isAvailable: true },
        { title: "War and Peace", author: "Leo Tolstoy", genre: "Historical Fiction", pages: 1225, isAvailable: false }
    ];

    function addBook(title, author, genre, pages) {
        const newBook = {
            title: title,
            author: author,
            genre: genre,
            pages: pages,
            isAvailable: true
        };
        library.push(newBook);
    }

    function removeBook(title) {

        const index = library.findIndex(book => book.title === title);


        if (index !== -1) {
            library.splice(index, 1);
        } else {
            console.log(`Книга з назвою "${title}" не знайдена.`);
        }
    }

    function findBooksByAuthor(author) {
        return library.filter(book => book.author === author);
    }

    function toggleBookAvailability(title, isBorrowed) {
        const book = library.find(book => book.title === title);
        if (book) {
            book.isAvailable = !isBorrowed;
        }
    }


    function sortBooksByPages() {
        library.sort((a, b) => a.pages - b.pages);
    }

    function getBooksStatistics() {
        const totalBooks = library.length;
        const availableBooks = library.filter(book => book.isAvailable).length;
        const borrowedBooks = totalBooks - availableBooks;
        const avgPages = library.reduce((sum, book) => sum + book.pages, 0) / totalBooks;

        return {
            totalBooks,
            availableBooks,
            borrowedBooks,
            avgPages
        };
    }

    return {
        library,
        addBook,
        removeBook,
        findBooksByAuthor,
        toggleBookAvailability,
        sortBooksByPages,
        getBooksStatistics
    };
}


const myLibrary = libraryManagement();

// myLibrary.addBook("The Catcher in the Rye", "J.D. Salinger", "Fiction", 277);
// console.log(myLibrary.library)

// myLibrary.removeBook("1984");
// console.log(myLibrary.library)

// console.log(myLibrary.findBooksByAuthor("Harper Lee"));

// myLibrary.toggleBookAvailability("Moby-Dick", true);
// console.log(myLibrary.library)

// myLibrary.sortBooksByPages();
// console.log(myLibrary.library);

// console.log(myLibrary.getBooksStatistics());
