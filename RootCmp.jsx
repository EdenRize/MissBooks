import { BookIndex } from "./pages/BookIndex.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { HomePage } from "./pages/HomePage.jsx"

const { useState } = React

export function App() {
    const [page, setPage] = useState('books')
    return (
        <section className="app">
            <header className="app-header full main-layout">
                <section>
                    <h1>Miss Books</h1>
                    <nav className="app-nav">
                        <a onClick={() => setPage('home')} href="#">Home</a>
                        <a onClick={() => setPage('about')} href="#">About</a>
                        <a onClick={() => setPage('books')} href="#">Books</a>
                    </nav>
                </section>
            </header>

            <main className="main-layout">
                {page === 'home' && <HomePage />}
                {page === 'about' && <AboutUs />}
                {page === 'books' && <BookIndex />}
            </main>
        </section>
    )
}