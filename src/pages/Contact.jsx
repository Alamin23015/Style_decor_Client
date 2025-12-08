// src/pages/Contact/Contact.jsx
const Contact = () => {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold text-center text-primary mb-12">
          Contact Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="card bg-base-100 shadow-xl p-8">
            <div className="text-5xl text-primary mb-4">Phone</div>
            <p className="text-2xl font-bold">+880 1700-000000</p>
          </div>
          <div className="card bg-base-100 shadow-xl p-8">
            <div className="text-5xl text-primary mb-4">Email</div>
            <p className="text-2xl font-bold">info@styledecor.com</p>
          </div>
          <div className="card bg-base-100 shadow-xl p-8">
            <div className="text-5xl text-primary mb-4">Location</div>
            <p className="text-2xl font-bold">Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;