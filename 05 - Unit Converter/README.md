# Unit Converter Web Application

A full-stack measurement conversion platform engineered using Node.js, Express, and EJS Server-Side Rendering (SSR). This application dynamically processes and converts metric and imperial systems across length, weight, and temperature vectors using math logic designed to handle floating-point precision issues smoothly without external calculation packages.

---

## Technical Challenges Overcame

To complete this Roadmap.sh challenge successfully, the implementation focused on mastering server-side rendering pipelines, mathematical precision stabilization, and dual-layer architecture validation:

* **Dynamic Server-Side Rendering (Express & EJS Engine):** Constructed an interactive multi-view template architecture using EJS engine templates (`views/`). Configured Express query parameter capturing pipelines (`req.query`) to extract conversion parameters, rendering calculation metrics to separate page scopes seamlessly while safely handling fallback null states.
* **Floating-Point Matrix Precision Stabilization:** Solved standard language rounding anomalies by crafting a custom calculation parser (`resultFormat`). The logic processes micro-scale outputs via text extraction algorithms (`toPrecision` joined with logarithmic scaling), preventing scientific notation distortions (`4.7e-4`) from formatting incorrectly inside web layout matrices.
* **Algorithmic Unit Conversion Architecture:** Developed unified ratio lookup matrix configurations to process distinct structural metrics. The system translates length variables via central standard references (Meters) and weight metrics via unified mass arrays (Grams), processing cross-conversions with basic operational mathematical formulas.
* **Dual-Layer Validation & Event Architecture:** Engineered a complete backup validation layer. Implemented defensive server-side conditional logic arrays to discard corrupted query sequences, while decoupling client-side event tracking overrides (`frontendScript.js`) using form submit event interceptions and DOM visibility switches (`.close`).

---

## Core Competencies Demonstrated

* **Full-Stack Application Structuring:** Organizing project code paths across dedicated runtime directories, separating backend routes (`index.js`), template modules (`views/`), and public visual styling bundles (`public/`).
* **Server-Side Render Engine Management:** Mapping custom view models, handling dynamic query parameter evaluations, and injecting real-time state outputs into reusable HTML layouts.
* **Advanced Algorithmic Math Engineering:** Overriding native parsing bugs by building custom string manipulation handlers to guarantee high-fidelity decimal results.

---

## Application Features

* **Multi-Category Conversion Hub:** Dedicated navigation layers supporting rapid execution routines for Length, Mass/Weight, and Temperature models.
* **Dynamic Floating-Point Evaluation:** Advanced mathematical processors ensuring tiny conversions maintain accurate values without visual notation drops.
* **Unified Public Layout Canvas:** A fluid responsive dashboard using CSS Grid metrics, flex containers, and clamp constraints to ensure balance across desktop monitors and micro-viewports.

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
cd "05 - Unit Converter"
```

### 3. Restore Application Dependencies
Install the required execution packages (`express` and `ejs`) configured inside the repository package manifest:
```bash
npm install
```

### 4. Local Server Execution
Launch the local Express development server environment by executing the node runner:
```bash
node index.js
```
Open your browser and navigate to the application port provided in the terminal output: `http://localhost:3000/length`.

---

## Author

Developed by **Daniel Belculfine**

* **LinkedIn:** [Daniel Belculfine](https://www.linkedin.com/in/daniel-belculfine-2905253b3/)
* **GitHub:** [Daniel27072007](https://github.com/daniel27072007)
* **Roadmap.sh:** [dbelculfine](https://roadmap.sh/u/dbelculfine)