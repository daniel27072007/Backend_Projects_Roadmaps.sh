# Task Tracker CLI

A lightweight, native Command Line Interface (CLI) application engineered to track and manage personal to-do lists through persistent local file storage. Built strictly with vanilla JavaScript on the Node.js runtime environment, this tool executes deep CRUD pipelines directly from the terminal prompt using positional shell arguments.

---

## Technical Challenges Overcame

To complete this specific Roadmap.sh project requirements, the implementation focused on mastering core backend system interactions, storage logic, and parameter mapping workflows:

* **File Handling & State Checks (Node.js fs module):** Programmed robust asynchronous file read and synchronous write pipelines using native system tools. Implemented validation hooks to dynamically check data path status (`fs.existsSync`) and gracefully initialize empty collections if the storage file is clean or missing.
* **JSON Parsing and Data Modeling:** Managed offline storage persistence by parsing unstructured text content into live memory arrays and stringifying mutated array snapshots back to the persistent `tasks.json` database layer. Engineered strict object models incorporating continuous index keys alongside auto-generated JavaScript ISO time vectors (`createdAt`, `updatedAt`).
* **CLI Routing (Command-Line Arguments):** Built a custom terminal argument routing engine powered by `process.argv` parsing arrays. Structured multi-branch command handlers using JavaScript switch trees to translate shell triggers (`add`, `update`, `delete`, `mark-*`, `list`) directly into discrete data mutation workflows.
* **Data Stream Filtering & Mutations:** Developed granular array filtration workflows leveraging native array prototypes (`.map` and `.filter`). The logic dynamically strips items matching specialized search keys or remaps targeted field parameters concurrently based on positional ID parameters.

---

## Core Competencies Demonstrated

* **Command Line Interface (CLI) Production:** Practical mastery building standalone console utilities capable of intercepting, parsing, and execution validation loops natively.
* **Persistent Local I/O Storage Management:** Comprehensive handling of reading, writing, updating, and formatting plain-text data layouts securely.
* **System Component Isolation:** Structuring modular backend systems by dividing main interface controllers (`index.js`) completely away from structural helper algorithms (`functions.js`).

---

## Application Features

* **Complete Automated Task CRUD Engine:** Terminal hooks enabling developers to add, update descriptions, delete indices, or list all recorded items natively.
* **Lifecycle State Tracking:** Granular progress identifiers changing specific task fields cleanly between `todo`, `in-progress`, and `done`.
* **Positional Database Filtering:** Advanced view filters capable of returning specific output blocks depending on execution tokens (`task-cli list done`, `todo`, or `in-progress`).

---

## Installation and Deployment

This application operates completely as a global executable backend tool using the native Node.js runtime framework.

### 1. Clone the Repository
Execute the git command inside your terminal (replace with your specific repository URL copied from GitHub):
```bash
git clone https://github.com
```

### 2. Navigate to the Directory
Switch to the project root folder:
```bash
cd task-tracker-cli
```

### 3. Global Binary Registration
This package implements standard configuration maps (`bin` configurations inside `package.json`) allowing you to link the binary utility globally into your system shell environment. Run this command inside your terminal:
```bash
npm link
```
*Note for Windows users:* If your terminal blocks global execution due to security rules, open PowerShell as an Administrator once, execute `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`, press `Y`, and retry linking the script.

### 4. Local CLI Execution
Once linked globally, call the utility script directly by name anywhere inside your console file path:

* **Add a new task:**
  ```bash
  task-cli add "Buy groceries"
  ```
* **Update task description:**
  ```bash
  task-cli update 1 "Buy groceries and cook dinner"
  ```
* **Alter lifecycle tracking states:**
  ```bash
  task-cli mark-in-progress 1
  task-cli mark-done 1
  ```
* **Filter storage collections:**
  ```bash
  task-cli list
  task-cli list in-progress
  ```

---

## Author

Developed by **Daniel Belculfine**

* **LinkedIn:** [Daniel Belculfine](https://www.linkedin.com/in/daniel-belculfine-2905253b3/)
* **GitHub:** [Daniel27072007](https://github.com/daniel27072007)
* **Roadmap.sh:** [dbelculfine](https://roadmap.sh/u/dbelculfine)