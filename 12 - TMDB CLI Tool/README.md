# TMDB CLI Tool

This repository contains a Command Line Interface (CLI) developed in Node.js designed to fetch and display movies based on specific categories from The Movie Database (TMDB) API. The project was built from scratch following the functional specifications and guidelines provided by the roadmap.sh project community (https://roadmap.sh).

The main purpose of developing this application was to study and apply fundamental concepts of building terminal-based tools, handling command-line arguments, communicating with external REST APIs, managing environment variables securely, and implementing robust error handling.

---

## Technical Learnings and Implemented Solutions

The development of this project provided significant practice with key backend and CLI software components, which were structured as follows:

### 1. Advanced CLI Parsing and Validation
* **Structured Commands:** Integrated Commander.js to structure the tool, automatically managing flags, required options, and generating comprehensive `--help` screens.
* **Input Pre-validation:** Developed dynamic input validation layers to check the chosen category and block execution before reaching remote servers if parameters fail constraints.

### 2. Category Conversions and Dynamic Query Building
* **Endpoint Normalization:** Created helper utilities to map simple CLI-friendly terms (`playing`, `top`) into valid TMDB API endpoint parameters (`now_playing`, `top_rated`).
* **URL Template Assembly:** Integrated robust string template mechanisms to build dynamic HTTP search paths targeted at the TMDB REST interface.

### 3. API Communication and Resilience
* **Strict Header Configuration:** Configured mandatory application identification headers (`User-Agent`), payload formatting tokens (`accept`), and secure authentication layers.
* **Environment Variable Isolation:** Solved credential exposure risks by implementing `dotenv` to inject the TMDB Read Access Token directly into application runtimes via `process.env`.
* **Rate Limit and Error Interception:** Designed advanced check layers to catch specific HTTP status exceptions (such as `403 Forbidden` or `401 Unauthorized`) and present descriptive error logs in the console.

---

## Project Structure

```text
TMDB CLI Tool
├── src
│   ├── function.js           # Helper utilities for category endpoint conversions
│   └── index.js              # Entry point, Commander setup, env configuration, and fetch routine
├── .env                      # Local environment configuration file for secure API credentials
├── .gitignore                # Rules to prevent committing local dependencies and secrets
├── package.json              # Script shortcuts, global binary definitions, and dependencies
└── README.md
```

---

## CLI Specification

### Command Interface

* **tmdb-app --type <category>**
  * Connects to the upstream server and outputs a structured list of movies belonging to the requested category.
  * **Flags:**
    * `-t, --type <category>` -> **(Required)** Category filter constraint. Options: `playing`, `popular`, `top`, `upcoming`.

---

## Application Usage and Examples

To run and consume the application workflows locally within your terminal environment, execute the systematic sequences below:

### Phase 1: Standard Category Search
```bash
tmdb-app --type popular
```
*The application returns a clean array of objects containing the current popular movies fetched directly from the TMDB backend servers.*

### Phase 2: Customized Context Query
```bash
tmdb-app --type top
```
*The command maps the "top" input to the "top_rated" endpoint dynamically, queries the server, and lists the highest-rated movies with numbers formatted to two decimal places.*

### Phase 3: Inspecting System Parameters
```bash
tmdb-app --help
```
*Outputs the automatically generated developer interface summary, documenting usage instructions, description, and required flag parameters.*

---

## Installation and Configuration

### Prerequisites
* Node.js runtime environment (version 18 or later)

### Setup Steps

1. Navigate to the project root directory:
```bash
cd "TMDB CLI Tool"
```

2. Download project dependencies:
```bash
npm install
```

3. Configure your credentials:
Create a file named `.env` in the root folder of the project and add your TMDB Token:
```env
TMDB_ACESS_TOKEN=Bearer SEU_TOKEN_AQUI
```

4. Link the package globally to your system:
```bash
npm link
```
*This step establishes symbolic linking paths across your operating system, allowing you to evoke the `tmdb-app` command from any terminal instance.*

5. Execute the command:
```bash
tmdb-app --type playing
```