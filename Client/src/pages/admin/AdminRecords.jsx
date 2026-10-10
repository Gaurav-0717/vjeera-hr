import { useCallback, useEffect, useState, useMemo } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { adminRequest } from "../../api.js";
import {
  IconContacts,
  IconEnrollments,
  IconApplications,
  IconCorporate,
  IconSearch,
  IconFilter,
  IconRefresh,
  IconEye,
  IconTrash,
  IconClose,
} from "../../components/admin/AdminIcons.jsx";

const recordSections = [
  {
    to: "/admin/contacts",
    label: "Contacts",
    icon: IconContacts,
    iconColor: "adm-stat-icon-sky",
    description: "Inquiries submitted through the public contact form.",
    badgeText: "Lead Inquiries",
  },
  {
    to: "/admin/enrollments",
    label: "Enrollments",
    icon: IconEnrollments,
    iconColor: "adm-stat-icon-emerald",
    description: "Student applications and registrations for academy courses.",
    badgeText: "Course Admissions",
  },
  {
    to: "/admin/applications",
    label: "Applications",
    icon: IconApplications,
    iconColor: "adm-stat-icon-blue",
    description: "Job candidate submissions, positions applied, and status tracking.",
    badgeText: "Talent Pipeline",
  },
  {
    to: "/admin/corporate-enquiries",
    label: "Corporate Enquiries",
    icon: IconCorporate,
    iconColor: "adm-stat-icon-purple",
    description: "Business and corporate training consultation requests.",
    badgeText: "B2B Solutions",
  },
];

const statusBadgeClasses = {
  new: "adm-badge-new",
  pending: "adm-badge-pending",
  read: "adm-badge-read",
  replied: "adm-badge-replied",
  contacted: "adm-badge-contacted",
  reviewing: "adm-badge-reviewing",
  shortlisted: "adm-badge-shortlisted",
  enrolled: "adm-badge-enrolled",
  converted: "adm-badge-converted",
  hired: "adm-badge-hired",
  rejected: "adm-badge-rejected",
  cancelled: "adm-badge-cancelled",
  closed: "adm-badge-closed",
};

