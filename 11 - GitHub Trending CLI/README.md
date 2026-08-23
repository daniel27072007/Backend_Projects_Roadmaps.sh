# GitHub Trending CLI

This repository contains a Command Line Interface (CLI) developed in Node.js designed to fetch and display trending GitHub repositories. The project was built from scratch following the functional specifications and guidelines provided by the roadmap.sh project community (https://roadmap.sh).

The main purpose of developing this application was to study and apply fundamental concepts of building terminal-based tools, handling command-line arguments, communicating with external REST APIs, and implementing robust error handling.

---

## Technical Learnings and Implemented Solutions

The development of this project provided significant practice with key backend and CLI software components, which were structured as follows:

### 1. Advanced CLI Parsing and Validation
* **Structured Commands:** Integrated Commander.js to structure the tool, automatically managing flags, parameters, and generating comprehensive `--help` screens.
* **Input Pre-validation:** Developed dynamic input validation layers to block execution and save network bandwidth if parameters like custom limits or durations fail constraints before reaching remote servers.

### 2. Temporal Filters and Dynamic Query Building
* **Calendar Subtraction:** Created dynamic date calculation logic to support complex sliding windows (`day`, `week`, `month`, `year`) using native JavaScript Date mutations.
* **URL Template Assembly:** Integrated robust string isolation mechanisms and endpoint components to build dynamic HTTP search parameters targeted at the GitHub REST interface.

### 3. API Communication and Resilience
* **Strict Header Configuration:** Solved request rejection behaviors from remote firewalls by configuring mandatory application identification headers (`User-Agent`).
* **Rate Limit Interception:** Designed advanced check layers to catch specific HTTP status exceptions (such as `403 Forbidden`) and present descriptive instructions when hitting public request ceilings.

---

## Project Structure

```text
GitHub Trending CLI
├── src
│   ├── utils
│   │   └── functions.js      # Helper utilities for date conversions and string mutations
│   └── index.js              # Entry point, Commander setup, and main fetch routine
├── .env.example              # Template configuration for tokens or environment flags
├── package.json              # Script shortcuts and project dependency definitions
└── README.md
```

---

## CLI Specification

### Command Interface

* **github-trending hello**
  * Outputs a standard check validation phrase to confirm CLI execution context.

* **github-trending trending-repos [options]**
  * Connects to the upstream server and outputs a human-readable list of trending software repositories.
  * **Flags:**
    * `-d, --duration <period>` -> Time window filter constraint. Options: `day`, `week`, `month`, `year`. (Default: `week`).
    * `-l, --limit <count>`     -> Number of records to return. Max: `100`. (Default: `10`).

---

## Application Usage and Examples

To run and consume the application workflows locally within your terminal environment, execute the systematic sequences below:

### Phase 1: Standard Search
```bash
github-trending trending-repos
```
*The application returns the default top 10 repositories updated during the past week, formatted cleanly inside the terminal stack.*

### Phase 2: Customized Context Query
```bash
github-trending trending-repos --duration month --limit 5
```
*The command calculates the date boundary for 30 days prior, updates the underlying query parameters dynamically, and lists exactly the top 5 projects found.*

### Phase 3: Inspecting System Parameters
```bash
github-trending --help
```
*Outputs the automatically generated developer interface summary, documenting usage instructions, commands, and flag requirements.*

---

## Installation and Configuration

### Prerequisites
* Node.js runtime environment (version 18 or later)

### Setup Steps

1. Clone the project repository:
```bash
git clone https://github.com
cd github-trending-cli
```

2. Download project dependencies:
```bash
npm install
```

3. Link the package globally to your system:
```bash
npm link
```
*This step establishes symbolic linking paths across your operating system, allowing you to evoke the `github-trending` command from any terminal instance.*

4. Execute the command:
```bash
github-trending trending-repos
```
