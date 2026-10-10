import { useState } from "react";
import { apiRequest } from "../api.js";

const emptyEnquiry = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  service: "",
  employeeCount: "",
  message: "",
};

const serviceOptions = [
  "HR Strategy & Planning",
  "Organizational Restructuring",
  "Executive Coaching",
  "Compliance & Governance",
  "Organizational Culture",
  "Change Management",
];

function Corporate() {
  const [form, setForm] = useState(emptyEnquiry);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await apiRequest("/api/corporate-enquiries", {
        method: "POST",
        body: form,
      });
      setForm(emptyEnquiry);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="public-page-hero">
        <div className="container">
          <p className="eyebrow">For organizations</p>
          <h1 className="fw-bold mb-3">Corporate Solutions</h1>
          <p className="lead">
            Transform Your Organization with Strategic HR Solutions
          </p>
        </div>
      </section>

      <div className="container page-content">
        <section className="page-intro">
          <h2 className="h3 mb-3 fw-bold text-success">
            🏢 Enterprise HR Solutions
          </h2>
          <p className="lead">
            Vjeera HR delivers comprehensive corporate solutions designed to
            transform your organization's human resources function and drive
            business success.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="h3 mb-4 fw-bold">📋 Our Corporate Offerings</h2>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div
                className="card border-0 shadow-sm h-100 border-start border-5 border-info hover-shadow"
                style={{ transition: "all 0.3s ease" }}
              >
                <div className="card-body">
                  <h5 className="card-title text-info fw-bold">
                    📊 HR Strategy & Planning
                  </h5>
                  <p className="card-text">
                    Develop comprehensive HR strategies aligned with your
                    business objectives. We help organizations create roadmaps
                    for sustainable growth and talent optimization.
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
                    👥 Organizational Restructuring
                  </h5>
                  <p className="card-text">
                    Navigate organizational changes with expert guidance. We
                    facilitate smooth transitions and ensure minimal disruption
                    while maximizing efficiency.
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
                    🎓 Executive Coaching
                  </h5>
                  <p className="card-text">
                    Develop leadership capabilities through personalized
                    coaching programs. Enhance executive effectiveness and build
                    high-performing leadership teams.
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
                    📋 Compliance & Governance
                  </h5>
                  <p className="card-text">
                    Stay compliant with latest regulations and best practices.
                    We provide guidance on employment laws, policies, and
                    governance frameworks.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div
                className="card border-0 shadow-sm h-100 border-start border-5 border-primary hover-shadow"
                style={{ transition: "all 0.3s ease" }}
              >
                <div className="card-body">
                  <h5 className="card-title text-primary fw-bold">
                    💡 Organizational Culture
                  </h5>
                  <p className="card-text">
                    Build a strong, positive organizational culture that
                    attracts and retains top talent. We design and implement
                    cultural transformation initiatives.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div
                className="card border-0 shadow-sm h-100 border-start border-5 border-info hover-shadow"
                style={{ transition: "all 0.3s ease" }}
              >
                <div className="card-body">
                  <h5 className="card-title text-info fw-bold">
                    🔄 Change Management
                  </h5>
                  <p className="card-text">
                    Successfully manage organizational transitions. We provide
                    comprehensive change management support to ensure successful
                    implementation of new initiatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5 p-4 bg-info bg-opacity-10 rounded">
          <h2 className="h3 mb-3 fw-bold text-info">🎯 Our Approach</h2>
          <p>
            We take a strategic, collaborative approach to corporate solutions.
            Our team works closely with your leadership to understand your
            unique challenges and design customized solutions that deliver
            measurable results. We combine industry best practices with deep
            organizational expertise to drive meaningful change.
          </p>
        </section>

        <section className="contact-form-card shadow-sm border" style={{ borderRadius: "14px" }}>
          <h2 className="h4 fw-bold text-dark mb-1">
            Request a Corporate Consultation
          </h2>
          <p className="text-muted small mb-4">
            Tell us about your organisation, training goals, or consulting requirements. Our enterprise team will prepare a tailored proposal.
          </p>

          {success && (
            <div className="alert alert-success d-flex align-items-center gap-2 mb-4" role="status">
              <span className="fs-5">✓</span>
              <div>
                <strong>Enquiry submitted successfully!</strong>
                <div className="small">Thank you. An enterprise HR consultant will review your enquiry and contact you soon.</div>
              </div>
            </div>
          )}
          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2 mb-4" role="alert">
              <span className="fs-5">⚠️</span>
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold text-dark small" htmlFor="companyName">
                  Company Name <span className="text-danger">*</span>
                </label>
                <input
                  id="companyName"
                  className="form-control"
                  placeholder="e.g. Acme Technologies Pvt Ltd"
                  value={form.companyName}
                  onChange={handleChange}
                  maxLength={150}
                  required
                  disabled={loading}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold text-dark small" htmlFor="contactName">
                  Contact Person Name <span className="text-danger">*</span>
                </label>
                <input
                  id="contactName"
                  className="form-control"
                  placeholder="e.g. Ananya Roy (HR Director)"
                  value={form.contactName}
                  onChange={handleChange}
                  maxLength={100}
                  required
                  disabled={loading}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold text-dark small" htmlFor="email">
                  Official Email Address <span className="text-danger">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="e.g. ananya.roy@acme.com"
                  value={form.email}
                  onChange={handleChange}
                  maxLength={254}
                  required
                  disabled={loading}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold text-dark small" htmlFor="phone">
                  Phone / Mobile Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="form-control"
                  placeholder="e.g. +91 98765 43210"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={30}
                  disabled={loading}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold text-dark small" htmlFor="service">
                  Solution / Service Interest
                </label>
                <select
                  id="service"
                  className="form-select"
                  value={form.service}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Select an enterprise service</option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold text-dark small" htmlFor="employeeCount">
                  Estimated Employee Count
                </label>
                <input
                  id="employeeCount"
                  className="form-control"
                  placeholder="e.g. 50 - 200 Employees"
                  value={form.employeeCount}
                  onChange={handleChange}
                  maxLength={50}
                  disabled={loading}
                />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold text-dark small" htmlFor="message">
                  Consultation Requirements & Goals
                </label>
                <textarea
                  id="message"
                  className="form-control"
                  rows="4"
                  placeholder="Tell us about your organization's challenges, specific training tracks needed, or restructuring objectives..."
                  value={form.message}
                  onChange={handleChange}
                  maxLength={2000}
                  disabled={loading}
                ></textarea>
              </div>
              <div className="col-12 mt-4">
                <button
                  type="submit"
                  className="btn btn-cta px-4 py-2 fw-bold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                      Submitting Enquiry...
                    </>
                  ) : (
                    "Submit Corporate Enquiry"
                  )}
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default Corporate;
