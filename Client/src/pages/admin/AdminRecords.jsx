import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminRequest } from "../../api.js";

const recordSections = [
  {
    to: "/admin/contacts",
    label: "Contacts",
    description: "Review and update contact enquiries.",
  },
  {
    to: "/admin/enrollments",
    label: "Enrollments",
    description: "Manage course enrollment requests.",
  },
  {
    to: "/admin/applications",
    label: "Applications",
    description: "Review job applications and statuses.",
  },
  {
    to: "/admin/corporate-enquiries",
    label: "Corporate enquiries",
    description: "Track corporate consultation requests.",
  },
];

export function AdminRecordsHome() {
  return (
    <div>
      <h1 className="h3 fw-bold mb-2">Records</h1>
      <p className="text-muted mb-4">
        Choose a record type to review submissions.
      </p>
      <div className="list-group">
        {recordSections.map((section) => (
          <Link
            key={section.to}
            className="list-group-item list-group-item-action py-3"
            to={section.to}
          >
            <span className="fw-bold d-block">{section.label}</span>
            <span className="small text-muted">{section.description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function AdminRecords({ title, listPath, patchPath, statuses, columns }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");

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
    try {
      await adminRequest(`${patchPath}/${id}`, {
        method: "PATCH",
        body: { status },
      });
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId("");
    }
  }

  return (
    <div>
      <h1 className="h3 fw-bold mb-4">{title}</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {loading ? (
        <p role="status">
          <span
            className="spinner-border spinner-border-sm me-2"
            aria-hidden="true"
          ></span>
          Loading records...
        </p>
      ) : (
        <div className="table-responsive admin-table-wrap">
          <table className="table table-sm align-middle bg-white">
            <caption className="visually-hidden">{title} records</caption>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="text-muted">
                    No {title.toLowerCase()} have been submitted yet.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item._id}>
                    {columns.map((col) => (
                      <td key={col.key}>
                        {col.render ? col.render(item) : item[col.key] || "—"}
                      </td>
                    ))}
                    <td style={{ minWidth: "160px" }}>
                      <select
                        className="form-select form-select-sm"
                        value={item.status}
                        disabled={busyId === item._id}
                        aria-label={`${title} status for ${item.name || item._id}`}
                        onChange={(e) => updateStatus(item._id, e.target.value)}
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function AdminContacts() {
  return (
    <AdminRecords
      title="Contacts"
      listPath="/api/admin/contacts"
      patchPath="/api/admin/contacts"
      statuses={["new", "read", "replied", "closed"]}
      columns={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "subject", label: "Subject" },
        { key: "message", label: "Message" },
      ]}
    />
  );
}

export function AdminEnrollments() {
  return (
    <AdminRecords
      title="Enrollments"
      listPath="/api/admin/enrollments"
      patchPath="/api/admin/enrollments"
      statuses={["pending", "contacted", "enrolled", "cancelled"]}
      columns={[
        {
          key: "course",
          label: "Course",
          render: (item) => item.course?.title || "—",
        },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
      ]}
    />
  );
}

export function AdminApplications() {
  return (
    <AdminRecords
      title="Applications"
      listPath="/api/admin/applications"
      patchPath="/api/admin/applications"
      statuses={["pending", "reviewing", "shortlisted", "rejected", "hired"]}
      columns={[
        {
          key: "job",
          label: "Job",
          render: (item) => item.job?.title || "—",
        },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
      ]}
    />
  );
}

export function AdminCorporate() {
  return (
    <AdminRecords
      title="Corporate enquiries"
      listPath="/api/admin/corporate-enquiries"
      patchPath="/api/admin/corporate-enquiries"
      statuses={["new", "contacted", "converted", "closed"]}
      columns={[
        { key: "companyName", label: "Company" },
        { key: "contactName", label: "Contact" },
        { key: "email", label: "Email" },
        { key: "service", label: "Service" },
      ]}
    />
  );
}
