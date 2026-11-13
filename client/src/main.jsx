import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import AccessibleModal from "./components/AccessibleModal.jsx";
import DashboardForm from "./components/DashboardForm.jsx";
import DashboardTable from "./components/DashboardTable.jsx";
import "./styles.css";

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <header className="site-header">
        <div className="brand">
          <p className="eyebrow">Enterprise dashboard</p>
          <h1>Public Service Operations</h1>
        </div>
        <nav aria-label="Global navigation">
          <ul>
            <li><a href="#dashboard" aria-current="page">Dashboard</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#reports">Reports</a></li>
            <li><a href="#help">Help</a></li>
          </ul>
        </nav>
      </header>

      <aside className="sidebar" aria-label="Dashboard sections">
        <nav aria-label="Sidebar navigation">
          <h2 className="visually-hidden">Dashboard sections</h2>
          <ul>
            <li><a href="#dashboard" aria-current="page">Overview</a></li>
            <li><a href="#records">Service records</a></li>
            <li><a href="#filters">Filters</a></li>
            <li><a href="#settings">Settings</a></li>
          </ul>
        </nav>
      </aside>

      <main id="main-content" className="main-content">
        <section id="dashboard" aria-labelledby="dashboard-heading">
          <header className="section-header">
            <div>
              <p className="eyebrow">Overview</p>
              <h2 id="dashboard-heading">Service operations</h2>
              <p>Monitor service records and review operational activity.</p>
            </div>
            <button type="button" onClick={() => setDialogOpen(true)}>
              Add note
            </button>
          </header>

          <div className="metrics" aria-label="Key performance indicators">
            <article className="metric-card">
              <h3>Active services</h3>
              <p className="metric-value">128</p>
              <p>Across 14 departments</p>
            </article>
            <article className="metric-card">
              <h3>Open reviews</h3>
              <p className="metric-value">12</p>
              <p>3 require attention today</p>
            </article>
            <article className="metric-card">
              <h3>Requests processed</h3>
              <p className="metric-value">4,286</p>
              <p>This reporting period</p>
            </article>
          </div>
        </section>

        <section id="filters" aria-labelledby="filters-heading">
          <h2 id="filters-heading">Search and filter</h2>
          <DashboardForm />
        </section>

        <section id="records" aria-labelledby="records-heading">
          <header className="section-header compact">
            <div>
              <p className="eyebrow">Records</p>
              <h2 id="records-heading">Recent service records</h2>
            </div>
            <a href="#reports">View all reports</a>
          </header>
          <DashboardTable />
        </section>

        <section id="services" aria-labelledby="services-heading">
          <article className="content-card">
            <h2 id="services-heading">Service architecture</h2>
            <p>
              This page demonstrates a semantic HTML5 structure with landmarks,
              labelled controls, keyboard-friendly interactions, scoped table
              headers, and an accessible native dialog.
            </p>
          </article>
        </section>

        <section id="settings" aria-labelledby="settings-heading">
          <h2 id="settings-heading">Account settings</h2>
          <form className="settings-form">
            <fieldset>
              <legend>Notification preferences</legend>
              <label>
                <input type="checkbox" name="email-notifications" defaultChecked />
                Email notifications
              </label>
              <label>
                <input type="checkbox" name="weekly-summary" />
                Weekly summary
              </label>
            </fieldset>
          </form>
        </section>

        <section id="reports" aria-labelledby="reports-heading">
          <h2 id="reports-heading">Reports</h2>
          <article className="content-card">
            <p>Reports are available to authorised dashboard users.</p>
            <a href="#records">Return to service records</a>
          </article>
        </section>

        <section id="help" aria-labelledby="help-heading">
          <h2 id="help-heading">Help</h2>
          <article className="content-card">
            <p>Use the sidebar or global navigation to move between dashboard areas.</p>
          </article>
        </section>
      </main>

      <footer className="site-footer">
        <p>&copy; 2026 Public Service Operations. Accessibility architecture demonstration.</p>
      </footer>

      <AccessibleModal open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
