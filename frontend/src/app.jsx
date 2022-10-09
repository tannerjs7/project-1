import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PageNotFound, System1, System2, System3 } from './pages'
import { AppNav } from './components/Nav'
import "./index.css"

export const App = () => {
    return (
        <BrowserRouter>
            <AppNav />
            <Routes>
                <Route path="/systems/1" element={<System1 />} />
                <Route path="/systems/2" element={<System2 />} />
                <Route path="/systems/3" element={<System3 />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}