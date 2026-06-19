# Task Tracker CLI

A simple Command Line Interface (CLI) tool to manage and track your daily tasks. Built using pure Node.js without any external libraries or frameworks, strictly adhering to the project requirements from roadmap.sh.

---

## Installation and Setup

Follow these steps to download and configure the project on your local machine:

### 1. Prerequisites
Ensure you have Node.js installed on your computer. You can check your version by running the following command in your terminal:
```bash
node -v
```

### 2. Download the Project
Clone this repository from GitHub or download the source code as a ZIP file:
```bash
git clone https://github.com
```
If you downloaded the ZIP file, extract the contents into a folder of your choice.

### 3. Navigate to the Project Directory
Open your terminal and change your current directory to the project folder:
```bash
cd "Path/To/Your/Task Tracker CLI"
```

### 4. Link the Command Globally
To use the short `task-cli` command anywhere in your terminal instead of running `node index.js`, execute:
```bash
npm link
```
Note for Windows (PowerShell) users: If you encounter a script execution security error, open PowerShell as an Administrator, run `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`, type `Y`, and then try running `npm link` again inside your project terminal.

---

## Usage

Once the command is linked, you can manage your tasks by executing the following commands directly in your terminal:

### Add a New Task
Creates a new task with a default status of "todo":
```bash
task-cli add "Buy groceries"
```
Output example: `Task added successfully (ID: 1)`

### Update a Task Description
Modifies the description text of an existing task using its ID:
```bash
task-cli update 1 "Buy groceries and cook dinner"
```

### Delete a Task
Permanently removes a task from your storage file by its ID:
```bash
task-cli delete 1
```

### Change Task Status
You can update the progress tracking state of any task using its ID:
```bash
# Mark a task as in progress
task-cli mark-in-progress 1

# Mark a task as done
task-cli mark-done 1
```

### List Tasks
You can view all your saved tasks or filter them based on their current status:
```bash
# List all tasks
task-cli list

# List only tasks that have not been started
task-cli list todo

# List only tasks currently in progress
task-cli list in-progress

# List only completed tasks
task-cli list done
```

---

## Data Structure

Your tasks are automatically saved inside a file named `tasks.json` in the root directory of the project, using the following schema:

```json
[
  {
    "id": 1,
    "description": "Buy groceries",
    "status": "todo",
    "createdAt": "2026-06-18T21:36:46.792Z",
    "updatedAt": "2026-06-18T21:40:12.350Z"
  }
]
```

---

## License
This project is open-source and available for educational and practice purposes.