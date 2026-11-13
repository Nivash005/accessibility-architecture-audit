import React, { useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { getServiceStatusMessage } from './serviceStatus.js';
import './styles.css';

function ServiceList() {
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState('loading');

  const loadServices = useCallback(async (signal) => {
    setStatus('loading');

    try {
      const response = await fetch('/api/services', { signal });
      if (!response.ok) {
        throw new Error('The API returned ' + response.status + '.');
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('The API response was not a service list.');
      }

      setServices(data);
      setStatus(data.length === 0 ? 'empty' : 'ready');
    } catch (error) {
      if (error.name !== 'AbortError') {
        setStatus('error');
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadServices(controller.signal);
    return () => controller.abort();
  }, [loadServices]);

  const statusMessage = getServiceStatusMessage(status);

  return (
    <section aria-labelledby="services-heading" id="services">
      <div className="section-heading">
        <div>
          <p className="eyebrow">First feature slice</p>
          <h2 id="services-heading">Example services</h2>
        </div>
        <span className="section-note">Read-only sample data</span>
      </div>

      {status !== 'ready' && (
        <div className={'status-message status-' + status} role={status === 'error' ? 'alert' : 'status'}>
          <p>{statusMessage}</p>
          {status === 'error' && (
            <button
              className="text-button"
              type="button"
              onClick={() => loadServices(new AbortController().signal)}
            >
              Try again
            </button>
          )}
        </div>
      )}

      {status === 'ready' && (
        <ul className="service-list">
          {services.map((service) => (
            <li className="service-card" key={service.id}>
              <div className="service-card-heading">
                <h3>{service.name}</h3>
                {service.department && <span className="department-tag">{service.department}</span>}
              </div>
              <p>{service.description}</p>
              <span className="sample-note">Example entry — no application link is connected.</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="site-header">
        <div className="container header-content">
          <div>
            <p className="eyebrow">Accessibility audit project</p>
            <h1>A simpler way to explore public services</h1>
            <p className="intro-copy">
              A small example app built while reviewing the Tamil Nadu Government portal.
            </p>
          </div>
          <nav aria-label="Main navigation">
            <a href="#services">Services</a>
            <a href="#approach">Project approach</a>
          </nav>
        </div>
      </header>

      <main className="container" id="main-content">
        <div className="intro-panel">
          <p>
            This is a learning prototype, not an official Government of Tamil Nadu service.
            The entries below are sample content used to demonstrate a browser-to-API feature.
          </p>
        </div>

        <ServiceList />

        <section aria-labelledby="approach-heading" id="approach">
          <p className="eyebrow">How the app is organized</p>
          <h2 id="approach-heading">A small feature, with clear boundaries</h2>
          <ol className="steps-list">
            <li><strong>React</strong> presents the list and handles loading or error messages.</li>
            <li><strong>Express</strong> provides the /api/services endpoint.</li>
            <li><strong>Server-side service data</strong> stays separate from the page code.</li>
          </ol>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>Built as an accessibility and architecture exercise. Sample entries only.</p>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
