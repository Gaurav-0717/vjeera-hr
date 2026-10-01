import { Link } from "react-router-dom";

function OurClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="public-page-hero">
        <div className="container">
          <p className="eyebrow">Partnerships</p>
          <h1 className="fw-bold mb-3">Our Clients</h1>
          <p className="lead">
            People-focused work, shaped around each organization.
          </p>
        </div>
      </section>

      <div className="container py-5">
        <section className="page-intro">
          <h2 className="h3 mb-3 fw-bold text-primary">
            Thoughtful partnerships
          </h2>
          <p className="lead">
            We do not publish client names, logos or testimonials here without
            approval. Contact our team to discuss the experience most relevant
            to your people and business needs.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="h3 mb-4 fw-bold">How we can work together</h2>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div
                className="public-card"
                style={{ transition: "all 0.3s ease" }}
              >
                <div className="card-body">
                  <h5 className="card-title fw-bold">Talent acquisition</h5>
                  <p className="text-muted small">
                    <strong>Recruitment</strong>
                  </p>
                  <p className="card-text">
                    Role profiling, candidate sourcing and screening can be
                    tailored to the hiring requirements you bring to us.
                  </p>
                  <p></p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div
                className="public-card"
                style={{ transition: "all 0.3s ease" }}
              >
                <div className="card-body">
                  <h5 className="card-title fw-bold">
                    Learning and development
                  </h5>
                  <p className="text-muted small">
                    <strong>Training</strong>
                  </p>
                  <p className="card-text">
                    Practical training and coaching can support capability
                    development at individual, team and leadership levels.
                  </p>
                  <p></p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div
                className="public-card"
                style={{ transition: "all 0.3s ease" }}
              >
                <div className="card-body">
                  <h5 className="card-title fw-bold">HR consulting</h5>
                  <p className="text-muted small">
                    <strong>People operations</strong>
                  </p>
                  <p className="card-text">
                    Get support with people practices, policy development and
                    organizational challenges.
                  </p>
                  <p></p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div
                className="public-card"
                style={{ transition: "all 0.3s ease" }}
              >
                <div className="card-body">
                  <h5 className="card-title fw-bold">Leadership development</h5>
                  <p className="text-muted small">
                    <strong>Coaching</strong>
                  </p>
                  <p className="card-text">
                    Coaching and executive education are designed around the
                    organization’s goals and participant needs.
                  </p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="public-card mb-5">
          <div className="card-body d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div>
              <h2 className="h4 fw-bold">Discuss your organization’s needs</h2>
              <p className="mb-0">
                Tell us what you are working toward and we can explore a
                relevant approach.
              </p>
            </div>
            <Link className="btn btn-cta" to="/contact">
              Contact our team
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default OurClient;
