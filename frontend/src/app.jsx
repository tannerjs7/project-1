import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, PageNotFound } from './pages'
import "./index.css"
// import { AppNav } from './components/Nav'

export const App = () => {
    return (
        <BrowserRouter>
            {/* <AppNav /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <footer>Footer!</footer>
        </BrowserRouter>
    )
}