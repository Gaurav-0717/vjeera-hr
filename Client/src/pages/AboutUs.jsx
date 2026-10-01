function AboutUs() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-success text-white py-5 mb-5">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">About Vjeera HR</h1>
          <p className="lead">
            Transforming Organizations Through Strategic HR Solutions
          </p>
        </div>
      </section>

      <div className="container py-5">
        <section className="mb-5 p-4 bg-light rounded">
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

        <section className="mb-5 p-4 bg-info bg-opacity-10 rounded">
          <h2 className="h3 mb-3 text-success fw-bold">👁️ Our Vision</h2>
          <p className="lead">
            To be a trusted and innovative HR partner that empowers
            organizations and individuals to achieve their full potential. We
            envision creating a future where the right talent, opportunities,
            and organizational strategies come together to build productive,
            inclusive, and successful workplaces.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="h3 mb-3">Our Story</h2>
          <p>
            Founded in 2015, Vjeera HR has been a catalyst for organizational
            transformation. With over 8 years of industry expertise, we've
            partnered with 500+ organizations across various sectors to build
            high-performing teams and create thriving workplaces.
          </p>
          <p>
            Our journey began with a simple vision: to revolutionize HR
            practices and help businesses unlock their full potential through
            strategic human resource management.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="h3 mb-3 fw-bold">💎 Our Core Values</h2>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card border-0 shadow-sm h-100 border-start border-5 border-info">
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
              <div className="card border-0 shadow-sm h-100 border-start border-5 border-success">
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
              <div className="card border-0 shadow-sm h-100 border-start border-5 border-warning">
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
              <div className="card border-0 shadow-sm h-100 border-start border-5 border-danger">
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
