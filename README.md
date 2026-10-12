# PlaywrightPlayground

A practice repo for the Playwright testing framework.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Scripts](#scripts)
- [CI/CD](#cicd)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

The purpose of this repo is to provide a space for practicing the Playwright framework, creating API and UI tests.

---

## Tech Stack

| Category  | Technology         |
| --------- | ------------------ |
| Language  | TypeScript         |
| Runtime   | Node.js            |
| Testing   | Playwright         |
| Test Data | Faker              |
| Reporting | Allure             |
| Linting   | ESLint             |
| Format    | Prettier           |
| Git Hooks | Husky, lint-staged |

---

## Prerequisites

- Node.js `>= 24.14.0`
- npm `>= 11.9.0`

---

## Installation

```bash
# Clone the repository
git clone https://github.com/TomiMan7/playwrightPlayground2
cd playwrightPlayground2

# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install --with-deps
```

---

## Configuration

Create a `.env` file in the project root (see `.env.example`):

```env
UI_URL=url
```

| Variable | Description         | Required | Default |
| -------- | ------------------- | -------- | ------- |
| `UI_URL` | Base URL for the UI | Yes      | -       |

> **Where to get these:** Request credentials from the repo owner.

---

## Usage

```bash
# Run all tests
npm test

# Run only UI tests (headed)
npm run test:ui

# Run the UI auth setup
npm run test:setup:ui

# Lint the codebase
npm run lint

# Format the codebase
npm run format

# Generate the Allure report
npm run allure:generate

# Open the Allure report
npm run allure:open
```

---

## Project Structure

```
playwrightPlayground2/
├── .github/
│   ├── agents/               # Agent configurations
│   └── workflows/            # CI/CD pipeline definitions
├── .husky/                       # Git hooks (pre-commit)
├── .vscode/                      # Editor settings
├── config/
│   └── playwright.config.ts      # Playwright configuration
├── src/
│   ├── fixtures/
│   │   └── fixtures.ts           # Custom Playwright fixtures
│   ├── test-data/                # Data factories
│   │   ├── booking-data-factory.ts
│   │   └── ui-sign-up-data-factory.ts
│   ├── ui/
│   │   └── ui-service.ts         # UI/API service layer
│   └── utils/                    # Helper utilities
│       ├── env.ts
│       └── logger.ts
├── tests/
│   ├── pom/                      # Page Object Models
│   │   ├── cart-page.ts
│   │   ├── checkout-page.ts
│   │   ├── login-sign-up.ts
│   │   ├── product-detail-page.ts
│   │   └── product-page.ts
│   ├── practice2/                # UI test suites
│   │   └── ui.spec.ts
│   └── setup/                    # UI auth setup
│       └── auth.setup.spec.ts
├── .customerAuth.json            # Saved auth storage state (git-ignored)
├── .env                          # Environment variables (git-ignored)
├── .env.example                  # Example environment variables
├── .gitignore
├── .prettierignore
├── .prettierrc                   # Prettier configuration
├── eslint.config.mts             # ESLint configuration
├── package.json
├── README.md
└── tsconfig.json                 # TypeScript configuration
```

---

## Testing

```bash
# Run all tests
npm test

# Run the UI suite (headed)
npm run test:ui

# Run the UI auth setup
npm run test:setup:ui
```

---

## Scripts

| Script                    | Description                                          |
| ------------------------- | ---------------------------------------------------- |
| `npm run lint`            | Lint the codebase                                    |
| `npm run lint:fix`        | Lint and automatically fix issues                    |
| `npm run format`          | Format the codebase with Prettier                    |
| `npm run format:check`    | Check code formatting without making changes         |
| `npm test`                | Run all Playwright tests using the config            |
| `npm run test:ui`         | Run UI tests headed (`tests/practice2/ui.spec.ts`)   |
| `npm run test:setup:ui`   | Run UI auth setup (`tests/setup/auth.setup.spec.ts`) |
| `npm run prepare`         | Set up Husky git hooks                               |
| `npm run allure:generate` | Generate an Allure report from test results          |
| `npm run allure:open`     | Open the generated Allure report                     |

---

## CI/CD

This project uses **GitHub Actions** for continuous integration and deployment. Linting runs on every push to any branch, while the full pipeline runs on pushes to `master` and on pull requests.

### Pipeline Overview

| Job               | Description                                                                |
| ----------------- | -------------------------------------------------------------------------- |
| **Lint & Format** | Installs dependencies, runs the linter, and checks code formatting         |
| **Test**          | Runs Playwright tests in parallel across 4 shards and uploads results      |
| **Allure Report** | Merges test results, generates an Allure report, and publishes it to Pages |

### Details

- **Triggers:** Lint runs on every push to any branch; Test and Allure Report run on pushes to `master` and on pull requests
- **Node.js:** Uses Node.js version 24 with npm caching
- **Testing:** Executes Playwright tests sharded across 4 runners for faster feedback
- **Artifacts:** Uploads Allure results and Playwright traces (retained for 30 days)
- **Reporting:** Generates an Allure report with historical trend data per branch
- **Deployment:** Publishes the Allure report to GitHub Pages (per-branch subfolder) for the `master`, `service`, and `ui` branches
- **Summary:** Adds a direct link to the published report in the workflow summary

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/name`)
5. Open a Pull Request

---

## License

This project is licensed under the ISC License.

---

## Contact

**Tamás Löki** - [@TomiMan7](https://github.com/TomiMan7)

Project Link: [https://github.com/TomiMan7/playwrightPlayground2](https://github.com/TomiMan7/playwrightPlayground2)
