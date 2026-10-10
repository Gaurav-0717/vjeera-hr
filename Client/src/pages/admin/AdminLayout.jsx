import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  clearAdminSession,
  getAdminProfile,
  getAdminToken,
} from "../../api.js";
import "../../admin.css";
import {
  IconDashboard,
  IconRecords,
  IconContacts,
  IconEnrollments,
  IconApplications,
  IconCorporate,
  IconJobs,
  IconCourses,
  IconSearch,
  IconMenu,
  IconClose,
  IconExternalLink,
  IconLogout,
  IconUser,
} from "../../components/admin/AdminIcons.jsx";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: IconDashboard, end: true },
  { to: "/admin/records", label: "Records", icon: IconRecords },
  { to: "/admin/contacts", label: "Contacts", icon: IconContacts },
  { to: "/admin/enrollments", label: "Enrollments", icon: IconEnrollments },
  { to: "/admin/applications", label: "Applications", icon: IconApplications },
  { to: "/admin/corporate-enquiries", label: "Corporate", icon: IconCorporate },
  { to: "/admin/jobs", label: "Jobs", icon: IconJobs },
  { to: "/admin/courses", label: "Courses", icon: IconCourses },
];

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const admin = getAdminProfile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!getAdminToken()) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  if (!getAdminToken()) {
    return null;
  }

  function handleLogout() {
    clearAdminSession();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="adm-app">
      {/* Mobile Drawer Overlay */}
      <div
        className={`adm-sidebar-overlay ${mobileOpen ? "show" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Dark Navy Sidebar */}
      <aside className={`adm-sidebar ${mobileOpen ? "open" : ""}`} aria-label="Admin Navigation">
        <div className="adm-sidebar-brand">
          <Link to="/admin/dashboard" className="adm-brand-link">
            <div className="adm-brand-logo">V</div>
            <div>
              <h1 className="adm-brand-title">Vjeera HR</h1>
              <p className="adm-brand-subtitle">Admin Portal</p>
            </div>
          </Link>
          <button
            type="button"
            className="adm-sidebar-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <IconClose size={20} />
          </button>
        </div>

        <nav className="adm-sidebar-nav">
          <div className="adm-nav-heading">Main Menu</div>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `adm-nav-link ${isActive ? "active" : ""}`
                }
              >
                <IconComponent size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="adm-sidebar-footer">
          <span>Vjeera HR v1.0</span>
          <span className="badge bg-primary bg-opacity-25 text-primary-emphasis border border-primary border-opacity-25">
            Admin
          </span>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="adm-main-wrap">
        {/* White Topbar */}
        <header className="adm-topbar">
          <div className="adm-topbar-left">
            <button
              type="button"
              className="adm-mobile-toggle"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <IconMenu size={20} />
            </button>

            <div className="adm-topbar-search">
              <IconSearch size={15} />
              <input
                type="text"
                placeholder="Quick search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search"
              />
            </div>
          </div>

          <div className="adm-topbar-right">
            <Link
              to="/"
              className="adm-btn adm-btn-outline adm-btn-sm"
              title="Open public website"
            >
              <IconExternalLink size={14} />
              <span>View Website</span>
            </Link>

            <div className="adm-user-profile" title={admin?.email || "Administrator"}>
              <div className="adm-user-avatar">
                {admin?.email ? admin.email.charAt(0).toUpperCase() : <IconUser size={15} />}
              </div>
              <div className="adm-user-meta">
                <span className="adm-user-role">Administrator</span>
                <span className="adm-user-email">{admin?.email || "admin@vjeera.com"}</span>
              </div>
            </div>

            <button
              type="button"
              className="adm-btn adm-btn-outline adm-btn-sm text-danger"
              onClick={handleLogout}
              title="Sign out of admin session"
            >
              <IconLogout size={14} />
              <span className="d-none d-sm-inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="adm-content-container">
          <Outlet context={{ globalSearch: searchTerm }} />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
