const Footer = () => {
    return (
        <footer className="footer p-10 bg-neutral text-neutral-content mt-10">
            <aside>
                <h2 className="text-3xl font-bold text-orange-500">StyleDecor</h2>
                <p>Decoration Service Providing Ltd.<br/>Providing reliable services since 2024</p>
            </aside> 
            <nav>
                <header className="footer-title">Services</header> 
                <a className="link link-hover">Branding</a> 
                <a className="link link-hover">Design</a> 
                <a className="link link-hover">Marketing</a> 
            </nav> 
            <nav>
                <header className="footer-title">Company</header> 
                <a className="link link-hover">About us</a> 
                <a className="link link-hover">Contact</a> 
            </nav> 
            <nav>
                <header className="footer-title">Legal</header> 
                <a className="link link-hover">Terms of use</a> 
                <a className="link link-hover">Privacy policy</a> 
            </nav>
        </footer>
    );
};

export default Footer;