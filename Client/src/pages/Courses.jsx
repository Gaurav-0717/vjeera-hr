import { useEffect, useState } from "react";
import { apiRequest } from "../api.js";

const objectives = [
  "ISO 9001:2015 Certification",
  "Experienced Faculty",
  "Study Material",
  "Workshops / Webinars — Resume Writing, LinkedIn Mastering & Email Etiquette",
  "Career preparation",
  "Job Readiness",
];

const generalistTracks = [
  {
    title: "Talent Acquisition",
    items: [
      "Recruitment & Selection",
      "Portal Training",
      "Personality & Psychometric Test",
      "Effective Onboarding",
      "Competency Based Interviews",
    ],
  },
  {
    title: "Payroll & Statutory Compliance",
    items: [
      "Statutory Compliance",
      "Practical Advanced Excel",
      "System Training",
      "Labour Law",
      "Payroll Input",
      "ECR Challan Training",
    ],
  },
  {
    title: "Strategic HRM",
    items: [
      "Performance Management System",
      "Training & Development",
      "HR Policies",
      "HR Business Partner",
      "Basics of HR Analytics",
      "SAP HCM Overview",
    ],
  },
];

const analyticsTracks = [
  {
    title: "HR Analytics — Practitioner",
    tools: "Tool used: Excel",
    items: [
      "Introduction to Analytics",
      "Key HR Matrices",
      "Statistical Modelling",
      "Understanding the Business Problem",
      "Data Discovery and Collection",
      "Data Preparation",
      "Hypothesis testing",
      "Correlation & linear regression",
    ],
    footer: "15 Statistical Tools · 25 Case Studies · 2 Projects",
  },
  {
    title: "HR Analytics — Advanced",
    tools: "Tools used: Excel, Python and Tableau",
    items: [
      "Introduction to Python and Tableau",
      "Types & Directory of Data, Data Validation",
      "Statistics — Univariate",
      "Data Cleaning",
      "Statistics — Bi-variate",
      "Hypothesis Testing",
      "Feature Engineering",
    ],
    footer: "5 Statistical Tools · 10 Case Studies · 2 Projects",
  },
];

