# Playwright Enterprise POM Framework

An enterprise-grade Playwright automation framework designed for scalability, maintainability, and clear reporting. This project automates the [Conduit RealWorld Demo](https://demo.realworld.show) app.

![Automation Flow](https://raw.githubusercontent.com/jay-yeluru/playwright-enterprise-pom/main/conduit-flow.png)

## 🚀 Features

- **Page Object Model (POM)**: Robust encapsulation of UI elements and actions.
- **Fixtures-Driven Architecture**: Clean separation of concerns using custom Playwright fixtures.
- **Dynamic Data**: Integration with `@faker-js/faker` for realistic test data.
- **Multi-State Authentication**: Supports both on-the-fly registration and cached session (`storageState`) flows.
- **Rich Reporting**: Integrated with **Allure 3** and standard Playwright HTML reports.
- **Step-Level Visibility**: Granular action tracking using `step()` from `allure-js-commons`.
- **Consolidated Outputs**: All reports, results, and artifacts are stored in a unified `reports/` folder.
- **Centralized Tagging**: Uses a constants file for consistent test categorization (`@smoke`, `@conduit`, etc.).
- **CI/CD Ready**: Configured for GitHub Actions with **automated sharding** and report deployment.
- **Code Consistency**: Pre-configured with **ESLint** and **Prettier** for enterprise coding standards.
- **Centralized Data Manager**: Systematic test data generation (Faker) and **env-specific static data** (JSON/JS) unified under one hub.

## 🛠️ Prerequisites

- **Node.js**: 20+ (LTS recommended)

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jay-yeluru/playwright-enterprise-pom.git
   cd playwright-enterprise-pom
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npm run install:browsers
   ```

4. Configure environment variables:
   Create a `.env` file from the example:
   ```bash
   cp env/.env.example .env
   ```
   Update `.env` with your target URL and credentials.

## 🧪 Running Tests

### Standard Execution
```bash
# Run all tests
npm test

# Run tests on Desktop Chrome
npm run test:desktop

# Run tests matching a specific tag
npx playwright test --grep @smoke
```

### Debugging
```bash
# Run in headed mode
npx playwright test --headed

# Run with UI mode
npx playwright test --ui
```

## 📊 Reporting

### Allure Report (Recommended)
```bash
# Generate report from consolidated results
npm run allure:generate

# Open the report
npm run allure:open

# Run tests and open report in one go
npm run test:allure
```

### Playwright HTML Report
```bash
# View the HTML report
npm run test:report

# Clear all reporting data
npm run report:clear
```

### Code Quality & Data
```bash
# Check code for linting errors
npm run lint

# Automatically fix linting/formatting issues
npm run lint:fix

# Format code using Prettier
npm run format
```

### Data Management
The `DataManager` unified dynamic and static data:
- **Dynamic**: `data.createUser()` (uses Faker)
- **Static**: `data.static('auth').user_login` (loads from `data/{env}/auth.js`)

## 📂 Project Structure

- **`reports/`**: Consolidated test outputs (HTML, Allure, snapshots).
- **`pages/`**: Page Objects representing application screens.
- **`fixtures/`**: Custom Playwright fixtures for specialized managers (`app`, `utils`, `helpers`).
- **`utils/`**: Core utilities including API helpers, configuration managers, and base interactions.
- **`constants/`**: shared constants like test tags.
- **`tests/`**: End-to-end test specifications.
- **`.github/workflows/`**: Continuous Integration pipelines.

## 🛣️ GitHub Actions Pipeline

The project includes a fully automated CI pipeline that:
1. Triggers on pushes to the `main` branch.
2. Sets up the Node.js environment.
3. Installs dependencies and browsers.
4. Executes tests in headless mode across **parallel shards**.
5. Aggregates results and publishes a unified Allure report (viewable via GitHub Pages).

---
*Created with ❤️ by [Jay Yeluru](https://github.com/jay-yeluru)*
