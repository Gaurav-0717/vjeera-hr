import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  clearAdminSession,
  getAdminProfile,
  getAdminToken,
} from "../../api.js";

const links = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/contacts", label: "Contacts" },
  { to: "/admin/enrollments", label: "Enrollments" },
  { to: "/admin/applications", label: "Applications" },
  { to: "/admin/corporate-enquiries", label: "Corporate" },
  { to: "/admin/jobs", label: "Jobs" },
  { to: "/admin/courses", label: "Courses" },
];

function AdminLayout() {
  const navigate = useNavigate();
  const admin = getAdminProfile();

  useEffect(() => {
    if (!getAdminToken()) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  if (!getAdminToken()) {
    return null;
  }

  function logout() {
    clearAdminSession();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Vjeera HR Admin</span>
          <div className="d-flex align-items-center gap-3">
            <span className="text-white-50 small">{admin?.email}</span>
            <button
              type="button"
              className="btn btn-outline-light btn-sm"
              onClick={logout}
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>
      <div className="container-fluid py-4">
        <div className="row g-4">
          <div className="col-md-3 col-lg-2">
            <div className="list-group">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `list-group-item list-group-item-action ${isActive ? "active" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="col-md-9 col-lg-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