const emptyEnrollment = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [reloadCourses, setReloadCourses] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(emptyEnrollment);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoadingCourses(true);

    apiRequest("/api/courses")
      .then((payload) => {
        if (!cancelled) {
          setCourses(payload.data || []);
          setLoadError("");
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setLoadError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingCourses(false);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadCourses]);

  function openEnroll(course) {
    setSelectedCourse(course);
    setEnrollment(emptyEnrollment);
    setFormError("");
    setFormSuccess("");
  }

  function closeEnroll() {
    if (submitting) return;
    setSelectedCourse(null);
  }

  async function handleEnroll(e) {
    e.preventDefault();
    if (submitting || !selectedCourse) return;

    setSubmitting(true);
    setFormError("");
    setFormSuccess("");

    try {
      await apiRequest("/api/enrollments", {
        method: "POST",
        body: {
          course: selectedCourse._id,
          name: enrollment.name,
          email: enrollment.email,
          phone: enrollment.phone,
          message: enrollment.message,
        },
      });
      setEnrollment(emptyEnrollment);
      setFormSuccess("Enrollment request submitted. We will contact you soon.");
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <>
      {/* Hero Section */}
      <section className="public-page-hero">
        <div className="container">
          <p className="eyebrow">Professional development</p>
          <h1 className="fw-bold mb-3">HR Training Programs</h1>
          <p className="lead">
            Comprehensive HR Courses from Entry-Level to Advanced Analytics
          </p>
        </div>
      </section>

      <div className="container page-content">
        {/* Intro */}
        <section className="page-intro">
          <p className="text-info fw-bold small mb-2">
            📚 Professional Development
          </p>
          <h2 className="h2 fw-bold mb-3" style={{ color: "#0056b3" }}>
            Practical, Job-Focused HR Training
          </h2>
          <p className="lead">
            Built to enable HR practical training and job readiness from your
            very first day.
          </p>
        </section>

        {/* Programme objectives */}
        <section className="mb-5">
          <h2 className="h2 fw-bold mb-4 text-info">🎯 Programme Objectives</h2>
          <p className="mb-4 lead">
            To enable HR practical training and job-focused knowledge in the HR
            domain.
          </p>
          <div className="row g-3">
            {objectives.map((obj) => (
              <div className="col-md-6 col-lg-4" key={obj}>
                <div
                  className="card border-0 h-100 shadow-sm border-start border-5 border-success hover-shadow"
                  style={{ transition: "all 0.3s ease" }}
                >
                  <div className="card-body">
                    <p className="card-text">
                      <strong>✓</strong> {obj}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Career path — signature element: real sequence of programmes */}
        <section className="py-5 bg-light rounded mt-5">
          <h2 className="h2 fw-bold mb-4 text-center text-info">
            📈 Your Learning Path
          </h2>
          <p className="mb-4 text-center lead">
            Move from foundational HR skills through generalist practice into
            data-driven HR analytics.
          </p>
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <div className="text-center flex-grow-1 mb-3">
              <div
                className="badge bg-success p-3 rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: "50px", height: "50px" }}
              >
                1
              </div>
              <p className="mt-2 small fw-bold">HR Fresher Course</p>
            </div>
            <div className="flex-grow-1 border-bottom mx-2 d-none d-md-block"></div>
            <div className="text-center flex-grow-1 mb-3">
              <div
                className="badge bg-info p-3 rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: "50px", height: "50px" }}
              >
                2
              </div>
              <p className="mt-2 small fw-bold">HR Generalist Programme</p>
            </div>
            <div className="flex-grow-1 border-bottom mx-2 d-none d-md-block"></div>
            <div className="text-center flex-grow-1 mb-3">
              <div
                className="badge bg-warning p-3 rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: "50px", height: "50px" }}
              >
                3
              </div>
              <p className="mt-2 small fw-bold">HR Analytics Programme</p>
            </div>
          </div>
        </section>

        {/* HR Generalist Programme */}
        <section className="py-5 bg-light rounded mt-5">
          <h2 className="h2 fw-bold mb-4 text-info">
            💼 HR Generalist Programme
          </h2>
          <div className="row g-4 mt-1">
            {generalistTracks.map((track) => (
              <div className="col-md-4" key={track.title}>
                <div
                  className="card h-100 border-0 shadow-sm border-top border-5 border-success hover-shadow"
                  style={{ transition: "all 0.3s ease" }}
                >
                  <div className="card-body">
                    <h3 className="card-title fw-bold mb-3 text-success">
                      {track.title}
                    </h3>
                    <ul className="list-unstyled">
                      {track.items.map((i) => (
                        <li key={i} className="mb-2 small">
                          <span
                            className="text-success fw-bold me-2"
                            aria-hidden="true"
                          >
                            ✓
                          </span>
                          <span>{i}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HR Analytics Programme */}
        <section className="py-5 mt-5">
          <h2 className="h2 fw-bold mb-4 text-primary">
            📊 HR Analytics Programme
          </h2>
          <div className="row g-4 mt-1">
            {analyticsTracks.map((track) => (
              <div className="col-md-6" key={track.title}>
                <div
                  className="card h-100 border-0 shadow-sm bg-primary text-white border-top border-5 border-warning hover-shadow"
                  style={{ transition: "all 0.3s ease" }}
                >
                  <div className="card-body">
                    <h3 className="card-title fw-bold mb-2">{track.title}</h3>
                    <p className="small mb-3">
                      <strong>🛠️ {track.tools}</strong>
                    </p>
                    <ul className="list-unstyled mb-3">
                      {track.items.map((i) => (
                        <li key={i} className="mb-2 small">
                          ✓ {i}
                        </li>
                      ))}
                    </ul>
                    <p className="small fw-bold border-top pt-2 mt-2">
                      {track.footer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Admissions */}
        <section
          id="admissions"
          className="py-5 bg-info bg-opacity-10 rounded mt-5"
        >
          <h2 className="h2 fw-bold mb-4 text-info">🎓 Admissions Open</h2>
          {loadError && (
            <div
              className="alert alert-danger d-flex flex-wrap align-items-center justify-content-between gap-3"
              role="alert"
            >
              <span>{loadError}</span>
              <button
                className="btn btn-sm btn-outline-danger"
                type="button"
                onClick={() => setReloadCourses((count) => count + 1)}
              >
                Try again
              </button>
            </div>
          )}
          {loadingCourses ? (
            <div className="py-4 text-center" role="status">
              <span
                className="spinner-border spinner-border-sm text-primary me-2"
                aria-hidden="true"
              ></span>
              Loading available courses...
            </div>
          ) : courses.length === 0 && !loadError ? (
            <p className="empty-state mb-0">
              There are no courses available right now. Please check back soon.
            </p>
          ) : (
            <div className="row g-4 mt-1">
              {courses.map((course) => (
                <div className="col-md-6" key={course._id}>
                  <div
                    className="card border-0 h-100 shadow-sm border-start border-5 border-primary hover-shadow"
                    style={{ transition: "all 0.3s ease" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title fw-bold mb-3 text-primary">
                        {course.title}
                      </h5>
                      {course.description && (
                        <p className="text-muted">{course.description}</p>
                      )}
                      {course.objectives?.length > 0 && (
                        <ul className="course-objectives">
                          {course.objectives.map((objective) => (
                            <li key={objective}>{objective}</li>
                          ))}
                        </ul>
                      )}
                      {course.batchStart && (
                        <p className="card-text mb-2">
                          <strong>📅 {course.batchStart}</strong>
                        </p>
                      )}
                      {course.batchTime && (
                        <p className="card-text small mb-4">
                          <strong>⏰ {course.batchTime}</strong>
                        </p>
                      )}
                      <button
                        type="button"
                        className="btn btn-primary fw-bold"
                        onClick={() => openEnroll(course)}
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="py-5 mt-5">
          <div
            className="alert alert-primary border-start border-5 border-primary"
            role="alert"
          >
            <h4 className="alert-heading fw-bold">
              Ready to Transform Your HR Career?
            </h4>
            <p>
              Join our industry-leading HR training programs and gain practical
              skills that employers demand. Limited seats available for each
              batch. Don't miss out!
            </p>
            <hr />
            <a href="#admissions" className="btn btn-primary btn-lg fw-bold">
              Start Your Learning Journey Today →
            </a>
          </div>
        </section>
      </div>

      {selectedCourse && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby="enroll-modal-title"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="enroll-modal-title">
                  Enroll — {selectedCourse.title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeEnroll}
                  disabled={submitting}
                ></button>
              </div>
              <form onSubmit={handleEnroll}>
                <div className="modal-body">
                  {formSuccess && (
                    <div className="alert alert-success" role="status">
                      {formSuccess}
                    </div>
                  )}
                  {formError && (
                    <div className="alert alert-danger">{formError}</div>
                  )}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="enroll-name">
                      Name
                    </label>
                    <input
                      id="enroll-name"
                      className="form-control"
                      value={enrollment.name}
                      minLength={2}
                      maxLength={100}
                      autoFocus
                      onChange={(e) =>
                        setEnrollment((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      required
                      disabled={submitting}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="enroll-email">
                      Email
                    </label>
                    <input
                      id="enroll-email"
                      type="email"
                      className="form-control"
                      value={enrollment.email}
                      maxLength={254}
                      onChange={(e) =>
                        setEnrollment((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                      disabled={submitting}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="enroll-phone">
                      Phone
                    </label>
                    <input
                      id="enroll-phone"
                      type="tel"
                      className="form-control"
                      value={enrollment.phone}
                      maxLength={30}
                      onChange={(e) =>
                        setEnrollment((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      disabled={submitting}
                    />
                  </div>
                  <div className="mb-0">
                    <label className="form-label" htmlFor="enroll-message">
                      Message
                    </label>
                    <textarea
                      id="enroll-message"
                      className="form-control"
                      rows="3"
                      value={enrollment.message}
                      maxLength={2000}
                      onChange={(e) =>
                        setEnrollment((prev) => ({
                          ...prev,
                          message: e.target.value,
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
                    onClick={closeEnroll}
                    disabled={submitting}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary fw-bold"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit enrollment"}
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

export default Courses;
