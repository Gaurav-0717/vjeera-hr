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
      <section className="bg-dark text-white py-5">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-7">
              <p className="text-info fw-bold small mb-3">
                ISO 9001:2015 Certified
              </p>
              <h1 className="display-5 fw-bold mb-3">
                Best HR Professional
                <br />
                Training Services
              </h1>
              <p className="lead mb-4">
                360-degree HR training solutions from entry-level to senior
                management — delivered through a 100% practical approach by an
                experienced team of industry experts.
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
                  src="https://th.bing.com/th/id/OIP.ECOBoNgu8AbkfZGNS6refAHaEK?w=295&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
                  alt="Training"
                  className="card-img-top"
                  style={{ borderRadius: 8 }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold text-dark">100%</h5>
                  <p className="card-text small">Placement Assistance</p>
                  <hr />
                  <h5 className="card-title fw-bold text-dark">360°</h5>
                  <p className="card-text small">
                    Training, entry-level to senior management
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
          <h2 className="display-6 fw-bold mb-4">Our Story</h2>

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
            youth employability. Hundreds of young professionals accelerate
            their careers every year through its certification programmes,
            delivered through a 100% practical approach. Vjeera has also
            partnered with Times Group to provide executive education for
            working professionals from premium management institutes.
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
      <section className="py-5">
        <div className="container">
          <blockquote className="blockquote text-center">
            <p className="mb-0">
              "It will be a great option for you if you want to strengthen your
              concepts while also having practical learning opportunities. The
              teachers are very helpful and always ready to guide. A flexible
              and friendly learning environment that motivates you to improve
              irrespective of what knowledge you start with."
            </p>
          </blockquote>
        </div>
      </section>
    </>
  );
}

export default Home;
