export const NavSection = ({children, ...props}) => {
    return (
        <section className='nav-section' {...props}>
            {children}
        </section>
    )
}