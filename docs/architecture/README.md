# How the starter app is organised

I kept the app deliberately small. The aim is to show where each responsibility belongs, not to build a full government service platform.

## The pieces

### Client

The React app displays the service list and handles loading and error messages. It uses semantic headings, a skip link and visible keyboard focus styling.

The client calls `GET /api/services`. It does not import server-side code or read from a database.

### Server

The Express app exposes the API. The route calls a small service-list function and returns JSON. The sample data lives in its own module so it can be replaced later.

### Documentation and tests

The `docs/` folder holds the research, audit results and architecture notes. The `tests/` folder contains a short acceptance checklist. The automated unit tests run in GitHub Actions on pushes and pull requests.

## One feature, from screen to data

```text
Person opens the catalogue
        |
        v
React renders loading state
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
```

## Why keep these boundaries?

If I later replace the sample array with SQLite or PostgreSQL, I should only need to change the server-side data layer. The React component should still receive the same JSON shape.

This also makes it easier to test the UI and API separately. Accessibility-related changes can stay in the client without pulling database details into the browser.

## What I would add next

For a real service, I would add request validation, a repository interface, persistent storage, API integration tests and a proper error model. I would also add component-level accessibility tests and a manual screen-reader test plan before treating the service as ready for public use.

