const Home = () => {
    return (
        <div>
            <div className="hero min-h-[500px]" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop)'}}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Make Your Event Memorable</h1>
                        <p className="mb-5">Expert decoration services for weddings, birthdays, and corporate events.</p>
                        <button className="btn btn-primary bg-orange-500 border-none text-white">Book Now</button>
                    </div>
                </div>
            </div>
            {/* এখানে পরে সার্ভিস সেকশন বসাবেন */}
        </div>
    );
};

export default Home;