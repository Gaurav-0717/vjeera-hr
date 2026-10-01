import { Link } from "react-router-dom";

const focusAreas = [
  "Corporate Training",
  "One-on-One and Team Coaching",
  "Sales and leadership consulting services",
  "Certification programs for young professionals",
  "Executive Education Programs from premium Institutes",
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-7">
              <p className="eyebrow mb-3">ISO 9001:2015 Certified</p>
              <h1 className="hero-title">Build stronger people practices.</h1>
              <p className="lead mb-4">
                HR training solutions from entry-level to senior management —
                grounded in practical learning and delivered by an experienced
                team of industry experts.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/courses" className="btn btn-warning btn-lg fw-bold">
                  Explore Courses
                </Link>
                <Link
                  to="/contact"
                  className="btn btn-outline-light btn-lg fw-bold"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="card border-0">
                <img
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85"
                  alt="Colleagues collaborating around a table"
                  className="hero-media"
                />
                <div className="hero-panel mt-3">
                  <h2 className="fw-bold">Learning built around practice</h2>
                  <p>
                    Explore HR training, talent services and corporate
                    development from one team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-5">
        <div className="container">
          <h2 className="section-title">Our Story</h2>

          <p className="mb-3">
            Vjeera is one of the most admired talent transformational and
            reskilling organisations enabling sustainable business and
            organisational culture impact. Its mission is to improve business
            productivity and enhance leadership development across the
            organisation, imparting highly engaging corporate training,
            workshops and coaching services with a clear focus on results.
          </p>
          <p className="mb-4">
            The reskilling institute works extensively in skill enhancement and
            youth employability. Professionals can build career-relevant skills
            through certification programmes shaped around practical learning.
            Vjeera has also partnered with Times Group to provide executive
            education for working professionals from premium management
            institutes.
          </p>

          <div className="row g-4 mt-2">
            <div className="col-md-6">
              <div className="card bg-dark text-white border-0">
                <div className="card-body">
                  <h3 className="card-title fw-bold">Vision</h3>
                  <p className="card-text">
                    Impacting life by creating limitless opportunities. We
                    envision a future where every individual has access to the
                    right opportunities, skills, and resources to achieve their
                    professional goals. Through innovation, continuous learning,
                    and meaningful connections, we aim to build a talented
                    workforce and empower organizations to grow and succeed.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card bg-info text-white border-0">
                <div className="card-body">
                  <h3 className="card-title fw-bold">Values</h3>
                  <p className="card-text">
                    Transparent, Humble &amp; Resilient. We believe in building
                    trust through honesty, staying grounded in every
                    interaction, and embracing challenges with determination.
                    Our values guide us to create strong relationships, deliver
                    meaningful solutions, and continuously grow together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="display-6 fw-bold mb-4">
            Five Key Areas of Development
          </h2>
          <div className="row g-3 mt-1">
            {focusAreas.map((area, i) => (
              <div className="col-md-6 col-lg-4" key={area}>
                <div className="card border-0 h-100">
                  <div className="card-body">
                    <span className="badge bg-info me-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{area}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section section-alt">
        <div className="container">
          <div className="row align-items-center gy-3">
            <div className="col-lg-8">
              <p className="eyebrow">Start a conversation</p>
              <h2 className="section-title mb-2">
                Find the right next step for your team or career.
              </h2>
              <p className="section-body mb-0">
                Talk with Vjeera HR about practical learning, people development
                or recruitment support.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link to="/contact" className="btn btn-cta">
                Contact Vjeera HR
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
