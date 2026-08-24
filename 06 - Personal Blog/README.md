# Personal Blog Platform

A full-stack content management platform engineered using Node.js, Express, and EJS Server-Side Rendering (SSR). This system features automated server-side authentication gates, a flat-file database abstraction layer, modular data-mutation middleware, and responsive view layouts to host and administer content safely.

---

## Technical Challenges Overcame

To complete this specific Roadmap.sh project requirements, the implementation focused on mastering server security controls, backend file-locking pipelines, formatting hooks, and server-side view composition:

* **HTTP Basic Authentication Engineering:** Developed a secure server gatekeeper middleware (`basicAutentication`) protecting administration views. The system parses structural network request headers (`req.headers.authorization`), isolates credentials using Node.js data buffer utilities (`Buffer.from`), and enforces authorization challenges asynchronously.
* **Declarative CRUD Database Abstraction:** Engineered an isolated database engine utility (`jsonFunctions.js`) using native Node.js filesystem modules to manage state data pipelines. The system coordinates file reads and write loops (`fs.readFileSync`, `fs.writeFileSync`), incorporating array mutators (`.map`, `.filter`, `.reduce`) to handle safe data operations without query dropouts.
* **Internationalized Time and Date Normalization:** Mastered textual metadata mutation streams by deploying the native formatting API (`Intl.DateTimeFormat`). The backend intercepts machine-readable timestamps and normalizes layout properties safely into precise, clean strings within the engine workflow.
* **Server-Side View Templating & Form Architecture:** Structured an interactive, multi-view presentation context layout using EJS layout frameworks. Configured URL parameter capture hooks (`req.params.id`) alongside body parsing engines (`req.body`) to route post properties seamlessly into targeted layout fields.

---

## Core Competencies Demonstrated

* **Backend Environment Structuring:** Separating code dependencies across specialized modules, separating server routing engines (`index.js`), data schemas (`data/`), operational utility scripts (`functions/`), and template views (`views/`).
* **Server-Side Render Engine Management:** Handling dynamic layout parameters, passing localized formatting helpers directly to views, and embedding conditional execution loops natively inside layout sheets.
* **Defensive Software Engineering:** Designing runtime middleware walls to reject unverified user connections and protect secure system endpoints.

---

## Application Features

* **Secure Administration Dashboard:** An isolated backend management workspace enabling administrators to review records, initiate updates, or completely purge articles.
* **Dynamic Content Routing Engine:** Automated parameter tracking pipelines routing incoming requests into custom article layouts.
* **Full Article Mutator Pipelines:** Polished form modules mapping and updating database keys securely upon capturing input request payloads.

---

## Installation and Deployment

This application utilizes third-party library dependencies managed by the Node Package Manager (`npm`).

### 1. Clone the Repository
Execute the git command inside your terminal:
```bash
git clone https://github.com
```

### 2. Navigate to the Directory
Switch to the project root folder:
```bash
cd "06 - Personal Blog"
```

### 3. Restore Application Dependencies
Install the required execution packages (`express` and `ejs`) configured inside the project manifest:
```bash
npm install
```

### 4. Local Server Execution
Launch the local Express development server environment by executing the node runner:
```bash
node index.js
```
Open your browser and access the application entry path: `http://localhost:3000/home`.

---

## Author

Developed by **Daniel Belculfine**

* **LinkedIn:** [Daniel Belculfine](https://www.linkedin.com/in/daniel-belculfine-2905253b3/)
* **GitHub:** [Daniel27072007](https://github.com/daniel27072007)
* **Roadmap.sh:** [dbelculfine](https://roadmap.sh/u/dbelculfine)