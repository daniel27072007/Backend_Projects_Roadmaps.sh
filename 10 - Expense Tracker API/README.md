# Expense Tracker API

A full-stack backend application engineered using Node.js, Express, and MongoDB with Mongoose ODM for financial tracking operations. This system features decoupled multi-layered route configurations, asynchronous object validation mapping, dual-token access management (JWT & Refresh tokens), transactional linear request-throttling gates, and regional data normalization helpers.

---

## Technical Challenges Overcame

To complete this specific Roadmap.sh project requirements, the implementation focused on mastering structural folder separations, compound security interceptors, temporal data windowing, and predictive system boundary validations:

* **Asynchronous Architecture Separation:** Decoupled monolithic server components by refactoring core modules into standard specialized sub-directories (`/config`, `/controllers`, `/middlewares`, `/models`, `/routes`, `/utils`). The main execution instance (`server.js`) delegates server bindings and state initializations asynchronously, avoiding runtime process blockages.
* **Granular Traffic Control Integration:** Engineered custom security filters by chaining connection capacity bounds (`express-rate-limit`) directly with progressive timeout engines (`express-slow-down`). Authentication modules monitor specific target spaces (`/register`, `/login`), while transactional routes enforce independent, adaptive processing delays to reject heavy bot bursts seamlessly.
* **Dynamic Time-Window Filtering:** Implemented programmatic date tracking logic inside retrieval controllers to scope database reads automatically. The wrapper parses discrete temporal queries (`pastWeek`, `pastMonth`, `last3Months`), matches structured user bounds natively via MongoDB index properties (`$gte`, `$lte`), and normalizes document objects into Portuguese standard timestamps (`pt-BR`).
* **Relational Identity Scoping Controls:** Structured atomic owner evaluation hooks on mutations to avoid Cross-User context leaking. When handling data updates (`/expenses/:id`), the handler intercepts model keys, evaluates relational data mappings securely (`data.authorId !== req.userId`), and enforces strict resource isolation boundaries prior to update commits.

---

## Core Competencies Demonstrated

* **Backend Architecture Design:** Organizing multi-layer script separations, managing unified collection entry pipelines (`src/app.js`), isolating instance adapters (`src/config/database.js`), and handling global runtime exceptions.
* **Cryptographic Identity Management:** Enforcing credentials encryption loops (`bcrypt`), deploying temporary access payloads, committing structural token states, and managing total session destructions on user termination paths.
* **Defensive Software Engineering:** Shielding write paths from heavy payloads, deploying system enums to restrict invalid categories, and designing independent mock-data controller validation files (`authController.test.js`).

---

## Application Features

* **Secure Expense Management Service:** An isolated personal workspace validating numeric limits and tracking categories (Groceries, Leisure, Electronics, Utilities, Clothing, Health, Others).
* **Multi-Tiered Session Gateway:** An identification manager handling account registration, automated access renewal tokens, and server-side device logouts.
* **Paginated Metric Scanner Engine:** A high-utility data gateway featuring metadata totals, custom limit restrictions, text filtering, and custom date range processing.

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
cd "10 - Expense Tracker API"
```

### 3. Restore Application Dependencies
Install the required execution and development packages configured inside the project manifest:
```bash
npm install
```

### 4. Local Server Execution
Launch the local Express development server environment by executing the node runner:
```bash
node server.js
```
Open your API testing tool or browser and access the application path: `http://localhost:3000/expenses`.

---

## Author

Developed by **Daniel Belculfine**

* **LinkedIn:** [Daniel Belculfine](https://www.linkedin.com/in/daniel-belculfine-2905253b3/)
* **GitHub:** [Daniel27072007](https://github.com/daniel27072007)
* **Roadmap.sh:** [dbelculfine](https://roadmap.sh/u/dbelculfine)