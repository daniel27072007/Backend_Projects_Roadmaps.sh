# Blogging Platform API

A full-stack backend wrapper service engineered using Node.js, Express, and MongoDB with Mongoose ODM for persistent storage. This system features automated rate-limiting protections, a structured database abstraction layer, modular data-validation middleware, and comprehensive error-handling flows to retrieve, modify, and manage article records safely.

---

## Technical Challenges Overcame

To complete this specific Roadmap.sh project requirements, the implementation focused on mastering database engine connections, transactional identifier tracking, schema enforcement policies, and request throttling controls:

* **Persistent Document Database Engineering:** Developed a secure database connection pipeline utilizing a remote MongoDB Atlas cluster. The system establishes connections asynchronously via Object Document Mapping configurations (`mongoose.connect`), managing data schemas natively while encapsulating connection lifecycle drops inside automated exception blocks.
* **Atomic Counter Sequence Pipeline:** Engineered a reliable document auto-increment system leveraging a secondary sequence tracker collection. By hooking directly into Mongoose lifecycle operations (`schemaPOST.pre('save')`), the database initiates atomic operations (`Counter.findOneAndUpdate` with `$inc`) to generate custom, clean, numerical public indices dynamically.
* **Strict Validation and Document Formatting:** Mastered structural schema mutation workflows by crafting customized attribute validation constraints. The engine validates tag payloads to confirm item requirements, processes JSON transformations (`toJSON.transform`) to strip internal MongoDB footprints (`_id`, `__v`), and formats clean structures before responding.
* **API Rate-Limiting Protection:** Engineered a defensive security barrier leveraging express middleware configurations (`express-rate-limit`). The engine monitors connection frequencies within strict windows (`windowMs: 1000`), establishes low-tolerance throttling policies (`limit: 2`), and protects system resources from programmatic brute forcing.

---

## Core Competencies Demonstrated

* **Backend Environment Structuring:** Separating code dependencies across clean files, maintaining core execution scripts (`index.js`), environment specifications (`.env`), tooling properties (`jsconfig.json`), and comprehensive system documentation (`README.md`).
* **Database Lifecycle Management:** Handling persistent connection logic, orchestrating pre-save atomic transaction hooks, manipulating JSON response models, and enforcing custom attribute restrictions.
* **Defensive Software Engineering:** Designing active rate limiters to avoid client service abuse and building descriptive error layers (`ValidationError`) to gracefully reject bad client requests.

---

## Application Features

* **Complete Article CRUD Pipeline:** Polished route maps supporting record ingestion, overwriting, retrieval, and complete purges via dedicated endpoints.
* **Dynamic Query Filtering Gateway:** An active routing layer parsing incoming tag query terms to deliver matched database subsets instantly.
* **Self-Managing Data Modifiers:** Automated schema normalization logic keeping raw collection structures isolated from public-facing JSON keys.

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
cd "08 - Blogging Platform API"
```

### 3. Restore Application Dependencies
Install the required execution packages (`express`, `mongoose`, `express-rate-limit`, and `dotenv`) configured inside the project manifest:
```bash
npm install
```

### 4. Local Server Execution
Launch the local Express development server environment by executing the node runner:
```bash
node index.js
```
Open your API testing tool or browser and access the application path: `http://localhost:3000/posts`.

---

## Author

Developed by **Daniel Belculfine**

* **LinkedIn:** [Daniel Belculfine](https://www.linkedin.com/in/daniel-belculfine-2905253b3/)
* **GitHub:** [Daniel27072007](https://github.com/daniel27072007)
* **Roadmap.sh:** [dbelculfine](https://roadmap.sh/u/dbelculfine)
