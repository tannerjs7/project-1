import { Link } from 'react-router-dom'
import { Nav, NavItem, NavSection } from './index.js'

// Links to the home page and each of the system pages.
export const AppNav = () => {
    return (
        <Nav>
            <NavSection>
                <NavItem>
                    <Link to="/" className="nav-link">Home</Link>
                </NavItem>
                <NavItem>
                    <Link to="/systems/1" className="nav-link">System 1</Link>
                </NavItem>
                <NavItem>
                    <Link to="/systems/2" className="nav-link">System 2</Link>
                </NavItem>
                <NavItem>
                    <Link to="/systems/3" className="nav-link">System 3</Link>
                </NavItem>
            </NavSection>
        </Nav>
    )
}