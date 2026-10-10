import { useCallback, useEffect, useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { adminRequest } from "../../api.js";
import {
  IconJobs,
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconRefresh,
  IconClose,
} from "../../components/admin/AdminIcons.jsx";

const emptyJob = {
  title: "",
  description: "",
  experience: "",
  skills: "",
  location: "",
  employmentType: "",
  displayColor: "info",
  isActive: true,
};

const displayColors = [
  { value: "primary", label: "Primary Blue" },
  { value: "info", label: "Teal / Cyan" },
  { value: "success", label: "Emerald Green" },
  { value: "warning", label: "Amber Orange" },
  { value: "danger", label: "Rose Red" },
  { value: "secondary", label: "Slate Gray" },
];

function AdminJobs() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyJob);
  const [editingId, setEditingId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const outletCtx = useOutletContext();
  const activeSearch = searchTerm || outletCtx?.globalSearch || "";

  const load = useCallback(() => {
    setLoading(true);
    return adminRequest("/api/admin/jobs")
      .then((payload) => {
        setItems(payload.data || []);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function startEdit(job) {
    setEditingId(job._id);
    setForm({
      title: job.title || "",
      description: job.description || "",
      experience: job.experience || "",
      skills: job.skills || "",
      location: job.location || "",
      employmentType: job.employmentType || "",
      displayColor: job.displayColor || "info",
      isActive: job.isActive !== false,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId("");
    setForm(emptyJob);
    setShowForm(false);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setError("");
    setNotice("");
    try {
      if (editingId) {
        await adminRequest(`/api/admin/jobs/${editingId}`, {
          method: "PUT",
          body: form,
        });
      } else {
        await adminRequest("/api/admin/jobs", {
          method: "POST",
          body: form,
        });
      }
      setForm(emptyJob);
      setEditingId("");
      setShowForm(false);
      await load();
      setNotice(editingId ? "Job opening updated successfully." : "New job opening created successfully.");
      setTimeout(() => setNotice(""), 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function remove(id) {
    if (!window.confirm("Are you sure you want to permanently delete this job listing?")) return;
    setDeletingId(id);
    setError("");
    setNotice("");
    try {
      await adminRequest(`/api/admin/jobs/${id}`, { method: "DELETE" });
      await load();
      setNotice("Job opening deleted successfully.");
      setTimeout(() => setNotice(""), 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId("");
    }
  }

  const filteredItems = useMemo(() => {
    return items.filter((job) => {
      if (statusFilter === "active" && !job.isActive) return false;
      if (statusFilter === "inactive" && job.isActive) return false;

      if (!activeSearch.trim()) return true;
      const term = activeSearch.toLowerCase();
      return (
        job.title?.toLowerCase().includes(term) ||
        job.location?.toLowerCase().includes(term) ||
        job.employmentType?.toLowerCase().includes(term) ||
        job.skills?.toLowerCase().includes(term) ||
        job.experience?.toLowerCase().includes(term)
      );
    });
  }, [items, statusFilter, activeSearch]);

  return (
    <div>
      {/* Page Header */}
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Job Openings</h1>
          <p className="adm-page-subtitle">
            Manage career opportunities, job requirements, and applicant postings.
          </p>
        </div>
        <div className="adm-header-actions">
          {!showForm ? (
            <button
              type="button"
              className="adm-btn adm-btn-primary"
              onClick={() => {
                setShowForm(true);
                setEditingId("");
                setForm(emptyJob);
              }}
            >
              <IconPlus size={16} />
              <span>Add New Job</span>
            </button>
          ) : (
            <button
              type="button"
              className="adm-btn adm-btn-outline"
              onClick={cancelEdit}
            >
              <IconClose size={16} />
              <span>Close Form</span>
            </button>
          )}
          <button
            type="button"
            className="adm-btn adm-btn-outline adm-btn-sm"
            onClick={load}
            disabled={loading}
            title="Reload jobs"
          >
            <IconRefresh size={14} />
          </button>
        </div>
      </div>

      {/* Alerts */}
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

      {/* Add / Edit Form Card */}
      {showForm && (
        <div className="adm-form-card mb-4 border-primary border-opacity-25 shadow-sm">
          <div className="adm-form-title">
            <span>{editingId ? "Edit Job Opening" : "Create New Job Opening"}</span>
            <button
              type="button"
              className="adm-btn-icon"
              onClick={cancelEdit}
              aria-label="Close form"
            >
              <IconClose size={16} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="adm-label" htmlFor="job-title">
                  Job Title <span className="adm-label-req">*</span>
                </label>
                <input
                  id="job-title"
                  className="adm-input"
                  placeholder="e.g. Senior HR Generalist"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  disabled={saving}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="adm-label" htmlFor="job-location">
                  Location / Work Mode
                </label>
                <input
                  id="job-location"
                  className="adm-input"
                  placeholder="e.g. Mumbai / Hybrid / Remote"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  disabled={saving}
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="adm-label" htmlFor="job-type">
                  Employment Type
                </label>
                <input
                  id="job-type"
                  className="adm-input"
                  placeholder="e.g. Full-time, Permanent"
                  value={form.employmentType}
                  onChange={(e) => setForm({ ...form, employmentType: e.target.value })}
                  disabled={saving}
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="adm-label" htmlFor="job-exp">
                  Required Experience
                </label>
                <input
                  id="job-exp"
                  className="adm-input"
                  placeholder="e.g. 2 - 5 Years"
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  disabled={saving}
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="adm-label" htmlFor="job-color">
                  Accent Color Theme
                </label>
                <select
                  id="job-color"
                  className="adm-select"
                  value={form.displayColor}
                  onChange={(e) => setForm({ ...form, displayColor: e.target.value })}
                  disabled={saving}
                >
                  {displayColors.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <label className="adm-label" htmlFor="job-skills">
                  Key Skills & Qualifications
                </label>
                <input
                  id="job-skills"
                  className="adm-input"
                  placeholder="e.g. Payroll, Compliance, Talent Sourcing, Excel"
                  value={form.skills}
                  onChange={(e) => setForm({ ...form, skills: e.target.value })}
                  disabled={saving}
                />
              </div>

              <div className="col-12">
                <label className="adm-label" htmlFor="job-desc">
                  Job Description & Responsibilities <span className="adm-label-req">*</span>
                </label>
                <textarea
                  id="job-desc"
                  className="adm-textarea"
                  rows="4"
                  placeholder="Provide a comprehensive role description..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                  disabled={saving}
                ></textarea>
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input
                    id="job-active-check"
                    type="checkbox"
                    className="form-check-input"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    disabled={saving}
                  />
                  <label className="form-check-label fw-medium text-dark small" htmlFor="job-active-check">
                    Active & Published on Career Page
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-top d-flex align-items-center gap-2">
              <button
                type="submit"
                className="adm-btn adm-btn-primary"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true" />
                    Saving...
                  </>
                ) : editingId ? (
                  "Update Job Opening"
                ) : (
                  "Publish Job Opening"
                )}
              </button>
              <button
                type="button"
                className="adm-btn adm-btn-outline"
                onClick={cancelEdit}
                disabled={saving}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table Card */}
      <div className="adm-card">
        {/* Table Toolbar */}
        <div className="adm-table-toolbar">
          <div className="adm-toolbar-search">
            <IconSearch size={15} />
            <input
              type="text"
              placeholder="Search jobs by title, skills, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search jobs"
            />
          </div>

          <div className="adm-toolbar-filters">
            <select
              className="adm-select py-1 px-2"
              style={{ fontSize: "0.82rem", width: "auto" }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
            >
              <option value="all">All Jobs ({items.length})</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted small">Loading job listings...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="adm-empty-state">
            <div className="adm-empty-icon">
              <IconJobs size={22} />
            </div>
            <div className="adm-empty-title">No job openings found</div>
            <p className="adm-empty-desc">
              {items.length === 0
                ? "You haven't posted any jobs yet. Click 'Add New Job' above to publish your first opening."
                : "No job postings matched your current search criteria."}
            </p>
            {items.length === 0 && (
              <button
                type="button"
                className="adm-btn adm-btn-primary adm-btn-sm"
                onClick={() => setShowForm(true)}
              >
                <IconPlus size={14} />
                <span>Create First Job</span>
              </button>
            )}
          </div>
        ) : (
          <div className="adm-table-responsive">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Location & Type</th>
                  <th>Experience</th>
                  <th>Skills</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((job) => (
                  <tr key={job._id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span
                          className={`badge rounded-pill border bg-${job.displayColor || "info"} bg-opacity-10 text-${job.displayColor || "info"}`}
                          style={{ width: 8, height: 8, padding: 0 }}
                          title={`Color: ${job.displayColor}`}
                        />
                        <span className="fw-semibold text-dark">{job.title}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <span className="d-block small text-dark">{job.location || "Not specified"}</span>
                        <span className="small text-muted">{job.employmentType || "Full-time"}</span>
                      </div>
                    </td>
                    <td>
                      <span className="small text-muted">{job.experience || "—"}</span>
                    </td>
                    <td>
                      <span
                        className="small text-muted text-truncate d-inline-block"
                        style={{ maxWidth: 180 }}
                        title={job.skills}
                      >
                        {job.skills || "—"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`adm-badge ${job.isActive ? "adm-badge-active" : "adm-badge-inactive"}`}
                      >
                        <span className="adm-badge-dot" />
                        {job.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="d-flex align-items-center justify-content-end gap-1">
                        <button
                          type="button"
                          className="adm-btn-icon"
                          title="Edit job opening"
                          onClick={() => startEdit(job)}
                        >
                          <IconEdit size={15} />
                        </button>
                        <button
                          type="button"
                          className="adm-btn-icon adm-danger"
                          title="Delete job opening"
                          disabled={deletingId === job._id}
                          onClick={() => remove(job._id)}
                        >
                          <IconTrash size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminJobs;
