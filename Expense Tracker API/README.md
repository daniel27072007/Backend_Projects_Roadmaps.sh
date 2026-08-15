# Expense Tracker API

This repository contains a RESTful API developed in Node.js designed for personal expense tracking. The project was built from scratch following the functional specifications and guidelines provided by the roadmap.sh project community (https://roadmap.sh).

The main purpose of developing this application was to study and apply fundamental concepts of backend architecture, database modeling, secure session handling, data sanitization, and automated unit testing in a controlled environment.

---

## Technical Learnings and Implemented Solutions

The development of this project provided significant practice with key backend components, which were structured as follows:

### 1. Authentication and Session Lifecycle Control
* **Token Separation:** Implemented a split-token mechanism utilizing short-lived Access Tokens for route authentication alongside Database-persisted Refresh Tokens to handle session renewals securely.
* **Session Termination:** Developed a manual database cleanup during the logout flow to ensure that revoked tokens cannot be reused, practicing secure session invalidation.
* **Data Protection:** Integrated password hashing via bcrypt before database storage to learn industry standards for credential management.

### 2. Request Regulation and Security Middlewares
* **Rate Limiting:** Implemented traffic regulation using express-rate-limit and express-slow-down to prevent abuse on authentication and write routes.
* **Delay Mechanism:** Applied a progressive response delay for consecutive requests rather than immediate blockages, studying how to mitigate brute-force attempts without completely disrupting legitimate users.

### 3. Database Modeling and Custom Interceptors
* **Sequential Identifiers:** Solved the default non-sequential behavior of MongoDB's ObjectId by implementing a pre-save hook that updates an independent counter collection atomically.
* **Data Transformations:** Configured Mongoose toJSON transformations to sanitize outbound data. This approach removes sensitive database properties and internal version keys, while formatting dates into a human-readable structure.

### 4. Pagination and Temporal Filtering
* **Resource Optimization:** Structured database queries using offset-based pagination controls (skip and limit parameters) to handle large data sets without degrading application performance.
* **Dynamic Search Criteria:** Built dynamic query-building logic to allow users to filter historical financial data by predefined windows or custom date bounds using ISO timestamps.

---

## Project Structure

```text
Expense Tracker API
├── src
│   ├── config
│   │   └── database.js      # Database configuration and connection isolation
│   ├── controllers
│   │   ├── authController.js # Logic for user identity and token lifecycle
│   │   └── taskController.js # Operations for expense storage and query assembly
│   ├── middlewares
│   │   ├── authMiddleware.js # Token extraction and validation interceptor
│   │   └── rateLimiter.js    # Traffic limits and response slowdown rules
│   ├── models
│   │   ├── Counter.js        # Schema for sequential auto-incrementing tracking
│   │   ├── Refresh_Token.js  # Storage structure for session refresh state
│   │   ├── Task.js           # Schema for expense tasks with enums and hooks
│   │   └── User.js           # Schema for user registry and field constraints
│   ├── routes
│   │   ├── authRoutes.js     # Path mappings for authentication operations
│   │   └── taskRoutes.js     # Path mappings for financial record operations
│   ├── utils
│   │   └── functions.js      # Helper utilities for string and date mutations
│   └── app.js                # Core Express setup and global exception handlers
├── .env.example              # Template configuration for local environment variables
├── server.js                 # Initial entry point to boot the application
└── package.json
```

---

## API Specification

### Authentication Routes
* **POST /register** -> Registers a new user account, enforces constraints on unique fields, and cryptographically hashes the password.
* **POST /login** -> Validates input credentials against database records, purges older sessions for that user, and returns active authentication tokens.
* **POST /refresh** -> Examines the state of a provided refresh token and issues a new access token if the session remains valid.
* **POST /logout** (Protected) -> Explicitly deletes the session record from the collection, neutralizing the token immediately.

### Expense Management Routes (All require a valid Authorization Bearer Header)
* **POST /expenses** -> Registers a new entry. Validates structural bounds against predefined categories (Groceries, Leisure, Electronics, Utilities, Clothing, Health, Others).
* **PUT /expenses/:id** -> Edits fields within an existing entry after verifying ownership constraints between the author and the authenticated user.
* **DELETE /expenses/:id** -> Removes a specific financial record by numeric identifier and returns a 204 status code upon completion.
* **GET /expenses** -> Retrieves paginated results using custom query filtering parameters: page, limit, sort direction, and temporal constraints.

---

## API Usage and Testing via Thunder Client

To test the application workflows within Visual Studio Code using the Thunder Client extension, follow the systematic sequence below:

### Phase 1: Authentication Workflow

1. **User Registration:**
   * Create a new `POST` request to `http://localhost:3000/register`.
   * Set the **Body** tab to `JSON` and provide the payload:
     ```json
     {
       "name": "Test User",
       "email": "test@example.com",
       "password": "securepassword123"
     }
     ```
   * Send the request. The server will respond with status `201 Created` and return both `access-token` and `refresh-token`. Copy the value of the `access-token`.

2. **User Login (Alternative):**
   * If the user is already registered, create a `POST` request to `http://localhost:3000/login` with the email and password fields in the JSON body.
   * The server will respond with status `200 OK` and return the new active tokens.

### Phase 2: Expense Management Workflow

All requests in this phase require authorization. In Thunder Client, navigate to the **Auth** tab of the request, select **Bearer**, and paste the copied `access-token` into the token field.

1. **Creating an Expense:**
   * Create a `POST` request to `http://localhost:3000/expenses`.
   * Ensure the Bearer token is set in the Auth tab.
   * Provide the following JSON payload in the Body tab:
     ```json
     {
       "name": "Office Supplies",
       "ammount": 45.90,
       "category": "Electronics"
     }
     ```
   * The server will return `201 Created` along with the persisted object, displaying a transformed date and a sequential integer `id` (e.g., `1`).

2. **Retrieving Paginated Expenses:**
   * Create a `GET` request to `http://localhost:3000/expenses`.
   * Add query parameters in the **Query** tab to test filters and pagination:
     * `page`: `1`
     * `limit`: `5`
     * `sort`: `new`
     * `filter`: `pastWeek`
   * The response will return status `200 OK` with meta-information regarding total pages and data arrays.

3. **Updating an Expense:**
   * Create a `PUT` request targeting the specific sequential ID: `http://localhost:3000/expenses/1`.
   * Provide the fields you wish to modify in the JSON body, such as changing the `ammount` or the `name`.
   * The server will return `200 OK` with the updated attributes if ownership is verified.

4. **Deleting an Expense:**
   * Create a `DELETE` request to `http://localhost:3000/expenses/1`.
   * The server will process the removal and respond with `204 No Content`.

---

## Installation and Configuration

### Prerequisites
* Node.js runtime environment (version 18 or later)
* A reachable MongoDB instance running locally or via a cloud provider

### Setup Steps

1. Clone the project repository:
```bash
git clone https://github.com
cd expense-tracker-api
```

2. Download project dependencies:
```bash
npm install
```

3. Setup environment configurations:
Create a `.env` file at the root folder level copying the keys from `.env.example`:
```env
PORT=3000
URI_MONGODB=mongodb://localhost:27017/expense_tracker
URI_MONGODB_TESTS=mongodb://localhost:27017/expense_tracker_test

ACCESS_TOKEN_KEY=your_access_token_secret
ACCESS_TOKEN_EXPIRES=15m

REFRESH_TOKEN_KEY=your_refresh_token_secret
REFRESH_TOKEN_EXPIRES=2h
```

4. Boot the server instance:
```bash
npm start
```
The server will be reachable at http://localhost:3000

5. Execute the test scripts:
```bash
npm test
```