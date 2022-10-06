import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, PageNotFound, System1 } from './pages'
import { AppNav } from './components/Nav'
import "./index.css"

export const App = () => {
    return (
        <BrowserRouter>
            <AppNav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/systems/1" element={<System1 />} />
                <Route path="/systems/2" element={<System2 />} />
                <Route path="/systems/3" element={<System3 />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}