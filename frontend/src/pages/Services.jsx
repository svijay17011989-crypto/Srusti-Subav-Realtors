import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Services = () => {
  return (
    <>
      {/* ✅ SEO META */}
      <Helmet>
        <title>
          Real Estate Advisory Services in Coimbatore | Srusti Subav Realtors
        </title>
        <meta
          name="description"
          content="Explore premium real estate advisory services including residential plot consulting, land investment guidance, site visits, and end-to-end transaction support in Coimbatore."
        />
        <meta
          name="keywords"
          content="real estate services Coimbatore, plot advisory, land investment consulting, property evaluation, real estate advisors Tamil Nadu"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Our Services | Srusti Subav Realtors" />
        <meta
          property="og:description"
          content="Strategic real estate advisory services focused on legally verified plots, long-term value, and investor-safe property decisions."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="pt-28 bg-[#0a0f1c] text-white">
        {/* ================= HERO ================= */}
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-wide mb-6">
            Our Services
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Comprehensive real estate advisory services designed to deliver
            clarity, security and long-term value.
          </p>
        </div>

        {/* ================= CONTENT CARD ================= */}
        <div className="bg-white text-gray-900 rounded-t-[40px]">
          <div className="max-w-6xl mx-auto px-6 py-20 space-y-24">

            {/* SERVICE 1 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-6">
                  Residential Plot Advisory
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We specialize in identifying high-potential residential plots
                  in fast-developing corridors with strong appreciation outlook.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Every plot is evaluated for legal clarity, infrastructure
                  connectivity and future livability.
                </p>
              </div>

              <div className="bg-gray-100 rounded-2xl p-8">
                <ul className="space-y-4 text-sm">
                  <li>✔ DTCP-approved layouts</li>
                  <li>✔ Clear title & documentation</li>
                  <li>✔ Growth-driven locations</li>
                  <li>✔ Ideal for end-use & investment</li>
                </ul>
              </div>
            </div>

            {/* SERVICE 2 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 bg-gray-100 rounded-2xl p-8">
                <ul className="space-y-4 text-sm">
                  <li>✔ Location feasibility analysis</li>
                  <li>✔ Rental & resale potential review</li>
                  <li>✔ Market price benchmarking</li>
                  <li>✔ Risk-aware recommendations</li>
                </ul>
              </div>

              <div className="order-1 md:order-2">
                <h2 className="text-2xl font-semibold mb-6">
                  Investment Consulting
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our investment advisory is designed for buyers who seek
                  long-term value rather than short-term speculation.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We guide you with data-backed insights, helping you make
                  confident, informed real estate decisions.
                </p>
              </div>
            </div>

            {/* SERVICE 3 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-6">
                  Site Visits & Property Evaluation
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We organize and guide site visits, explaining location
                  advantages, development plans and investment suitability.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our team ensures you understand the ground reality before
                  making any commitment.
                </p>
              </div>

              <div className="bg-gray-100 rounded-2xl p-8">
                <ul className="space-y-4 text-sm">
                  <li>✔ Guided site inspections</li>
                  <li>✔ Area development insights</li>
                  <li>✔ Comparison with alternatives</li>
                  <li>✔ Honest pros & cons discussion</li>
                </ul>
              </div>
            </div>

            {/* SERVICE 4 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 bg-gray-100 rounded-2xl p-8">
                <ul className="space-y-4 text-sm">
                  <li>✔ Document verification</li>
                  <li>✔ Registration coordination</li>
                  <li>✔ Bank & legal liaison support</li>
                  <li>✔ Post-purchase assistance</li>
                </ul>
              </div>

              <div className="order-1 md:order-2">
                <h2 className="text-2xl font-semibold mb-6">
                  End-to-End Transaction Support
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  From initial inquiry to final registration, we stay involved
                  at every stage of the transaction.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our process-driven approach ensures a smooth, stress-free
                  buying experience.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-10">
              <h3 className="text-xl font-semibold mb-4">
                Ready to explore the right property?
              </h3>
              <p className="text-gray-600 mb-8">
                Connect with our advisory team for verified opportunities.
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

export default Services;
