# GitHub User Activity CLI

A performance-focused command-line interface (CLI) application engineered to fetch and display real-time public GitHub event streams directly inside the terminal viewport. Built strictly using vanilla Node.js, this application consumes external REST APIs over secure networks and streams binary packet payloads into memory data grids without leveraging third-party HTTP client libraries.

---

## Technical Challenges Overcame

To complete this specific Roadmap.sh project requirements, the implementation focused on mastering core asynchronous networking, chunked stream consumption, and structural text normalization:

* **API Consumption (Node.js https module):** Mastered network communication routines using native network modules (`https.get`). Connected directly to the GitHub Events REST API infrastructure while enforcing necessary security guidelines by injecting specialized headers (`User-Agent`) straight into the outgoing connection channel.
* **Chunked Data Stream Processing:** Solved potential memory execution drops from asynchronous data fragmentation by implementing event-driven data packet listeners (`response.on('data')`). The engine systematically aggregates inbound raw buffer segments into a unified memory variable block before triggering the final parsing loop (`response.on('end')`).
* **Defensive HTTP Status Validation:** Engineered strict validation barriers to catch server issues cleanly during the connection phase. The application intercepts 404 responses immediately to notify the user of non-existent profiles, and checks status rules globally to halt data routines safely if external servers return server failure alerts.
* **Dynamic JSON Structuring & Parsing:** Coded an automated filtering pipeline that maps complex nested response arrays into specific, readable strings. The logic safely parses object graphs using optional chaining operators (`element.payload?.action`) and handles text transformations to standardize event output patterns.

---

## Core Competencies Demonstrated

* **Network Engineering Fundamentals:** Comprehensive mastery of native HTTP/HTTPS application communication layers, server header declarations, and chunked response tracking.
* **Event-Driven JavaScript Programming:** Utilizing runtime hooks to coordinate network states, catch buffer streams, and manage unexpected parsing exceptions using robust error boundaries.
* **Executable Terminal Tool Deployment:** Mapping package binaries (`bin` properties inside `package.json`) to register standalone script operations globally across system shell matrices.

---

## Application Features

* **Real-time Activity Telemetry:** Consumes official cloud data maps to trace public developer milestones, detailing active repositories dynamically.
* **Granular Multi-Event Filters:** Targeted filtering routines sorting and logging distinct action properties like `PushEvent`, `WatchEvent` (stars), and contextual metadata modifications inside `IssuesEvent`.
* **Resilient Network Safety Defenses:** Integrated exception checks handling missing parameter arguments, incorrect account names, or unexpected remote server drops gracefully inside the viewport.

---

## Installation and Deployment

This application operates completely as a command-line interface utilizing the native Node.js environment. No third-party network libraries or server configuration steps are required.

### 1. Clone the Repository
Execute the git command inside your terminal (replace with your specific repository URL copied from GitHub):
```bash
git clone https://github.com
```

### 2. Navigate to the Directory
Switch to the project root folder:
```bash
cd github-user-activity
```

### 3. Global Command Linking
This package handles explicit routing paths allowing you to bind the utility engine globally. Run this command inside your project terminal:
```bash
npm link
```
*Note for Windows users:* If your shell profile prevents custom script execution, launch PowerShell as an Administrator once, run `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`, select `Y`, and then execute the command link again.

### 4. Application Usage
Once linked globally, trigger the utility tool directly from any directory line path by passing a valid username:

* **Fetch activity via the global link command:**
  ```bash
  github-activity daniel27072007
  ```
* **Alternatively, run the script directly using the runtime runner:**
  ```bash
  node index.js torvalds
  ```

---

## Author

Developed by **Daniel Belculfine**

* **LinkedIn:** [Daniel Belculfine](https://www.linkedin.com/in/daniel-belculfine-2905253b3/)
* **GitHub:** [Daniel27072007](https://github.com/daniel27072007)
* **Roadmap.sh:** [dbelculfine](https://roadmap.sh/u/dbelculfine)