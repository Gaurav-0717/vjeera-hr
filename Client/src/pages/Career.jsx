import { useEffect, useState } from "react";
import { apiRequest } from "../api.js";

const emptyApplication = {
  name: "",
  email: "",
  phone: "",
  coverLetter: "",
};

function Career() {
  const [jobs, setJobs] = useState([]);
  const [loadError, setLoadError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [application, setApplication] = useState(emptyApplication);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    let cancelled = false;

    apiRequest("/api/jobs")
      .then((payload) => {
        if (!cancelled) {
          setJobs(payload.data || []);
          setLoadError("");
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setLoadError(err.message);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function openApply(job) {
    setSelectedJob(job);
    setApplication(emptyApplication);
    setFormError("");
    setFormSuccess("");
  }

  function closeApply() {
    if (submitting) return;
    setSelectedJob(null);
  }

  async function handleApply(e) {
    e.preventDefault();
    if (submitting || !selectedJob) return;

    setSubmitting(true);
    setFormError("");
    setFormSuccess("");

    try {
      await apiRequest("/api/applications", {
        method: "POST",
        body: {
          job: selectedJob._id,
          name: application.name,
          email: application.email,
          phone: application.phone,
          coverLetter: application.coverLetter,
        },
      });
      setApplication(emptyApplication);
      setFormSuccess("Application submitted. We will review it shortly.");
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="bg-info text-white py-5 mb-5">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">Career Opportunities</h1>
          <p className="lead">Join Our Innovative HR Team and Make an Impact</p>
        </div>
      </section>

      <div className="container py-5">
        <section className="mb-5">
          <h2 className="h3 mb-3 fw-bold">💼 Join Our Talented Team</h2>
          <p className="lead">
            At Vjeera HR, we believe our success is built on the talent,
            creativity, and dedication of our team members. We're looking for
            passionate professionals who are ready to make a difference.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="h3 mb-4 fw-bold">💼 Current Openings</h2>
          {loadError && (
            <div className="alert alert-danger" role="alert">
              {loadError}
            </div>
          )}

          <div className="row">
            {jobs.map((job) => (
              <div className="col-md-6 mb-4" key={job._id}>
                <div
                  className={`card border-0 shadow-sm h-100 border-top border-5 border-${job.displayColor || "info"}`}
                  style={{ transition: "all 0.3s ease" }}
                >
                  <div className="card-body">
                    <h5
                      className={`card-title text-${job.displayColor || "info"} fw-bold`}
                    >
                      {job.title}
                    </h5>

                    <p className="card-text small">
                      <strong>Experience:</strong> {job.experience}
                    </p>

                    <p className="card-text">{job.description}</p>

                    <p className="text-muted small">
                      <strong>Skills:</strong> {job.skills}
                    </p>

                    <button
                      type="button"
                      className={`btn btn-${job.displayColor || "info"} btn-sm`}
                      onClick={() => openApply(job)}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-5 p-4 bg-light rounded">
          <h2 className="h3 mb-3 fw-bold">🌟 Why Join Us?</h2>

          <ul className="list-group list-group-flush bg-transparent">
            <li className="list-group-item bg-transparent">
              ✓ Competitive salary and performance bonuses
            </li>
            <li className="list-group-item bg-transparent">
              ✓ Comprehensive health and wellness benefits
            </li>
            <li className="list-group-item bg-transparent">
              ✓ Professional development and training opportunities
            </li>
            <li className="list-group-item bg-transparent">
              ✓ Flexible work arrangements and remote options
            </li>
            <li className="list-group-item bg-transparent">
              ✓ Collaborative and inclusive work culture
            </li>
            <li className="list-group-item bg-transparent">
              ✓ Career growth and advancement opportunities
            </li>
          </ul>
        </section>
      </div>

      {selectedJob && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Apply — {selectedJob.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeApply}
                  disabled={submitting}
                ></button>
              </div>
              <form onSubmit={handleApply}>
                <div className="modal-body">
                  {formSuccess && (
                    <div className="alert alert-success">{formSuccess}</div>
                  )}
                  {formError && (
                    <div className="alert alert-danger">{formError}</div>
                  )}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="apply-name">
                      Name
                    </label>
                    <input
                      id="apply-name"
                      className="form-control"
                      value={application.name}
                      onChange={(e) =>
                        setApplication((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      required
                      disabled={submitting}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="apply-email">
                      Email
                    </label>
                    <input
                      id="apply-email"
                      type="email"
                      className="form-control"
                      value={application.email}
                      onChange={(e) =>
                        setApplication((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                      disabled={submitting}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="apply-phone">
                      Phone
                    </label>
                    <input
                      id="apply-phone"
                      type="tel"
                      className="form-control"
                      value={application.phone}
                      onChange={(e) =>
                        setApplication((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      disabled={submitting}
                    />
                  </div>
                  <div className="mb-0">
                    <label className="form-label" htmlFor="apply-cover">
                      Cover letter
                    </label>
                    <textarea
                      id="apply-cover"
                      className="form-control"
                      rows="4"
                      value={application.coverLetter}
                      onChange={(e) =>
                        setApplication((prev) => ({
                          ...prev,
                          coverLetter: e.target.value,
                        }))
                      }
                      disabled={submitting}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={closeApply}
                    disabled={submitting}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-info fw-bold"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit application"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Career;
