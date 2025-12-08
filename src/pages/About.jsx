// src/pages/About/About.jsx
const About = () => {
  return (
    <div className="min-h-screen py-24 px-6 bg-gradient-to-b from-base-100 to-base-200">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-10">
          About StyleDecor
        </h1>
        <div className="text-center text-xl text-base-content/80 space-y-6">
          <p>
            আমরা বাংলাদেশের সবচেয়ে বিশ্বস্ত হোম ও সেরিমনি ডেকোরেশন সার্ভিস প্রোভাইডার।
          </p>
          <p>
            ১০+ বছরের অভিজ্ঞতা, ৫০০০+ সফল প্রজেক্ট, ১০০+ প্রফেশনাল ডেকোরেটর।
          </p>
          <p className="text-2xl font-bold text-primary mt-10">
            আপনার স্বপ্নের অনুষ্ঠান আমরা সাজাই ভালোবাসা দিয়ে
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;