function AboutUs() {
  return (
    <>
      {/* Hero Section */}
      <section className="public-page-hero">
        <div className="container">
          <p className="eyebrow">Who we are</p>
          <h1 className="fw-bold mb-3">About Vjeera HR</h1>
          <p className="lead">
            Transforming Organizations Through Strategic HR Solutions
          </p>
        </div>
      </section>

      <div className="container page-content">
        <section className="page-intro">
          <h2 className="h3 mb-3 text-info fw-bold">🎯 Our Mission</h2>
          <p className="lead">
            Our mission is to empower organizations and individuals through
            innovative and effective HR solutions. We are committed to
            connecting the right talent with the right opportunities,
            strengthening workplace relationships, and helping businesses build
            skilled, motivated, and high-performing teams for sustainable growth
            and success.
          </p>
        </section>

        <section className="public-card mb-5">
          <div className="card-body">
            <h2 className="h3 mb-3 text-success fw-bold">👁️ Our Vision</h2>
            <p className="lead">
              To be a trusted and innovative HR partner that empowers
              organizations and individuals to achieve their full potential. We
              envision creating a future where the right talent, opportunities,
              and organizational strategies come together to build productive,
              inclusive, and successful workplaces.
            </p>
          </div>
        </section>

        <section className="mb-5">
          <h2 className="h3 mb-3">Our Story</h2>
          <p>
            Vjeera brings together practical HR learning, leadership development
            and people-focused services. Our work is guided by a commitment to
            useful skills, thoughtful partnerships and lasting professional
            growth.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="h3 mb-3 fw-bold">💎 Our Core Values</h2>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="public-card">
                <div className="card-body">
                  <h5 className="card-title text-info fw-bold">Integrity</h5>
                  <p className="card-text">
                    We operate with complete transparency and honesty in all our
                    dealings.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="public-card">
                <div className="card-body">
                  <h5 className="card-title text-success fw-bold">
                    Innovation
                  </h5>
                  <p className="card-text">
                    We constantly innovate to deliver cutting-edge HR solutions.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="public-card">
                <div className="card-body">
                  <h5 className="card-title text-warning fw-bold">
                    Excellence
                  </h5>
                  <p className="card-text">
                    We pursue excellence in every aspect of our service
                    delivery.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="public-card">
                <div className="card-body">
                  <h5 className="card-title text-danger fw-bold">
                    Partnership
                  </h5>
                  <p className="card-text">
                    We believe in building long-term partnerships based on
                    mutual success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default AboutUs;
