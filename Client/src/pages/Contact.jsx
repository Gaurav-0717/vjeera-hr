import { useState } from "react";
import { apiRequest } from "../api.js";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
    setSubmitted(false);

    try {
      await apiRequest("/api/contacts", {
        method: "POST",
        body: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
        },
      });
      setForm(emptyForm);
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5">
            <p className="text-info fw-bold small mb-2">Get in touch</p>
            <h1 className="display-5 fw-bold mb-3">Contact Us</h1>
            <p className="mb-4">
              Have a question about a course or corporate training? Send us a
              message and our team will get back to you.
            </p>
            <div className="mb-4">
              <h6 className="fw-bold mb-2">Address</h6>
              <p>8 The Green, Ste A, Dover, DE 19901</p>
            </div>
            <div className="mb-4">
              <h6 className="fw-bold mb-2">Phone</h6>
              <p>+345 09-904-4506</p>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="contact-form-card shadow-sm border" style={{ borderRadius: "14px" }}>
              <h2 className="h4 fw-bold text-dark mb-1">Send Us a Message</h2>
              <p className="text-muted small mb-4">
                Fill in the details below and an HR consultant will get in touch with you shortly.
              </p>

              {submitted && (
                <div className="alert alert-success d-flex align-items-center gap-2 mb-4" role="status">
                  <span className="fs-5">✓</span>
                  <div>
                    <strong>Thank you for contacting us!</strong>
                    <div className="small">Your message has been received. Our team will get back to you soon.</div>
                  </div>
                </div>
              )}
              {error && (
                <div
                  className="alert alert-danger d-flex align-items-center gap-2 mb-4"
                  role="alert"
                  aria-live="assertive"
                >
                  <span className="fs-5">⚠️</span>
                  <div>{error}</div>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <label htmlFor="name" className="form-label fw-semibold text-dark small">
                      Your Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="e.g. John Doe"
                      value={form.name}
                      onChange={handleChange}
                      minLength={2}
                      maxLength={100}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <label htmlFor="email" className="form-label fw-semibold text-dark small">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="e.g. john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      maxLength={254}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <label htmlFor="phone" className="form-label fw-semibold text-dark small">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      placeholder="e.g. +91 98765 43210"
                      value={form.phone}
                      onChange={handleChange}
                      maxLength={30}
                      disabled={loading}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <label htmlFor="subject" className="form-label fw-semibold text-dark small">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      placeholder="e.g. Course query or consultation"
                      value={form.subject}
                      onChange={handleChange}
                      maxLength={150}
                      disabled={loading}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="message" className="form-label fw-semibold text-dark small">
                      Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows="4"
                      placeholder="How can we assist you with our HR academy or corporate training programs?"
                      value={form.message}
                      onChange={handleChange}
                      maxLength={2000}
                      required
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
                          Sending Message...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
