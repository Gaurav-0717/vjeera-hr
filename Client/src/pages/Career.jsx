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
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [reloadJobs, setReloadJobs] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);
  const [application, setApplication] = useState(emptyApplication);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoadingJobs(true);

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
      })
      .finally(() => {
        if (!cancelled) setLoadingJobs(false);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadJobs]);

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
      <section className="public-page-hero">
        <div className="container">
          <p className="eyebrow">Careers</p>
          <h1 className="fw-bold mb-3">Career Opportunities</h1>
          <p className="lead">Join Our Innovative HR Team and Make an Impact</p>
        </div>
      </section>

      <div className="container page-content">
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
            <div
              className="alert alert-danger d-flex flex-wrap align-items-center justify-content-between gap-3"
              role="alert"
            >
              <span>{loadError}</span>
              <button
                className="btn btn-sm btn-outline-danger"
                type="button"
                onClick={() => setReloadJobs((count) => count + 1)}
              >
                Try again
              </button>
            </div>
          )}

          {loadingJobs ? (
            <div className="py-4 text-center" role="status">
              <span
                className="spinner-border spinner-border-sm text-primary me-2"
                aria-hidden="true"
              ></span>
              Loading current openings...
            </div>
          ) : jobs.length === 0 && !loadError ? (
            <p className="empty-state">
              There are no open positions right now. Please check back later.
            </p>
          ) : (
            <div className="row g-4">
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

                      {job.location && (
                        <p className="job-meta">{job.location}</p>
                      )}
                      {job.employmentType && (
                        <p className="job-meta">{job.employmentType}</p>
                      )}
                      {job.experience && (
                        <p className="card-text small">
                          <strong>Experience:</strong> {job.experience}
                        </p>
                      )}

                      <p className="card-text">{job.description}</p>

                      {job.skills && (
                        <p className="text-muted small">
                          <strong>Skills:</strong> {job.skills}
                        </p>
                      )}

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
          )}
        </section>
      </div>

      {selectedJob && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-modal-title"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(4px)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: "14px", overflow: "hidden" }}>
              <div className="modal-header bg-light px-4 py-3 border-bottom">
                <div>
                  <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold px-2 py-1 mb-1" style={{ fontSize: "0.72rem" }}>
                    Job Application
                  </span>
                  <h5 className="modal-title fw-bold text-dark mb-0" id="apply-modal-title">
                    Apply for {selectedJob.title}
                  </h5>
                  {(selectedJob.location || selectedJob.employmentType) && (
                    <div className="text-muted small mt-1">
                      {selectedJob.location && <span className="me-2">📍 {selectedJob.location}</span>}
                      {selectedJob.employmentType && <span>💼 {selectedJob.employmentType}</span>}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeApply}
                  disabled={submitting}
                ></button>
              </div>

              <form onSubmit={handleApply}>
                <div className="modal-body p-4">
                  {formSuccess && (
                    <div className="alert alert-success d-flex align-items-center gap-2 mb-4" role="status">
                      <span className="fs-5">✓</span>
                      <div>
                        <strong>Application submitted successfully!</strong>
                        <div className="small">{formSuccess}</div>
                      </div>
                    </div>
                  )}
                  {formError && (
                    <div className="alert alert-danger d-flex align-items-center gap-2 mb-4" role="alert">
                      <span className="fs-5">⚠️</span>
                      <div>{formError}</div>
                    </div>
                  )}

                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold text-dark small" htmlFor="apply-name">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        id="apply-name"
                        className="form-control"
                        placeholder="e.g. Rahul Sharma"
                        value={application.name}
                        minLength={2}
                        maxLength={100}
                        autoFocus
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

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold text-dark small" htmlFor="apply-email">
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <input
                        id="apply-email"
                        type="email"
                        className="form-control"
                        placeholder="e.g. rahul.sharma@example.com"
                        value={application.email}
                        maxLength={254}
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

                    <div className="col-12">
                      <label className="form-label fw-semibold text-dark small" htmlFor="apply-phone">
                        Phone Number
                      </label>
                      <input
                        id="apply-phone"
                        type="tel"
                        className="form-control"
                        placeholder="e.g. +91 98765 43210"
                        value={application.phone}
                        maxLength={30}
                        onChange={(e) =>
                          setApplication((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        disabled={submitting}
                      />
                      <div className="form-text text-muted" style={{ fontSize: "0.78rem" }}>
                        We'll only call regarding your application status.
                      </div>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold text-dark small" htmlFor="apply-cover">
                        Cover Letter / Professional Summary
                      </label>
                      <textarea
                        id="apply-cover"
                        className="form-control"
                        rows="4"
                        placeholder="Briefly highlight your relevant experience, key skills, and why you're interested in joining Vjeera HR..."
                        value={application.coverLetter}
                        maxLength={4000}
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
                </div>

                <div className="modal-footer bg-light px-4 py-3 border-top d-flex justify-content-between align-items-center">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-3"
                    onClick={closeApply}
                    disabled={submitting}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary fw-bold px-4"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                        Submitting Application...
                      </>
                    ) : (
                      "Submit Application"
                    )}
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
