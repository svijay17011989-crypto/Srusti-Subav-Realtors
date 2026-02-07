const Contact = () => {
  return (
    <section className="pt-28 bg-[#0a0f1c] text-white">
      
      {/* HERO */}
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-wide mb-6">
          Get in Touch
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Premium real estate advisory for residential, commercial and land investments.
        </p>
      </div>

      {/* CONTACT CARD */}
      <div className="bg-white text-gray-900 rounded-t-[40px]">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">

          {/* LEFT */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Srusti Subav Realtors
            </h2>

            <p className="text-gray-600 mb-8 leading-relaxed">
              We specialize in curated real estate solutions across Coimbatore
              with complete transparency and premium service.
            </p>

            <div className="space-y-4 text-sm">
              <p>
                <span className="font-medium">📍 Location:</span> Kalapatti, Coimbatore
              </p>
              <p>
                <span className="font-medium">📞 Phone:</span> +91 8466069839
              </p>
              <p>
                <span className="font-medium">✉️ Email:</span> info@srustisubav.com
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-[#f9fafb] rounded-2xl p-10 shadow-sm">
            <h3 className="text-xl font-semibold mb-6">
              Send us a message
            </h3>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 border rounded-md focus:outline-none"
              />

              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 border rounded-md focus:outline-none"
              />

              <textarea
                rows="4"
                placeholder="Your message"
                className="w-full px-4 py-3 border rounded-md focus:outline-none"
              />

              <button
                type="button"
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
