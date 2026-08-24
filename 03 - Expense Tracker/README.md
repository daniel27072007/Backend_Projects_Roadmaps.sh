# Expense Tracker CLI

A lightweight, robust command-line application engineered to manage and monitor personal financial transactions through local file persistence. Built on Node.js using third-party argument parsing infrastructure, this tool features automated budget thresholds, category filtering, and direct CSV sheet generation to handle full financial asset tracking straight from the system shell.

---

## Technical Challenges Overcame

To complete this specific Roadmap.sh project requirements, the implementation focused on mastering structured data format parsing, external command libraries, and temporal telemetry comparisons:

* **Command-Line Subsystems Integration (Commander package):** Leveraged the `commander` library to construct a polished, developer-friendly interface framework. Configured nested flags, strict option validation bounds (`--category`, `--amount`), and action lifecycle handlers, eliminating the need to parse manual text stream indexes.
* **Multi-File Persistence Infrastructure:** Coordinated data mappings across independent offline storage channels (`data.json` and `buggetData.json`). Engineered logic to evaluate path histories via synchronous native filesystem wrappers, enabling standalone updates over separate business tracking matrices concurrently.
* **Cross-Format Data Serialization (JSON to CSV Engine):** Programmed a custom analytical export pipeline capable of mapping object arrays straight into plain-text structural spreadsheets (`data.csv`). The algorithm extracts header tokens programmatically (`Object.keys`) and converts nested values smoothly into uniform comma-separated rows.
* **Temporal Financial Calculations & Warnings:** Engineered calculation loops tracking aggregated cash outflows across dynamic monthly timeframes. By isolating raw date fragments (`getUTCMonth`), the system performs comparison loops against active thresholds, triggering high-contrast boundary warning summaries immediately inside the active terminal viewport.

---

## Core Competencies Demonstrated

* **Production CLI Component Design:** Practical knowledge building scalable shell management systems using standard developer flag conventions (`-d`, `-a`, `-m`).
* **Financial Data Management:** Competence parsing numerical transactions, validating baseline value errors, and tracking continuous relational database properties.
* **Asynchronous Package Execution:** Integrating community-driven tools through Node Package Manager (`package.json`) while maintaining modular code boundaries.

---

## Application Features

* **Full Transaction Lifecycle Matrix:** Command chains permitting developers to register outlays, overwrite descriptions by identifier indexes, or purge invalid expense entries.
* **Targeted Console Matrix Visualizer:** Leverages structured console tools (`console.table`) to output ledger records fluidly, with specialized category-specific grid filters.
* **Proactive Budget Defense Engine:** Automated system check scripts alerting users immediately if their aggregate transactions overrule their configured monthly allowances.
* **Spreadsheet Export Utility:** Conversational layout tool formatting transaction models instantly into clean `.csv` schemas for seamless loading into Excel.

---

## Installation and Deployment

This application utilizes third-party library dependencies managed by the Node Package Manager (`npm`).

### 1. Clone the Repository
Execute the git command inside your terminal (replace with your specific repository URL copied from GitHub):
```bash
git clone https://github.com
```

### 2. Navigate to the Directory
Switch to the project root folder:
```bash
cd "03 - Expense Tracker"
```

### 3. Restore Application Dependencies
Install the required execution packages (`commander`) configured inside the repository manifest:
```bash
npm install
```

### 4. Global Binary Command Linking
Register the executable tool globally into your system shell mapping configurations:
```bash
npm link
```
*Note for Windows users:* If your terminal blocks execution scripts, execute `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` inside a privileged PowerShell terminal, select `Y`, and then run `npm link` again.

### 5. Application Usage
Execute the tracker command directly from any directory line path using standard parameters:

* **Add an outlay with a specific category:**
  ```bash
  expense-tracker add -c "food" -d "Lunch" -a 35.50
  ```
* **Review global transactions inside a formatted console table:**
  ```bash
  expense-tracker list
  expense-tracker list -c "transport"
  ```
* **Establish a localized monthly budget target:**
  ```bash
  expense-tracker bugget -m 8 -a 2000.00
  ```
* **Verify monthly transaction aggregates:**
  ```bash
  expense-tracker summary -m 8
  ```
* **Export records to an analytics sheet:**
  ```bash
  expense-tracker csv
  ```

---

## Author

Developed by **Daniel Belculfine**

* **LinkedIn:** [Daniel Belculfine](https://www.linkedin.com/in/daniel-belculfine-2905253b3/)
* **GitHub:** [Daniel27072007](https://github.com/daniel27072007)
* **Roadmap.sh:** [dbelculfine](https://roadmap.sh/u/dbelculfine)