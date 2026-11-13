import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("http://localhost:4000/api/services")
      .then((r) => r.ok ? r.json() : Promise.reject(new Error("Request failed")))
      .then((data) => { setServices(data); setStatus("ready"); })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="container">
          <p className="eyebrow">Public Service Foundation</p>
          <h1>Accessible Service Catalogue</h1>
          <nav aria-label="Primary navigation">
            <a href="#services">Services</a>
            <a href="#principles">Accessibility</a>
          </nav>
        </div>
      </header>

      <main id="main-content" className="container">
        <section aria-labelledby="services-heading" id="services">
          <h2 id="services-heading">Services</h2>
          {status === "loading" && <p role="status">Loading services…</p>}
          {status === "error" && <p role="alert">Services could not be loaded.</p>}
          {status === "ready" && (
            <ul className="service-list">
              {services.map((service) => (
                <li key={service.id}>
                  <a href={service.href}>{service.name}</a>
                  <p>{service.description}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section id="principles" aria-labelledby="principles-heading">
          <h2 id="principles-heading">Accessibility baseline</h2>
          <ul>
            <li>Keyboard-operable navigation</li>
            <li>Visible focus states</li>
            <li>Semantic headings and landmarks</li>
            <li>Native controls before custom widgets</li>
          </ul>
        </section>
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
