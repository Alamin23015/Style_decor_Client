
const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content pt-12 pb-6 px-6 mt-auto">

      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-3xl font-bold text-primary">StyleDecor</h2>
          <p className="mt-3 opacity-80">
            Your trusted partner for home, wedding, and event decorations.
          </p>
        </div>

        <div>
          <h3 className="footer-title text-lg mb-3 font-semibold">Services</h3>
          <ul className="space-y-2">
            <li><a className="link link-hover">Home Decoration</a></li>
            <li><a className="link link-hover">Wedding Setup</a></li>
            <li><a className="link link-hover">Corporate Events</a></li>
            <li><a className="link link-hover">Consultation</a></li>
          </ul>
        </div>

     
        <div>
          <h3 className="footer-title text-lg mb-3 font-semibold">Company</h3>
          <ul className="space-y-2">
            <li><a className="link link-hover">About Us</a></li>
            <li><a className="link link-hover">Contact</a></li>
            <li><a className="link link-hover">Blog</a></li>
            <li><a className="link link-hover">Careers</a></li>
          </ul>
        </div>

       
        <div>
          <h3 className="footer-title text-lg mb-3 font-semibold">Contact</h3>
          <p className="opacity-80">Dhaka, Bangladesh</p>
          <p className="opacity-80">+880 1234-567890</p>
          <p className="opacity-80">info@styledecor.com</p>
          <p className="opacity-80">Sat–Thu: 9AM–10PM</p>
        </div>

      </div>

     
      <div className="max-w-7xl mx-auto pt-6 mt-10 border-t border-base-300 text-center">
        <p className="opacity-70">
          © 2025 <span className="font-semibold">StyleDecor</span> — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
