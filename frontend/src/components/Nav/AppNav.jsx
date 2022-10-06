import { Link } from 'react-router-dom'
import { Nav, NavItem, NavSection } from './index.js'

export const AppNav = () => {
    return (
        <Nav>
            <NavSection onClick={() => console.log('Hello Nav!')}>
                <NavItem>
                    <Link to="/" className="nav-link">Home</Link>
                </NavItem>
            </NavSection>
            <NavSection className="reverse-nav-section" style={{color: 'blue'}}>
                <NavItem>
                    <Link to="/system1" className="nav-link">System 1</Link>
                </NavItem>
            </NavSection>
        </Nav>
    )
}