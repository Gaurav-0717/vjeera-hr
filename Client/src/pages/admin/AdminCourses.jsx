import { useCallback, useEffect, useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { adminRequest } from "../../api.js";
import {
  IconCourses,
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconRefresh,
  IconClose,
} from "../../components/admin/AdminIcons.jsx";

const emptyCourse = {
  title: "",
  description: "",
  batchStart: "",
  batchTime: "",
  isActive: true,
};

function AdminCourses() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyCourse);
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
    return adminRequest("/api/admin/courses")
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

  function startEdit(course) {
    setEditingId(course._id);
    setForm({
      title: course.title || "",
      description: course.description || "",
      batchStart: course.batchStart || "",
      batchTime: course.batchTime || "",
      isActive: course.isActive !== false,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId("");
    setForm(emptyCourse);
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
        await adminRequest(`/api/admin/courses/${editingId}`, {
          method: "PUT",
          body: form,
        });
      } else {
        await adminRequest("/api/admin/courses", {
          method: "POST",
          body: form,
        });
      }
      setForm(emptyCourse);
      setEditingId("");
      setShowForm(false);
      await load();
      setNotice(editingId ? "Course curriculum updated successfully." : "New course created successfully.");
      setTimeout(() => setNotice(""), 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function remove(id) {
    if (!window.confirm("Are you sure you want to permanently delete this course?")) return;
    setDeletingId(id);
    setError("");
    setNotice("");
    try {
      await adminRequest(`/api/admin/courses/${id}`, { method: "DELETE" });
      await load();
      setNotice("Course deleted successfully.");
      setTimeout(() => setNotice(""), 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId("");
    }
  }

  const filteredItems = useMemo(() => {
    return items.filter((course) => {
      if (statusFilter === "active" && !course.isActive) return false;
      if (statusFilter === "inactive" && course.isActive) return false;

      if (!activeSearch.trim()) return true;
      const term = activeSearch.toLowerCase();
      return (
        course.title?.toLowerCase().includes(term) ||
        course.description?.toLowerCase().includes(term) ||
        course.batchStart?.toLowerCase().includes(term) ||
        course.batchTime?.toLowerCase().includes(term)
      );
    });
  }, [items, statusFilter, activeSearch]);

  return (
    <div>
      {/* Page Header */}
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Course Management</h1>
          <p className="adm-page-subtitle">
            Manage training programs, batch schedules, timings, and course enrollments.
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
                setForm(emptyCourse);
              }}
            >
              <IconPlus size={16} />
              <span>Add New Course</span>
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
            title="Reload courses"
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
            <span>{editingId ? "Edit Course Details" : "Create New Course"}</span>
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
                <label className="adm-label" htmlFor="course-title">
                  Course Title <span className="adm-label-req">*</span>
                </label>
                <input
                  id="course-title"
                  className="adm-input"
                  placeholder="e.g. Certified HR Generalist & Payroll Specialist"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  disabled={saving}
                />
              </div>

              <div className="col-12 col-md-3">
                <label className="adm-label" htmlFor="course-batch-start">
                  Batch Schedule / Start
                </label>
                <input
                  id="course-batch-start"
                  className="adm-input"
                  placeholder="e.g. 1st & 15th of Every Month"
                  value={form.batchStart}
                  onChange={(e) => setForm({ ...form, batchStart: e.target.value })}
                  disabled={saving}
                />
              </div>

              <div className="col-12 col-md-3">
                <label className="adm-label" htmlFor="course-batch-time">
                  Batch Timings / Days
                </label>
                <input
                  id="course-batch-time"
                  className="adm-input"
                  placeholder="e.g. 10:00 AM - 1:00 PM (Sat/Sun)"
                  value={form.batchTime}
                  onChange={(e) => setForm({ ...form, batchTime: e.target.value })}
                  disabled={saving}
                />
              </div>

              <div className="col-12">
                <label className="adm-label" htmlFor="course-desc">
                  Course Curriculum & Overview
                </label>
                <textarea
                  id="course-desc"
                  className="adm-textarea"
                  rows="3"
                  placeholder="Summarize course modules, deliverables, and learning outcomes..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  disabled={saving}
                ></textarea>
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input
                    id="course-active-check"
                    type="checkbox"
                    className="form-check-input"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    disabled={saving}
                  />
                  <label className="form-check-label fw-medium text-dark small" htmlFor="course-active-check">
                    Active & Available for Student Enrollment
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
                  "Update Course"
                ) : (
                  "Publish Course"
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
              placeholder="Search courses by title, timings, schedule..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search courses"
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
              <option value="all">All Courses ({items.length})</option>
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
            <p className="text-muted small">Loading course catalog...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="adm-empty-state">
            <div className="adm-empty-icon">
              <IconCourses size={22} />
            </div>
            <div className="adm-empty-title">No courses found</div>
            <p className="adm-empty-desc">
              {items.length === 0
                ? "No academy courses have been created yet. Click 'Add New Course' above to publish your first program."
                : "No courses match your current search term."}
            </p>
            {items.length === 0 && (
              <button
                type="button"
                className="adm-btn adm-btn-primary adm-btn-sm"
                onClick={() => setShowForm(true)}
              >
                <IconPlus size={14} />
                <span>Create First Course</span>
              </button>
            )}
          </div>
        ) : (
          <div className="adm-table-responsive">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Batch Schedule</th>
                  <th>Batch Timings</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((course) => (
                  <tr key={course._id}>
                    <td>
                      <div>
                        <span className="fw-semibold text-dark d-block">{course.title}</span>
                        {course.description && (
                          <span
                            className="small text-muted text-truncate d-inline-block"
                            style={{ maxWidth: 300 }}
                            title={course.description}
                          >
                            {course.description}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="small text-dark fw-medium">
                        {course.batchStart || "Ongoing / Flexible"}
                      </span>
                    </td>
                    <td>
                      <span className="small text-muted">
                        {course.batchTime || "—"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`adm-badge ${course.isActive ? "adm-badge-active" : "adm-badge-inactive"}`}
                      >
                        <span className="adm-badge-dot" />
                        {course.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="d-flex align-items-center justify-content-end gap-1">
                        <button
                          type="button"
                          className="adm-btn-icon"
                          title="Edit course"
                          onClick={() => startEdit(course)}
                        >
                          <IconEdit size={15} />
                        </button>
                        <button
                          type="button"
                          className="adm-btn-icon adm-danger"
                          title="Delete course"
                          disabled={deletingId === course._id}
                          onClick={() => remove(course._id)}
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

export default AdminCourses;
