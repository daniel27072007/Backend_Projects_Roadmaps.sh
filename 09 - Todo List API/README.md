# Todo List API

A full-stack backend application engineered using Node.js, Express, and MongoDB with Mongoose ODM for persistent storage. This system features a dual-token authentication pipeline (JWT & Refresh Tokens), automated request throttling, dynamic server-side pagination, regex-based text filtering, and an automated integration testing suite.

---

## Technical Challenges Overcame

To complete this specific Roadmap.sh project requirements, the implementation focused on mastering secure session persistence, dual-layered rate-limiting protection, programmatic database scoping, and end-to-end integration testing:

* **Dual-Token Session Persistence Engine:** Developed a comprehensive user session pipeline utilizing short-lived Access Tokens paired with database-backed Refresh Tokens (`refreshTokenSchema`). The system intercepts refresh requests (`/refresh`), verifies token authenticity asynchronously (`jwt.verify`), and manages session expirations securely via explicit schema constraints.
* **Dual-Layered Request Throttling:** Engineered a highly responsive API protective barrier by combining request counting thresholds (`express-rate-limit`) with linear delay injection hooks (`express-slow-down`). The backend automatically skips restrictions within isolated target evaluation contexts (`process.env.NODE_ENV === 'test'`) to guarantee smooth testing flows.
* **Server-Side Pagination and Filter Scoping:** Structured an advanced record retrieval layout using mathematical offsets and regex-based searching utilities. The handler parses numeric limits and query boundaries (`req.query.page`, `req.query.limit`), counts subsets natively (`countDocuments`), and normalizes machine-readable date strings into regional representations.
* **Automated Integration Testing Framework:** Architected an isolated integration evaluation environment running automated test runner pipelines (`jest` and `supertest`). The suite manages test database lifecycle hooks (`beforeAll`, `afterAll`), dynamically tracks active dummy assets, and tests application constraints against dozens of real REST API scenarios.

---

## Core Competencies Demonstrated

* **Backend Environment Structuring:** Separating code dependencies across structured folders, isolating utility methods (`utils/`), integration test files (`tests/`), environment variables (`.env`), transpiler rules (`.babelrc`), and code quality maps (`tsconfig.json`).
* **Session Security Architecture:** Implementing cryptographic hashing routines (`bcrypt`), signing custom authorization layers, establishing token authentication gates, and isolating cross-user manipulation requests.
* **Defensive Software Engineering:** Designing combined endpoint delays to counter automated denial attacks and writing strict parameter schema guard rails to reject non-numeric request indices.

---

## Application Features

* **Secure Authentication & Session Gate:** A decoupled user profile module offering hashed credentials, protected endpoints, and structured session invalidation paths.
* **Paginated Record Finder Utility:** A high-utility data gateway featuring metadata totals, max limit protections, descending/ascending chronological sorts, and partial text filters.
* **Self-Validating Data Transformers:** Automated schema lifecycle helpers extracting only target response keys while converting execution properties into local timestamps.

---

## Installation and Deployment

This application utilizes third-party library dependencies managed by the Node Package Manager (`npm`).

### 1. Clone the Repository
To clone this repository, simply copy the URL directly from your browser's address bar while viewing this project folder, and execute the git command in your terminal:
```bash
git clone <REPOSITORY_FOLDER_URL>
```

### 2. Navigate to the Directory
Switch to the project root folder:
```bash
cd "09 - Todo List API"
```

### 3. Restore Application Dependencies
Install the required execution and development packages configured inside the project manifest:
```bash
npm install
```

### 4. Run Automated Test Suites
Execute the integrated Jest testing runner pipeline to verify application health across all endpoints:
```bash
npm test
```

### 5. Local Server Execution
Launch the local Express development server environment by executing the node runner:
```bash
node index.js
```
Open your API testing tool or browser and access the authenticated endpoint path: `http://localhost:3000/todos`.

---

## Author

Developed by **Daniel Belculfine**

* **LinkedIn:** [Daniel Belculfine](https://www.linkedin.com/in/daniel-belculfine-2905253b3/)
* **GitHub:** [Daniel27072007](https://github.com/daniel27072007)
* **Roadmap.sh:** [dbelculfine](https://roadmap.sh/u/dbelculfine)