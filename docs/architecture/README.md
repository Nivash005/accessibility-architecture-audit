# Project structure

I kept this app small on purpose. It shows how a service directory can be split into parts without mixing page code, HTTP handling and data storage.

## Client

The React app displays the service list. It handles the loading, empty and error states, and provides a skip link and visible keyboard focus styling.

The client requests /api/services. In development, Vite forwards that request to the Express server. The client does not import server files or connect directly to a database.

## Server

Express provides two simple routes:

- GET /health confirms that the server is running.
- GET /api/services returns the sample service list.

The list is kept in server/src/services.js. That keeps sample content out of the route handler.

## First feature slice

\`\`\`text
Visitor opens the page
        |
        v
React shows a loading message
        |
        v
GET /api/services
        |
        v
Express route
        |
        v
listServices()
        |
        v
Sample service records
        |
        v
React renders the list
\`\`\`

## Why these boundaries matter

If I replace the sample array with SQLite or PostgreSQL later, the browser should not need to change. The API response can stay the same while the server's data-access code changes.

That also makes testing easier: I can test the service-list function separately from the page, and I can keep keyboard interaction and focus styling in the client where they belong.

## What I would add for a real service

Before using this as a public-facing service, I would add persistent storage, input validation, integration tests, proper API error handling and user research. I would also run a manual screen-reader test with people who use assistive technology.
