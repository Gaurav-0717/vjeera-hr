import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminRequest } from "../../api.js";
import {
  IconContacts,
  IconEnrollments,
  IconApplications,
  IconCorporate,
  IconJobs,
  IconCourses,
  IconCalendar,
  IconRefresh,
  IconExternalLink,
  IconPlus,
} from "../../components/admin/AdminIcons.jsx";

const statusMeta = {
  pending: { label: "Pending", color: "adm-badge-pending", dotColor: "#d97706" },
  reviewing: { label: "Reviewing", color: "adm-badge-reviewing", dotColor: "#0284c7" },
  shortlisted: { label: "Shortlisted", color: "adm-badge-shortlisted", dotColor: "#2563eb" },
  rejected: { label: "Rejected", color: "adm-badge-rejected", dotColor: "#dc2626" },
  hired: { label: "Hired", color: "adm-badge-hired", dotColor: "#16a34a" },
};

function StatCard({ label, value, icon: IconComponent, iconClass, linkTo, subtext }) {
  const content = (
    <div className="adm-stat-card">
      <div className={`adm-stat-icon-wrap ${iconClass}`}>
        <IconComponent size={20} />
      </div>
      <div className="adm-stat-content">
        <div className="adm-stat-label">{label}</div>
        <div className="adm-stat-value">{value}</div>
        {subtext && <div className="adm-stat-subtext">{subtext}</div>}
      </div>
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="text-decoration-none col-sm-6 col-xl-3">
        {content}
      </Link>
    );
  }

  return <div className="col-sm-6 col-xl-3">{content}</div>;
}

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    adminRequest("/api/admin/dashboard")
      .then((payload) => {
        if (!cancelled) {
          setStats(payload.data);
          setError("");
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [reload]);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  if (error) {
    return (
      <div className="adm-card border-danger">
        <div className="adm-card-body d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
          <div>
            <h2 className="h6 text-danger fw-bold mb-1">Failed to load dashboard metrics</h2>
            <p className="text-muted small mb-0">{error}</p>
          </div>
          <button
            className="adm-btn adm-btn-primary adm-btn-sm"
            type="button"
            onClick={() => setReload((count) => count + 1)}
          >
            <IconRefresh size={14} />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  if (loading || !stats) {
    return (
      <div>
        <div className="adm-page-header">
          <div>
            <h1 className="adm-page-title">Overview</h1>
            <p className="adm-page-subtitle">Quick summary of your platform activity</p>
          </div>
        </div>
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading platform statistics...</p>
        </div>
      </div>
    );
  }

  const statusEntries = Object.entries(stats.applicationsByStatus || {});
  const totalAppsCount = stats.totalApplications ?? 0;

  return (
    <div>
      {/* Header */}
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Overview</h1>
          <p className="adm-page-subtitle">Quick summary of your platform activity</p>
        </div>
        <div className="adm-header-actions">
          <div className="d-flex align-items-center gap-2 text-muted small bg-white px-3 py-2 rounded-2 border">
            <IconCalendar size={15} />
            <span className="fw-medium">{formattedDate}</span>
          </div>
          <button
            type="button"
            className="adm-btn adm-btn-outline adm-btn-sm"
            onClick={() => setReload((count) => count + 1)}
            title="Refresh statistics"
          >
            <IconRefresh size={14} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <StatCard
          label="Total Contacts"
          value={stats.totalContacts ?? 0}
          icon={IconContacts}
          iconClass="adm-stat-icon-sky"
          linkTo="/admin/contacts"
          subtext={`${stats.newContacts ?? 0} new enquiries`}
        />
        <StatCard
          label="New Contacts"
          value={stats.newContacts ?? 0}
          icon={IconContacts}
          iconClass="adm-stat-icon-amber"
          linkTo="/admin/contacts"
          subtext="Awaiting review"
        />
        <StatCard
          label="Enrollments"
          value={stats.totalEnrollments ?? 0}
          icon={IconEnrollments}
          iconClass="adm-stat-icon-emerald"
          linkTo="/admin/enrollments"
          subtext={`${stats.pendingEnrollments ?? 0} pending`}
        />
        <StatCard
          label="Applications"
          value={stats.totalApplications ?? 0}
          icon={IconApplications}
          iconClass="adm-stat-icon-blue"
          linkTo="/admin/applications"
          subtext={`${stats.pendingApplications ?? 0} pending`}
        />
        <StatCard
          label="Corporate Enquiries"
          value={stats.corporateEnquiries ?? 0}
          icon={IconCorporate}
          iconClass="adm-stat-icon-purple"
          linkTo="/admin/corporate-enquiries"
          subtext={`${stats.newCorporateEnquiries ?? 0} new`}
        />
        <StatCard
          label="Jobs"
          value={stats.jobs ?? 0}
          icon={IconJobs}
          iconClass="adm-stat-icon-slate"
          linkTo="/admin/jobs"
          subtext={`${stats.activeJobs ?? stats.jobs ?? 0} active openings`}
        />
        <StatCard
          label="Courses"
          value={stats.courses ?? 0}
          icon={IconCourses}
          iconClass="adm-stat-icon-rose"
          linkTo="/admin/courses"
          subtext={`${stats.activeCourses ?? stats.courses ?? 0} published`}
        />
      </div>

      {/* Grid: Applications by status & Quick Actions */}
      <div className="row g-4">
        {/* Applications by Status */}
        <div className="col-12 col-lg-7">
          <div className="adm-card h-100 mb-0">
            <div className="adm-card-header">
              <div>
                <h2 className="adm-card-title">Applications by Status</h2>
                <p className="adm-card-subtitle">
                  Breakdown across the candidate hiring pipeline
                </p>
              </div>
              <Link
                to="/admin/applications"
                className="adm-btn adm-btn-outline adm-btn-sm"
              >
                <span>View All</span>
                <IconExternalLink size={13} />
              </Link>
            </div>

            <div className="adm-card-body p-0">
              {statusEntries.length === 0 ? (
                <div className="adm-empty-state py-4">
                  <p className="adm-empty-desc mb-0">No job applications recorded yet.</p>
                </div>
              ) : (
                <div className="adm-table-responsive">
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th className="text-center">Count</th>
                        <th className="text-end">Share</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statusEntries.map(([status, count]) => {
                        const meta = statusMeta[status] || {
                          label: status,
                          color: "adm-badge-read",
                          dotColor: "#64748b",
                        };
                        const percentage = totalAppsCount > 0
                          ? Math.round((count / totalAppsCount) * 100)
                          : 0;

                        return (
                          <tr key={status}>
                            <td>
                              <span className={`adm-badge ${meta.color}`}>
                                <span
                                  className="adm-badge-dot"
                                  style={{ backgroundColor: meta.dotColor }}
                                />
                                {meta.label}
                              </span>
                            </td>
                            <td className="text-center fw-bold">{count}</td>
                            <td className="text-end">
                              <span className="text-muted small fw-medium">
                                {percentage}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Platform Shortcuts & Records */}
        <div className="col-12 col-lg-5">
          <div className="adm-card h-100 mb-0">
            <div className="adm-card-header">
              <div>
                <h2 className="adm-card-title">Quick Actions</h2>
                <p className="adm-card-subtitle">Direct shortcuts to manage platform data</p>
              </div>
            </div>
            <div className="adm-card-body d-flex flex-column gap-2">
              <Link
                to="/admin/jobs"
                className="d-flex align-items-center justify-content-between p-3 border rounded-2 text-decoration-none bg-light bg-opacity-50 hover-bg-light transition"
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="adm-stat-icon-wrap adm-stat-icon-slate" style={{ width: 36, height: 36 }}>
                    <IconJobs size={18} />
                  </div>
                  <div>
                    <span className="fw-semibold text-dark d-block">Manage Jobs</span>
                    <span className="small text-muted">Create openings and review applicants</span>
                  </div>
                </div>
                <span className="adm-btn adm-btn-primary adm-btn-sm">
                  <IconPlus size={13} />
                  <span>Add Job</span>
                </span>
              </Link>

              <Link
                to="/admin/courses"
                className="d-flex align-items-center justify-content-between p-3 border rounded-2 text-decoration-none bg-light bg-opacity-50 hover-bg-light transition"
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="adm-stat-icon-wrap adm-stat-icon-rose" style={{ width: 36, height: 36 }}>
                    <IconCourses size={18} />
                  </div>
                  <div>
                    <span className="fw-semibold text-dark d-block">Manage Courses</span>
                    <span className="small text-muted">Publish syllabus batches & dates</span>
                  </div>
                </div>
                <span className="adm-btn adm-btn-primary adm-btn-sm">
                  <IconPlus size={13} />
                  <span>Add Course</span>
                </span>
              </Link>

              <Link
                to="/admin/contacts"
                className="d-flex align-items-center justify-content-between p-3 border rounded-2 text-decoration-none bg-light bg-opacity-50 hover-bg-light transition"
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="adm-stat-icon-wrap adm-stat-icon-sky" style={{ width: 36, height: 36 }}>
                    <IconContacts size={18} />
                  </div>
                  <div>
                    <span className="fw-semibold text-dark d-block">Contact Inquiries</span>
                    <span className="small text-muted">Follow up on website leads</span>
                  </div>
                </div>
                <span className="badge bg-light text-secondary border">Review</span>
              </Link>

              <Link
                to="/admin/records"
                className="d-flex align-items-center justify-content-between p-3 border rounded-2 text-decoration-none bg-light bg-opacity-50 hover-bg-light transition"
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="adm-stat-icon-wrap adm-stat-icon-purple" style={{ width: 36, height: 36 }}>
                    <IconCorporate size={18} />
                  </div>
                  <div>
                    <span className="fw-semibold text-dark d-block">All Records Directory</span>
                    <span className="small text-muted">Enrollments, candidates & corporate</span>
                  </div>
                </div>
                <span className="badge bg-light text-secondary border">Browse</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
