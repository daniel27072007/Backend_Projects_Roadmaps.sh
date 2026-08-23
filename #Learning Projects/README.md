# Learning Projects

A collection of foundational backend utility modules engineered to master core server-side development concepts in Node.js. This repository aggregates structured exercises focused on filesystem communication, text processing pipeline execution, asynchronous programming patterns, and clean modular code sharing architectures.

---

## Technical Challenges Overcame

To complete this learning track successfully, the implementation focused on mastering core backend automation and data serialization concepts:

* **File Handling (Node.js fs module):** Learned how to read, write, and safely modify local database files. Managed file states by checking path availability (`existsSync`) and cleanly destroying unneeded data tracking structures (`fs.unlink`).
* **Asynchronous Programming and Promises:** Mastered asynchronous application flows by wrapping classic node callback structures into modern, stateful Native Promises. Chained functional async operations smoothly using sequential execution blocks (`async/await`, `.then`, `.catch`).
* **JSON Parsing and Data Mutators:** Built custom helper scripts to manage text mutations and database state persistence. Coded validation functions to dynamically parse JSON data payloads, merge distinct object states safely using the spread operator (`...`), and write clean string variations back to disk.
* **Modern JavaScript Modules (ESM & CommonJS):** Configured operational code sharing interfaces across multiple application layers. Practiced routing distinct utility parameters across isolated module formats, implementing standard CommonJS hooks (`require`, `module.exports`) alongside modern ECMAScript module bounds (`import`, `export`).
* **CLI Parameter Capture (process.argv):** Configured text automation modules that capture array parameters straight from the operating system shell environment, checking bounds to prevent empty operations.

---

## Core Competencies Demonstrated

* **Backend Environment Fundamentals:** Mastery of Node.js engine layers, global process structures, execution loops, and native stream operations.
* **Data Serialization and I/O Mechanics:** Practical implementation of file pipelines, variable format mappings, and local text transformations.
* **Clean Code and Modularity:** Decoupling logic patterns by dividing large operational fields into atomic, reusable utility scripts.

---

## Application Features

* **JSON CRUD Helper Suite:** An independent, promise-based helper library capable of executing asynchronous creation, retrieval, updates, and deletion metrics over target text databases.
* **Algorithmic Sub-string Telemetry:** An automated utility script that calculates precise single-character density tracking counters over unstructured text document payloads.
* **Decoupled Math Library:** An isolated mathematical execution grid exporting atomic arithmetic commands cleanly across target module structures.

---

## Installation and Deployment

This repository serves as a localized learning suite running directly inside the native Node.js environment. No third-party package frameworks are required.

### 1. Clone the Repository
Execute the git command inside your terminal (replace with your specific repository URL copied from GitHub):
```bash
git clone https://github.com
```

### 2. Navigate to the Directory
Switch to the project root folder:
```bash
cd "Learning Projects"
```

### 3. Local Execution
You can evaluate each standalone tutorial exercise directly using the Node.js runtime runner inside your terminal:

* **Run JSON database helpers (Tutorial 1 & 2):**
  ```bash
  node Tutorial1/index.js
  node Tutorial2/index.js
  ```
* **Run Modular Math functions (Tutorial 3):**
  ```bash
  node Tutorial3/index.js
  ```
* **Run character density calculator (Tutorial 4 - requires a target character and a text path argument):**
  ```bash
  node Tutorial4/index.js "a" "Tutorial4/text.txt"
  ```

---

## Author

Developed by **Daniel Belculfine**

* **LinkedIn:** [Daniel Belculfine](https://www.linkedin.com/in/daniel-belculfine-2905253b3/)
* **GitHub:** [Daniel27072007](https://github.com/daniel27072007)
* **Roadmap.sh:** [dbelculfine](https://roadmap.sh/u/dbelculfine)