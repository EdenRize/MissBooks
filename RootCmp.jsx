const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { BookIndex } from "./pages/BookIndex.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { EditBook } from "./pages/EditBook.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import  { AboutTeam }  from "./cmps/AboutTeam.jsx"
import  {AboutGoal}  from "./cmps/AboutGoal.jsx"


export function App() {
    
    return (
        <Router>
        <section className="app">
           <AppHeader />
            <main>
                <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/book" element={<BookIndex />} />
                <Route path="/book/:bookId" element={<BookDetails />} />
                <Route path="/book/edit/:bookId" element={<EditBook />} />
                <Route path="/book/edit" element={<EditBook />} />
                <Route path="/about" element={<AboutUs />} >
                    <Route path="/about/team" element={<AboutTeam />} />
                    <Route path="/about/goal" element={<AboutGoal />} />
                </Route>
                </Routes>
            </main>
            <UserMsg />
        </section>
        </Router>
    )
}