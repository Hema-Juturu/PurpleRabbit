const Hero = () => {
  return (
    <section className="relative h-screen bg-fixed bg-center bg-transparent">
      <div className="absolute inset-0 backdrop-blur-sm" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-5xl md:text-6xl font-brand text-purple tracking-wider">
          Purple<span className="text-gold">Rabbit</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-softWhite max-w-2xl">
          Discover your style —{" "}
          <span className="text-gold font-semibold">Buy</span> or{" "}
          <span className="text-purple font-semibold">Rent</span>
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gold text-black px-6 py-3 rounded-xl text-lg font-semibold shadow-md border-2 border-transparent hover:border-white hover: transition active:scale-95 active:shadow-inner">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