export function AdminRecordsHome() {
  return (
    <div>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Records Directory</h1>
          <p className="adm-page-subtitle">
            Choose a submission category to review records, manage pipelines, and update statuses.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {recordSections.map((section) => {
          const IconComp = section.icon;
          return (
            <div key={section.to} className="col-12 col-md-6">
              <Link
                to={section.to}
                className="adm-card text-decoration-none d-block h-100 hover-shadow transition"
              >
                <div className="adm-card-body d-flex align-items-start gap-3 p-4">
                  <div className={`adm-stat-icon-wrap ${section.iconColor}`}>
                    <IconComp size={22} />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <h2 className="adm-card-title text-dark">{section.label}</h2>
                      <span className="badge bg-light text-secondary border">
                        {section.badgeText}
                      </span>
                    </div>
                    <p className="adm-card-subtitle mb-3">{section.description}</p>
                    <span className="adm-btn adm-btn-outline adm-btn-sm text-primary">
                      <span>View Records &rarr;</span>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatDate(iso) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(d);
  } catch {
    return "—";
  }
}

function AdminRecords({
  title,
  subtitle,
  listPath,
  patchPath,
  deletePath,
  statuses,
  columns,
  detailFields,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busyId, setBusyId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeItem, setActiveItem] = useState(null);

  // Global search from topbar outlet context if available
  const outletCtx = useOutletContext();
  const activeSearch = searchTerm || outletCtx?.globalSearch || "";

  const load = useCallback(() => {
    setLoading(true);
    adminRequest(listPath)
      .then((payload) => {
        setItems(payload.data || []);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [listPath]);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(id, status) {
    setBusyId(id);
    setNotice("");
    try {
      await adminRequest(`${patchPath}/${id}`, {
        method: "PATCH",
        body: { status },
      });
      setItems((prev) =>
        prev.map((it) => (it._id === id ? { ...it, status } : it)),
      );
      if (activeItem && activeItem._id === id) {
        setActiveItem((prev) => ({ ...prev, status }));
      }
      setNotice(`Status updated to "${status}".`);
      setTimeout(() => setNotice(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId("");
    }
  }

  async function handleDelete(id) {
    if (!deletePath) return;
    if (!window.confirm(`Are you sure you want to permanently delete this ${title.toLowerCase()} record?`)) {
      return;
    }
    setBusyId(id);
    setNotice("");
    try {
      await adminRequest(`${deletePath}/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((it) => it._id !== id));
      if (activeItem && activeItem._id === id) {
        setActiveItem(null);
      }
      setNotice("Record successfully deleted.");
      setTimeout(() => setNotice(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId("");
    }
  }

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Status filter
      if (statusFilter !== "all" && item.status !== statusFilter) {
        return false;
      }
      // Search filter
      if (!activeSearch.trim()) return true;
      const term = activeSearch.toLowerCase();

      return (
        item.name?.toLowerCase().includes(term) ||
        item.contactName?.toLowerCase().includes(term) ||
        item.companyName?.toLowerCase().includes(term) ||
        item.email?.toLowerCase().includes(term) ||
        item.phone?.toLowerCase().includes(term) ||
        item.subject?.toLowerCase().includes(term) ||
        item.message?.toLowerCase().includes(term) ||
        item.coverLetter?.toLowerCase().includes(term) ||
        item.service?.toLowerCase().includes(term) ||
        item.job?.title?.toLowerCase().includes(term) ||
        item.course?.title?.toLowerCase().includes(term)
      );
    });
  }, [items, statusFilter, activeSearch]);

  return (
    <div>
      {/* Page Header */}
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">{title}</h1>
          <p className="adm-page-subtitle">
            {subtitle || `Manage and track ${title.toLowerCase()} submissions.`}
          </p>
        </div>
        <div className="adm-header-actions">
          <button
            type="button"
            className="adm-btn adm-btn-outline adm-btn-sm"
            onClick={load}
            disabled={loading}
            title="Reload records"
          >
            <IconRefresh size={14} />
            <span>Reload</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {notice && (
        <div className="alert alert-success d-flex align-items-center justify-content-between py-2 px-3 mb-3 border-0 shadow-sm" role="status">
          <span className="small">{notice}</span>
          <button
            type="button"
            className="btn-close btn-close-sm"
            onClick={() => setNotice("")}
            aria-label="Close"
          />
        </div>
      )}
      {error && (
        <div className="alert alert-danger d-flex align-items-center justify-content-between py-2 px-3 mb-3 border-0 shadow-sm" role="alert">
          <span className="small">{error}</span>
          <button
            type="button"
            className="btn-close btn-close-sm"
            onClick={() => setError("")}
            aria-label="Close"
          />
        </div>
      )}

      {/* Card Table Container */}
      <div className="adm-card">
        {/* Table Toolbar: Search and Filter */}
        <div className="adm-table-toolbar">
          <div className="adm-toolbar-search">
            <IconSearch size={15} />
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()} by name, email, query...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search records"
            />
          </div>

          <div className="adm-toolbar-filters">
            <div className="d-flex align-items-center gap-2">
              <IconFilter size={14} className="text-muted" />
              <select
                className="adm-select py-1 px-2"
                style={{ fontSize: "0.82rem", width: "auto" }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter by status"
              >
                <option value="all">All Statuses ({items.length})</option>
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table Body / Loading / Empty */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted small">Loading {title.toLowerCase()}...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="adm-empty-state">
            <div className="adm-empty-icon">
              <IconSearch size={22} />
            </div>
            <div className="adm-empty-title">No records found</div>
            <p className="adm-empty-desc">
              {items.length === 0
                ? `No ${title.toLowerCase()} have been submitted to the platform yet.`
                : "No submissions match your current search or status filter."}
            </p>
            {activeSearch || statusFilter !== "all" ? (
              <button
                type="button"
                className="adm-btn adm-btn-outline adm-btn-sm"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
              >
                Clear Filters
              </button>
            ) : null}
          </div>
        ) : (
          <div className="adm-table-responsive">
            <table className="adm-table">
              <caption className="visually-hidden">{title} records</caption>
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col.key} style={col.width ? { width: col.width } : undefined}>
                      {col.label}
                    </th>
                  ))}
                  <th style={{ width: 110 }}>Date</th>
                  <th style={{ width: 140 }}>Status</th>
                  <th className="text-end" style={{ width: 90 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item._id}>
                    {columns.map((col) => (
                      <td key={col.key}>
                        {col.render ? col.render(item) : item[col.key] || "—"}
                      </td>
                    ))}
                    <td>
                      <span className="text-muted small">
                        {formatDate(item.createdAt)}
                      </span>
                    </td>
                    <td>
                      <select
                        className={`adm-status-select ${statusBadgeClasses[item.status] || ""}`}
                        value={item.status}
                        disabled={busyId === item._id}
                        aria-label={`${title} status for ${item.name || item._id}`}
                        onChange={(e) => updateStatus(item._id, e.target.value)}
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="text-end">
                      <div className="d-flex align-items-center justify-content-end gap-1">
                        <button
                          type="button"
                          className="adm-btn-icon"
                          title="View Full Details"
                          onClick={() => setActiveItem(item)}
                        >
                          <IconEye size={15} />
                        </button>
                        {deletePath && (
                          <button
                            type="button"
                            className="adm-btn-icon adm-danger"
                            title="Delete Record"
                            disabled={busyId === item._id}
                            onClick={() => handleDelete(item._id)}
                          >
                            <IconTrash size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Detail Modal */}
      {activeItem && (
        <div
          className="adm-modal-backdrop"
          onClick={() => setActiveItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <div>
                <h2 className="adm-modal-title">{title} Details</h2>
                <span className="text-muted small">
                  Submitted {formatDate(activeItem.createdAt)}
                </span>
              </div>
              <button
                type="button"
                className="adm-btn-icon"
                onClick={() => setActiveItem(null)}
                aria-label="Close"
              >
                <IconClose size={18} />
              </button>
            </div>

            <div className="adm-modal-body">
              <div className="adm-detail-grid">
                {(detailFields || []).map((df) => (
                  <div
                    key={df.key}
                    className={`adm-detail-item ${df.fullWidth ? "adm-detail-full" : ""}`}
                  >
                    <div className="adm-detail-label">{df.label}</div>
                    <div className="adm-detail-value">
                      {df.render ? df.render(activeItem) : activeItem[df.key] || "—"}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-3 border-top d-flex align-items-center justify-content-between">
                <div>
                  <span className="adm-label mb-1">Update Status:</span>
                  <select
                    className="adm-select"
                    style={{ width: "auto" }}
                    value={activeItem.status}
                    disabled={busyId === activeItem._id}
                    onChange={(e) => updateStatus(activeItem._id, e.target.value)}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                {deletePath && (
                  <button
                    type="button"
                    className="adm-btn adm-btn-danger-outline adm-btn-sm"
                    disabled={busyId === activeItem._id}
                    onClick={() => handleDelete(activeItem._id)}
                  >
                    <IconTrash size={14} />
                    <span>Delete Record</span>
                  </button>
                )}
              </div>
            </div>

            <div className="adm-modal-footer">
              <button
                type="button"
                className="adm-btn adm-btn-outline adm-btn-sm"
                onClick={() => setActiveItem(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function AdminContacts() {
  return (
    <AdminRecords
      title="Contacts"
      subtitle="Review customer inquiries, reach out, and update follow-up statuses."
      listPath="/api/admin/contacts"
      patchPath="/api/admin/contacts"
      deletePath="/api/admin/contacts"
      statuses={["new", "read", "replied", "closed"]}
      columns={[
        {
          key: "name",
          label: "Name",
          render: (item) => (
            <div>
              <span className="fw-semibold text-dark d-block">{item.name}</span>
              <span className="small text-muted">{item.email}</span>
            </div>
          ),
        },
        { key: "phone", label: "Phone", render: (item) => item.phone || "—" },
        { key: "subject", label: "Subject", render: (item) => item.subject || "General inquiry" },
        {
          key: "message",
          label: "Message",
          render: (item) => (
            <span
              className="text-truncate d-inline-block text-muted"
              style={{ maxWidth: 220 }}
              title={item.message}
            >
              {item.message || "—"}
            </span>
          ),
        },
      ]}
      detailFields={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone Number" },
        { key: "subject", label: "Subject" },
        { key: "message", label: "Full Message", fullWidth: true },
      ]}
    />
  );
}

export function AdminEnrollments() {
  return (
    <AdminRecords
      title="Enrollments"
      subtitle="Track students applying for academy courses and training tracks."
      listPath="/api/admin/enrollments"
      patchPath="/api/admin/enrollments"
      deletePath="/api/admin/enrollments"
      statuses={["pending", "contacted", "enrolled", "cancelled"]}
      columns={[
        {
          key: "name",
          label: "Student",
          render: (item) => (
            <div>
              <span className="fw-semibold text-dark d-block">{item.name}</span>
              <span className="small text-muted">{item.email}</span>
            </div>
          ),
        },
        {
          key: "course",
          label: "Course",
          render: (item) => (
            <span className="badge bg-primary bg-opacity-10 text-primary fw-medium px-2 py-1">
              {item.course?.title || "Course"}
            </span>
          ),
        },
        { key: "phone", label: "Phone", render: (item) => item.phone || "—" },
      ]}
      detailFields={[
        { key: "name", label: "Student Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone Number" },
        {
          key: "course",
          label: "Selected Course",
          render: (item) => item.course?.title || "—",
        },
        { key: "message", label: "Candidate Notes / Message", fullWidth: true },
      ]}
    />
  );
}

export function AdminApplications() {
  return (
    <AdminRecords
      title="Applications"
      subtitle="Review talent applications, assess positions, and manage candidate hiring stages."
      listPath="/api/admin/applications"
      patchPath="/api/admin/applications"
      deletePath="/api/admin/applications"
      statuses={["pending", "reviewing", "shortlisted", "rejected", "hired"]}
      columns={[
        {
          key: "name",
          label: "Applicant",
          render: (item) => (
            <div>
              <span className="fw-semibold text-dark d-block">{item.name}</span>
              <span className="small text-muted">{item.email}</span>
            </div>
          ),
        },
        {
          key: "job",
          label: "Position",
          render: (item) => (
            <span className="badge bg-secondary bg-opacity-10 text-secondary-emphasis fw-medium px-2 py-1">
              {item.job?.title || "General Application"}
            </span>
          ),
        },
        { key: "phone", label: "Phone", render: (item) => item.phone || "—" },
        {
          key: "coverLetter",
          label: "Cover Letter",
          render: (item) => (
            <span
              className="text-truncate d-inline-block text-muted small"
              style={{ maxWidth: 200 }}
              title={item.coverLetter}
            >
              {item.coverLetter || "—"}
            </span>
          ),
        },
      ]}
      detailFields={[
        { key: "name", label: "Applicant Name" },
        { key: "email", label: "Email Address" },
        { key: "phone", label: "Contact Phone" },
        {
          key: "job",
          label: "Job Position Applied For",
          render: (item) => item.job?.title || "—",
        },
        { key: "coverLetter", label: "Cover Letter / Statement", fullWidth: true },
      ]}
    />
  );
}

export function AdminCorporate() {
  return (
    <AdminRecords
      title="Corporate Enquiries"
      subtitle="Manage corporate consultation inquiries and B2B organizational requests."
      listPath="/api/admin/corporate-enquiries"
      patchPath="/api/admin/corporate-enquiries"
      deletePath="/api/admin/corporate-enquiries"
      statuses={["new", "contacted", "converted", "closed"]}
      columns={[
        {
          key: "companyName",
          label: "Company & Contact",
          render: (item) => (
            <div>
              <span className="fw-semibold text-dark d-block">{item.companyName}</span>
              <span className="small text-muted">{item.contactName} ({item.email})</span>
            </div>
          ),
        },
        {
          key: "service",
          label: "Service",
          render: (item) => (
            <span className="badge bg-info bg-opacity-10 text-info-emphasis fw-medium px-2 py-1">
              {item.service || "Consulting"}
            </span>
          ),
        },
        { key: "phone", label: "Phone", render: (item) => item.phone || "—" },
        { key: "employeeCount", label: "Employees", render: (item) => item.employeeCount || "—" },
      ]}
      detailFields={[
        { key: "companyName", label: "Company Name" },
        { key: "contactName", label: "Contact Person" },
        { key: "email", label: "Business Email" },
        { key: "phone", label: "Phone Number" },
        { key: "service", label: "Requested Service" },
        { key: "employeeCount", label: "Employee Count" },
        { key: "message", label: "Consultation Request Message", fullWidth: true },
      ]}
    />
  );
}
