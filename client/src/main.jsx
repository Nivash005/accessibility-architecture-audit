import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { getServiceStatusMessage } from "./serviceStatus.js";
import "./styles.css";

function App() {
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/services", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("The service list could not be loaded.");
        return response.json();
      })
      .then((data) => {
        setServices(data);
        setStatus(data.length > 0 ? "ready" : "empty");
      })
      .catch((error) => {
        if (error.name !== "AbortError") setStatus("error");
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="container">
          <p className="eyebrow">Project demo</p>
          <h1>Find a government service</h1>
          <p className="intro">
            A small example of how a public-service directory could be organised.
          </p>
          <nav aria-label="Main navigation">
            <a href="#services">Browse services</a>
            <a href="#about">About this demo</a>
          </nav>
        </div>
      </header>

      <main id="main-content" className="container">
        <section id="services" aria-labelledby="services-heading">
          <h2 id="services-heading">Service directory</h2>
          <p>These sample entries demonstrate the page structure and API connection.</p>

          {status !== "ready" && (
            <p role={status === "error" ? "alert" : "status"}>
              {getServiceStatusMessage(status)}
            </p>
          )}

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

        <section id="about" aria-labelledby="about-heading">
          <h2 id="about-heading">About this project</h2>
          <p>
            This is an independent student project. It is not an official Government of Tamil Nadu website,
            does not collect applications and does not ask for personal information.
          </p>
          <p>
            To find real state services, visit the{" "}
            <a href="https://www.tn.gov.in/services.php">Tamil Nadu Government Services page</a>.
          </p>
        </section>
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
