import React from "react";

export default function DashboardForm() {
  return (
    <form className="filter-form" aria-labelledby="filter-heading">
      <fieldset>
        <legend id="filter-heading">Filter service records</legend>
        <div className="form-grid">
          <div>
            <label htmlFor="service-search">Service name</label>
            <input id="service-search" name="service-search" type="search" placeholder="Search services" />
          </div>
          <div>
            <label htmlFor="status-filter">Status</label>
            <select id="status-filter" name="status-filter">
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="review">Review</option>
            </select>
          </div>
          <div>
            <label htmlFor="updated-date">Updated after</label>
            <input id="updated-date" name="updated-date" type="date" />
          </div>
          <div className="form-actions">
            <button type="submit">Apply filters</button>
            <button type="reset">Reset</button>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
