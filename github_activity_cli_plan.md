# Project Roadmap: GitHub User Activity CLI

A modular, task-driven roadmap for building a command-line interface (CLI) to fetch and display recent GitHub user activity using only native standard libraries.

---

## Agile Backlog Overview

| Epic | Description | User Stories | Tasks |
| :--- | :--- | :---: | :---: |
| **EPIC 1** | CLI Environment & Argument Parsing | 1 | 4 |
| **EPIC 2** | GitHub API Integration | 1 | 4 |
| **EPIC 3** | Event Parsing & Terminal Output | 1 | 5 |
| **EPIC 4** | Error Handling & Edge Cases | 1 | 4 |

---

## EPIC 1: CLI Environment & Argument Parsing

> **Goal:** Set up the project foundation and handle command-line execution without third-party libraries.

### US-01: Command Line Argument Processing
**As a** terminal user  
**I want to** pass a GitHub username as a command-line argument  
**So that** the application knows which user's activity to retrieve.

#### Micro-Tasks:
- [x] **TASK-1.1**: Initialize project repository structure and select runtime environment (Node.js).
- [x] **TASK-1.2**: Implement entry point script execution mechanism (`github-activity` executable / bin wrapper).
- [x] **TASK-1.3**: Extract `<username>` from standard CLI input parameters (e.g., `process.argv` / `sys.argv`).
- [x] **TASK-1.4**: Add parameter validation. Display proper usage instructions (`Usage: github-activity <username>`) and exit gracefully with status code `1` if the argument is missing.

---

## EPIC 2: GitHub API Integration

> **Goal:** Fetch user activity data directly using native standard library HTTP utilities.

### US-02: Native GitHub API Request Execution
**As a** CLI application  
**I want to** query the GitHub Events API using built-in standard libraries  
**So that** I retrieve raw activity data without external dependencies (e.g., `axios`, `requests`).

#### Micro-Tasks:
- [ ] **TASK-2.1**: Implement HTTP GET client wrapper using standard library networking modules (`https` in Node.js, `urllib.request` in Python, or `net/http` in Go).
- [ ] **TASK-2.2**: Configure required HTTP request headers, specifically setting a custom `User-Agent` string (required by GitHub API guidelines).
- [ ] **TASK-2.3**: Construct the dynamic request endpoint: `https://api.github.com/users/<username>/events`.
- [ ] **TASK-2.4**: Buffer and parse incoming stream response into native JSON data structures.

---

## EPIC 3: Event Parsing & Terminal Output

> **Goal:** Transform raw JSON event objects into clean, readable command-line text logs.

### US-03: Event Formatting and Presentation
**As a** user  
**I want to** view a clear summary of recent GitHub actions formatted as human-readable terminal text  
**So that** I can easily digest user activity logs.

#### Micro-Tasks:
- [ ] **TASK-3.1**: Implement event parser for `PushEvent` — extract commit count and target repository (`Pushed X commits to <repo>`).
- [ ] **TASK-3.2**: Implement event parser for `IssuesEvent` — identify action state (`Opened`, `Closed`, `Reopened`) and target repository.
- [ ] **TASK-3.3**: Implement event parser for `WatchEvent` (`Starred <repo>`) and `PullRequestEvent` (`Opened pull request in <repo>`).
- [ ] **TASK-3.4**: Implement a generic fallback event formatter for unhandled event types (e.g., `ForkEvent`, `CreateEvent`) to prevent execution failures on rare event types.
- [ ] **TASK-3.5**: Print all parsed log items sequentially to `stdout`.

---

## EPIC 4: Error Handling & Edge Cases

> **Goal:** Ensure the application handles failure states gracefully without uncaught exceptions or raw tracebacks.

### US-04: Robust Error Management
**As a** user  
**I want to** receive clear, actionable error messages when operations fail  
**So that** I understand why data could not be displayed.

#### Micro-Tasks:
- [ ] **TASK-4.1**: Detect `HTTP 404 Not Found` response and output user-friendly message (`Error: User '<username>' not found.`).
- [ ] **TASK-4.2**: Handle rate-limiting status codes (`HTTP 403` / `HTTP 429`) and notify the user about API quota exhaustion.
- [ ] **TASK-4.3**: Catch network-level failures (DNS resolution failure, timeout, offline connection) and render a clean terminal error message.
- [ ] **TASK-4.4**: Handle empty API payload responses (when the user exists but has no public event history in the last 90 days).

---

## Technical Constraints Checklist
- [x] Zero third-party dependencies (`npm`, `pip`, `cargo` external crates prohibited for API fetching).
- [x] Must accept argument: `github-activity <username>`.
- [x] Must set `User-Agent` header in API requests.
- [x] Output formatted human-readable output matching prompt specifications.
