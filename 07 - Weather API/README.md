# Weather API

A full-stack backend wrapper service engineered using Node.js, Express, and Redis for high-performance data caching. This system features automated rate-limiting protections, a remote in-memory database abstraction layer, modular configuration management, and predictive error-handling flows to retrieve and serve filtered geographic weather statistics safely.

---

## Technical Challenges Overcame

To complete this specific Roadmap.sh project requirements, the implementation focused on mastering external service integrations, distributed caching pipelines, request throttling controls, and asynchronous exception containment:

* **In-Memory Cache Engineering:** Developed a high-speed data interception pipeline using a remote Redis Cloud server client. The system intercepts incoming requests to inspect stored records (`redisClient.get`), evaluates data freshness dynamically, and commits structured JSON structures with automated expiration tracking (`{ EX: 600 }`) to eliminate redundant third-party network overhead.
* **API Rate-Limiting Protection:** Engineered a defensive security barrier leveraging express middleware configurations (`express-rate-limit`). The engine monitors connection frequencies within sliding windows (`windowMs`), establishes programmatic request thresholds (`limit: 10`), and enforces automated authorization denial payloads to protect the microservice from query flooding.
* **Third-Party Data Transformation:** Mastered schema manipulation pipelines by integrating native asynchronous network transport streams (`fetch`). The backend processes responses from the external OpenWeatherMap framework, isolates targeting attributes (`name`, `coord`, `temp`, `humidity`), and normalizes arbitrary metrics into specialized payloads before distribution.
* **Environment Configuration Isolation:** Structured an isolated configuration context running decoupled credential wrappers (`dotenv`). The backend initializes runtime environments using isolated parameters (`process.env.WEATHER_API_KEY`), isolating sensitive database URLs and operational network ports from the core execution scripts.

---

## Core Competencies Demonstrated

* **Backend Environment Structuring:** Separating code dependencies across clean files, maintaining core execution scripts (`index.js`), environment specifications (`.env`), package manifests (`package.json`), and comprehensive system documentation (`README.md`).
* **Distributed Caching Management:** Handling remote client connections, orchestrating cache hit/miss evaluation workflows, parsing serialized data layers, and setting automatic resource expiration timers.
* **Defensive Software Engineering:** Designing active rate limiters to block client service abuse and building structured fallback catch blocks to intercept faulty queries or network timeouts safely.

---

## Application Features

* **Intelligent Query Caching Service:** An automated Redis cache engine keeping structural payload responses saved for 10 minutes to minimize external API costs.
* **Request Throttling Gateway:** An active security gate limits users to a maximum of 10 API calls per minute to guarantee service stability.
* **Clean Weather Data Serializer:** Automated format tracking extracting only necessary geographic indices, temperature values, and atmospheric metrics.

---

## Installation and Deployment

This application utilizes third-party library dependencies managed by the Node Package Manager (`npm`).

### 1. Clone the Repository
Execute the git command inside your terminal:
```bash
git clone https://github.com
```

### 2. Navigate to the Directory
Switch to the project root folder:
```bash
cd "07 - Weather API"
```

### 3. Restore Application Dependencies
Install the required execution packages (`express`, `redis`, `express-rate-limit`, and `dotenv`) configured inside the project manifest:
```bash
npm install
```

### 4. Local Server Execution
Launch the local Express development server environment by executing the node runner:
```bash
node index.js
```
Open your browser and access the application entry path: `http://localhost:3000/weather?city=Itu`.

---

## Author

Developed by **Daniel Belculfine**

* **LinkedIn:** [Daniel Belculfine](https://www.linkedin.com/in/daniel-belculfine-2905253b3/)
* **GitHub:** [Daniel27072007](https://github.com/daniel27072007)
* **Roadmap.sh:** [dbelculfine](https://roadmap.sh/u/dbelculfine)