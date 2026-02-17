import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <>
      {/* ================= SEO ================= */}
      <Helmet>
        <title>
          About Us | Trusted Real Estate Advisors in Coimbatore – Srusti Subav Realtors
        </title>

        <meta
          name="description"
          content="Srusti Subav Realtors is a trusted real estate advisory in Coimbatore specializing in premium residential plots, land investments, and legally verified properties."
        />

        <meta
          name="keywords"
          content="about srusti subav realtors, real estate advisory coimbatore, land investment consultants, residential plots coimbatore"
        />

        {/* Open Graph */}
        <meta property="og:title" content="About Srusti Subav Realtors" />
        <meta
          property="og:description"
          content="A trusted real estate advisory delivering transparent, secure and future-ready property investments across Coimbatore’s prime growth corridors."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ================= PAGE CONTENT ================= */}
      <section className="pt-28 bg-[#0a0f1c] text-white">
        {/* ================= HERO ================= */}
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-wide mb-6">
            About Srusti Subav Realtors
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            A trusted real estate advisory delivering transparent, secure and
            future-ready property investments across prime growth corridors.
          </p>
        </div>

        {/* ================= CONTENT CARD ================= */}
        <div className="bg-white text-gray-900 rounded-t-[40px]">
          <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">

            {/* WHO WE ARE */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-6">
                  Who We Are
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Srusti Subav Realtors is a professionally managed real estate
                  advisory focused on residential plots, villas and land
                  investments in high-potential locations.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We operate with a long-term vision — prioritizing legal clarity,
                  growth viability and complete peace of mind for our clients,
                  whether they are first-time buyers or seasoned investors.
                </p>
              </div>

              <div className="bg-gray-100 rounded-2xl p-8">
                <ul className="space-y-4 text-sm">
                  <li>✔ DTCP-approved & legally verified properties</li>
                  <li>✔ Transparent pricing & documentation</li>
                  <li>✔ High-growth residential corridors</li>
                  <li>✔ End-to-end advisory support</li>
                </ul>
              </div>
            </div>

            {/* OUR MISSION */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 bg-gray-100 rounded-2xl p-8">
                <p className="text-gray-700 text-lg leading-relaxed">
                  Our mission is to simplify real estate decisions by combining
                  market intelligence, ethical practices and hands-on guidance —
                  ensuring every investment stands strong over time.
                </p>
              </div>

              <div className="order-1 md:order-2">
                <h2 className="text-2xl font-semibold mb-6">
                  Our Mission
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We believe real estate is not just about property — it’s about
                  trust, timing and long-term value creation. Every recommendation
                  we make is backed by due diligence and growth fundamentals.
                </p>
              </div>
            </div>

            {/* WHY TRUST US */}
            <div>
              <h2 className="text-2xl font-semibold mb-10 text-center">
                Why Clients Trust Us
              </h2>

              <div className="grid md:grid-cols-3 gap-10">
                <div className="p-6 rounded-xl border">
                  <h3 className="font-semibold mb-3">
                    Investor-Focused Approach
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Every property is evaluated for appreciation potential,
                    livability and long-term resale value.
                  </p>
                </div>

                <div className="p-6 rounded-xl border">
                  <h3 className="font-semibold mb-3">
                    Complete Transparency
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Clear documentation, verified titles and honest communication
                    at every stage.
                  </p>
                </div>

                <div className="p-6 rounded-xl border">
                  <h3 className="font-semibold mb-3">
                    Guided End-to-End
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    From site visits to registration, we assist you throughout
                    the entire buying journey.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-10">
              <h3 className="text-xl font-semibold mb-4">
                Looking for a secure property investment?
              </h3>
              <p className="text-gray-600 mb-8">
                Speak with our advisory team and explore verified opportunities.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-black text-white px-8 py-4 rounded-full hover:bg-gray-900 transition"
              >
                Contact Us
              </Link>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default About;
