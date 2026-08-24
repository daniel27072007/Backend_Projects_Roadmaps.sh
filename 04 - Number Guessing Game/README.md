# Number Guessing Game CLI

A native terminal-based algorithmic guessing game built with Node.js using advanced shell scripting and data persistence libraries. This application handles user interactions directly through low-level input-output buffers, tracking and recording gaming telemetry to build persistent local highscore grids.

---

## Technical Challenges Overcame

To complete this specific Roadmap.sh project requirements, the implementation focused on mastering text parsing tools, performance metrics, array mapping, and native memory streaming parameters:

* **Synchronous CLI Stream Capturing (Buffer allocation):** Engineered a custom input engine to read text from standard operating system pipelines (`process.stdin`) without depending on external interaction utilities. The script reads raw keyboard interactions by allocating custom hardware memory buffers (`Buffer.alloc(1024)`) and converting baseline bytes directly into sanitized strings via synchronous loops (`fs.readSync`).
* **Command Routing and Flag Controls (Commander package):** Integrated the `commander` interface suite to implement clean terminal commands (`play`, `highscore`). Structured option layers allowing users to sort output grids by specific execution keys (`--dificulty`, `--highscore`), managing application entry bounds gracefully.
* **Algorithmic Hint Generation:** Developed an analytical math engine tracking target numbers dynamically to populate data hints on the fly. The engine evaluates mathematical conditions—validating prime numbers, arithmetic multiples, absolute coordinate differences (`Math.abs`), and array splits—supplying distinct visual guidance items via randomized index pickers.
* **Telemetry Performance Instrumentation:** Implemented exact timing tracks over terminal lifecycles using advanced precision metrics APIs (`performance.now`). The workflow captures application processing metrics, maps values to local score lists (`UserScore.json`), and evaluates records through complex array ordering routines (`.sort`).

---

## Core Competencies Demonstrated

* **Low-Level Native Stream Management:** Managing operational buffer allocation parameters, synchronous console inputs, and native shell execution logs.
* **Data Structuring and Analytics:** Structuring local data repositories, verifying path states, and executing compound sorting configurations inside memory arrays.
* **Game Loop Orchestration:** Coding interactive terminal flows driven by linear conditional trees (`while`, `do-while`, `switch`).

---

## Application Features

* **Multi-Tier Difficulty Grid:** Three distinct execution levels (Easy, Medium, Hard) that constrain user choices and attempt margins dynamically.
* **Randomized Clue Pipeline:** Dynamic text generators providing mathematical clues (Odd/Even, Prime status, Digit aggregates) to guide user choices.
* **Persistent Telemetry Ranking Board:** An analytical metric tracker generating highscore logs formatted inside structured console grids (`console.table`).

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
cd "04 - Number Guessing Game"
```

### 3. Restore Application Dependencies
Install the required development packages (`commander`) configured inside the repository manifest:
```bash
npm install
```

### 4. Global Binary Command Linking
Link the script framework globally into your system shell configurations to access short executable commands:
```bash
npm link
```
*Note for Windows users:* If your terminal blocks custom automation scripts, open a privileged PowerShell channel, run `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`, select `Y`, and then execute the linking command again.

### 5. Application Usage
Execute the linked command utility straight from any terminal viewport path:

* **Initiate an interactive game loop session:**
  ```bash
  number-game play
  ```
* **Review leaderboard logs filtered by fastest execution time:**
  ```bash
  number-game highscore -h time
  ```
* **Filter leaderboard history strictly by fewer attempt columns:**
  ```bash
  number-game highscore -d Easy -h attempts
  ```

---

## Author

Developed by **Daniel Belculfine**

* **LinkedIn:** [Daniel Belculfine](https://www.linkedin.com/in/daniel-belculfine-2905253b3/)
* **GitHub:** [Daniel27072007](https://github.com/daniel27072007)
* **Roadmap.sh:** [dbelculfine](https://roadmap.sh/u/dbelculfine)