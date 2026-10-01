function OurClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5 mb-5">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">Our Valued Clients</h1>
          <p className="lead">Trusted by Leading Organizations Worldwide</p>
        </div>
      </section>

      <div className="container py-5">
        <section className="mb-5 p-4 bg-light rounded">
          <h2 className="h3 mb-3 fw-bold text-primary">
            🌍 Trusted by Leading Organizations
          </h2>
          <p className="lead">
            We're proud to have partnered with 500+ organizations across diverse
            industries, helping them build stronger teams and achieve their
            business objectives.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="h3 mb-4 fw-bold">⭐ Success Stories</h2>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div
                className="card border-0 shadow-sm h-100 border-start border-5 border-info hover-shadow"
                style={{ transition: "all 0.3s ease" }}
              >
                <div className="card-body">
                  <h5 className="card-title text-info fw-bold">
                    TechVision Solutions
                  </h5>
                  <p className="text-muted small">
                    <strong>IT & Software Services</strong>
                  </p>
                  <p className="card-text">
                    "Vjeera HR transformed our talent acquisition process,
                    reducing time-to-hire by 40% and significantly improving our
                    hiring quality. Highly recommended!"
                  </p>
                  <p>
                    <strong>- HR Director, TechVision Solutions</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div
                className="card border-0 shadow-sm h-100 border-start border-5 border-success hover-shadow"
                style={{ transition: "all 0.3s ease" }}
              >
                <div className="card-body">
                  <h5 className="card-title text-success fw-bold">
                    GlobalTrade Inc.
                  </h5>
                  <p className="text-muted small">
                    <strong>Import-Export Business</strong>
                  </p>
                  <p className="card-text">
                    "Their executive coaching program elevated our leadership
                    team's effectiveness. We've seen a 35% improvement in team
                    engagement scores."
                  </p>
                  <p>
                    <strong>- CEO, GlobalTrade Inc.</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div
                className="card border-0 shadow-sm h-100 border-start border-5 border-warning hover-shadow"
                style={{ transition: "all 0.3s ease" }}
              >
                <div className="card-body">
                  <h5 className="card-title text-warning fw-bold">
                    HealthCare Plus
                  </h5>
                  <p className="text-muted small">
                    <strong>Healthcare Industry</strong>
                  </p>
                  <p className="card-text">
                    "The organizational restructuring guided by Vjeera HR went
                    smoothly. Our employee retention improved by 28%
                    post-restructuring."
                  </p>
                  <p>
                    <strong>- Head of HR, HealthCare Plus</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div
                className="card border-0 shadow-sm h-100 border-start border-5 border-danger hover-shadow"
                style={{ transition: "all 0.3s ease" }}
              >
                <div className="card-body">
                  <h5 className="card-title text-danger fw-bold">
                    Retail Solutions Ltd.
                  </h5>
                  <p className="text-muted small">
                    <strong>Retail & E-commerce</strong>
                  </p>
                  <p className="card-text">
                    "Their training and development programs boosted employee
                    skills and productivity. We've achieved a 42% increase in
                    operational efficiency."
                  </p>
                  <p>
                    <strong>- Operations Manager, Retail Solutions Ltd.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5 p-4 bg-light rounded">
          <h2 className="h3 mb-3 fw-bold">🎯 Industries We Serve</h2>
          <div className="row g-2">
            <div className="col-md-4 mb-2">
              <span
                className="badge bg-primary p-2"
                style={{ fontSize: "0.9rem" }}
              >
                Technology & IT
              </span>
            </div>
            <div className="col-md-4 mb-2">
              <span
                className="badge bg-info p-2"
                style={{ fontSize: "0.9rem" }}
              >
                Finance & Banking
              </span>
            </div>
            <div className="col-md-4 mb-2">
              <span
                className="badge bg-success p-2"
                style={{ fontSize: "0.9rem" }}
              >
                Healthcare
              </span>
            </div>
            <div className="col-md-4 mb-2">
              <span
                className="badge bg-warning p-2"
                style={{ fontSize: "0.9rem" }}
              >
                Retail & E-commerce
              </span>
            </div>
            <div className="col-md-4 mb-2">
              <span
                className="badge bg-danger p-2"
                style={{ fontSize: "0.9rem" }}
              >
                Manufacturing
              </span>
            </div>
            <div className="col-md-4 mb-2">
              <span
                className="badge bg-secondary p-2"
                style={{ fontSize: "0.9rem" }}
              >
                Consulting Services
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default OurClient;
