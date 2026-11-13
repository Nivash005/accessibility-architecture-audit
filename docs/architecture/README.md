# How the starter app is divided

The sample app has one job: show a short service list from an API. The folder boundaries are meant to stay useful when the example grows.

## Browser: client/

The client is responsible for what the visitor sees and does: page structure, link and button behavior, keyboard focus, loading feedback, error feedback and requests to the API. It should not import database libraries or decide how service records are stored.

## API: server/

The server exposes HTTP endpoints, validates incoming requests and returns data in a predictable shape. Service logic and data access stay here so the client does not need to know whether the data comes from an array, SQLite or PostgreSQL.

## Evidence and decisions: docs/

The audit report explains why the project exists. The audit folder stores the raw output and run summary. The architecture folder records the separation described above. Screenshots are kept beside the report so a reviewer can compare the written finding with the page that was checked.

## Tests: server/test/ and tests/

The server test checks the service data shape. The acceptance checklist records browser checks that need a person to verify them. CI runs the automated tests whenever code is pushed or a pull request is opened.

## First feature from browser to data

```text
React service list
      |
      | GET /api/services
      v
Express route
      |
      v
service-list function
      |
      v
example data in memory
```

The records in server/src/services.js are sample content for the prototype. They are not represented as live links to government transactions. When real service destinations or a database are added, they should be verified and kept on the server side of the API boundary.
