# GitHub Activity CLI

A simple command-line interface (CLI) tool to fetch and display the recent public activity of any GitHub user directly in your terminal.

## Prerequisites

Before running this tool, ensure you have Node.js installed on your machine.

* Node.js (v14 or higher recommended)

## Installation

1. Save the script code into a file named `index.js`.
2. Open your terminal and navigate to the directory where the file is saved.
3. Grant execution permissions to the file by running:
   ```bash
   chmod +x index.js
   ```

## Usage

Run the script using Node.js and pass the target GitHub username as an argument:

```bash
node index.js github_username
```

Alternatively, you can run the executable script directly:

```bash
github-activity github_username
```

### Example

```bash
node index.js torvalds
```

Output:
```text
- Pushed to torvalds/linux
- Starred git/git
```

## Tracked Activities

The application listens to the official GitHub Events API and logs the following events:
* **PushEvent**: Commits pushed to a repository.
* **IssuesEvent**: New issues created, closed, or reopened.
* **WatchEvent**: Repositories starred by the user.

## Error Handling

The script includes built-in handling for common edge cases:
* **Missing Username**: Warns you if the username argument is forgotten.
* **404 Not Found**: Detects if the target user profile does not exist on GitHub.
* **Network Failures**: Catches connectivity issues when reaching the GitHub API servers.
