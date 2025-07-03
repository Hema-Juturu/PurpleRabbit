const NewsLetter = () => {
  return (
    <>
      <section className="p-6 bg-[#1a1a1a] text-white text-center rounded-t-3xl">
        <h2 className="text-2xl font-semibold text-gold font-brand">
          Stay in the Loop
        </h2>
        <p className="mt-2 text-softWhite">
          Get exclusive deals & style updates in your inbox
        </p>

        <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-3 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full sm:w-2/3 px-5 py-3 rounded-xl bg-[#111] text-white placeholder-gray-400 border border-purple focus:outline-none focus:ring-2 focus:ring-purple transition"
          />
          <button className="px-6 py-3 bg-gold text-black rounded-xl font-semibold hover:bg-yellow-400 transition active:scale-95">
            Subscribe
          </button>
        </div>
      </section>
    </>
  );
};

export default NewsLetter;
