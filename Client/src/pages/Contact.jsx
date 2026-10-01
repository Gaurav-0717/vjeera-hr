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
            <div className="contact-form-card">
              {submitted && (
                <div className="alert alert-success" role="status">
                  Thanks — your message has been received. We'll be in touch
                  soon.
                </div>
              )}
              {error && (
                <div
                  className="alert alert-danger"
                  role="alert"
                  aria-live="assertive"
                >
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Name"
                    value={form.name}
                    onChange={handleChange}
                    minLength={2}
                    maxLength={100}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter Email"
                    value={form.email}
                    onChange={handleChange}
                    maxLength={254}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="Enter Number"
                    value={form.phone}
                    onChange={handleChange}
                    maxLength={30}
                    disabled={loading}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={handleChange}
                    maxLength={150}
                    disabled={loading}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="5"
                    placeholder="Your message"
                    value={form.message}
                    onChange={handleChange}
                    maxLength={2000}
                    disabled={loading}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-cta"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
