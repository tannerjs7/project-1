import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, PageNotFound } from './pages'
import { AppNav } from './components/Nav'
import "./index.css"

export const App = () => {
    return (
        <BrowserRouter>
            <AppNav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            {/* <footer>Footer!</footer> */}
        </BrowserRouter>
    )
}