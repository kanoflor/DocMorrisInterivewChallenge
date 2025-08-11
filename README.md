## Project Overview

This project is part of the DocMorris coding challenge. The goal is to lay a solid technical foundation for a cross-platform mobile application that serves two different pharmacy brands under DocMorris N.V., with shared functionality and brand-specific UI.

### Assumptions

- The two brands will be handled via runtime theming (not separate builds).
- No API specifications are provided; mock data and endpoints are used.
- No detailed design guidelines are given; we assume a clean, accessible UI inspired by modern healthcare apps.
- Authentication and user login are out of scope for this challenge.
- Local sensitive data will be stored securely using encrypted local storage (e.g., SecureStore or EncryptedStorage).

### 🧑‍💻 Programming Language

**React Native with TypeScript** (bare workflow)

- Cross‑platform delivery for iOS and Android with full **native control** (NFC, biometrics, HealthKit/Fit, payments).
- Strong ecosystem and developer productivity (TypeScript, Jest, RNTL, Storybook).
- Future‑ready with the **New Architecture** (Fabric for UI, TurboModules/JSI for perf‑critical bridges).

### Styling

**[Restyle](https://github.com/Shopify/restyle) by Shopify**

- A scalable theme system with type-safe design tokens
- Fast rendering with no runtime style computation (unlike styled-components)
- Easy brand switching via `ThemeProvider`
- Improved maintainability and developer experience through consistent usage of `Box`, `Text`, and `Button` components

### 🧠 State Management

<!-- Assuming that the server data will be retrieved with REST API -->
<!-- クライアント/サーバー状態を一元管理できるので、UI状態（例: カートの中身）とサーバーデータ（例: 商品在庫情報）の同期がやりやすい -->

**Redux Toolkit + RTK Query**

- Scales well for a 20-developer, multi-team setup
- Centralized and predictable state management
- RTK Query for API caching, automatic re-fetching, and reduced boilerplate
- Easy integration with React Native DevTools for debugging
- Clear separation between global app state (cart, auth, prescription data) and local UI state
- Good ecosystem for middleware (analytics, logging, error handling)

### 🧪 Testing

**Jest + React Native Testing Library + Detox (+ MSW)**

- Test pyramid: unit (Jest), component (RNTL), e2e (Detox)
- Strong TypeScript support
- User-centric component tests (queries/a11y) with React Native Testing Library
- Stable mobile E2E (navigation, checkout, deep links) with Detox; mock camera/QR/NFC
- Deterministic API tests via MSW (REST/GraphQL) without flaky network calls
- CI-friendly: parallelization/sharding, Android emulator & iOS simulators

<!-- **Why for DocMorris app:**

- Covers both e-commerce and healthcare features (product search, cart, payment, e-prescription via QR/NFC)
- Supports multi-team (20 devs / 5 squads) parallel development with isolated test layers
- Reduces backend dependency with MSW for stable CI runs -->

### ♻️ Reusability of Components

**Storybook + Shopify Restyle + react-i18next**

- Storybook for isolated development, visual testing, and documentation of UI components
- Restyle for theme-aware, type-safe, and brand-switchable components
- Variants pattern for consistent styling while supporting brand-specific overrides
- Design tokens (colors, typography, spacing) enable easy scaling to new brands or themes
- Internationalization with react-i18next for multi-language support

<!-- **Why for DocMorris app:**
- Two-brand requirement (DocMorris / PromoFarma) with identical functionality but distinct branding
- Supports large multi-team workflow with clear separation of shared vs. feature-specific components
- Ensures consistent look & feel following DocMorris design guidelines (Trust Green, Magenta, Poppins font)
- Facilitates rapid onboarding for new developers via documented and tested components -->

### 🧹 Maintainability

**TypeScript (strict) + ESLint/Prettier + Husky + lint-staged + Zod**

- Strong typing with `strict` mode to catch errors early and refactor safely
- **Zod** for runtime validation of forms and API responses
- Centralized validation schemas reused across features (auth, checkout, e‑prescription) <!-- pair with OpenAPI/GraphQL codegen to prevent drift -->
- ESLint for consistent code style and best‑practice rules; Prettier for automatic formatting
- Husky + lint-staged to run lint/format/tests before commits
- Clear single‑repo structure (e.g., `src/features/*`, `src/shared/{ui,lib,api,validation}`) <!-- to separate concerns and maximize reuse -->

<!-- This setup reduces accidental complexity, improves onboarding, and makes refactoring safer as the app grows. -->

### Role of native layer

- **e‑Prescription:** NFC via `react-native-nfc-manager` for eGK card reads; QR scanning via **VisionCamera** + code‑scanner for prescription tokens
- **Security & Secrets:** `react-native-keychain` (Keychain/Keystore) for tokens; biometric gating (Face ID/Touch ID) for sensitive views and re‑auth
- **Payments:** **Stripe React Native** with Apple Pay / Google Pay for checkout
- **Health integrations:** Apple HealthKit / Google Fit bridges (read‑only or write where platform‑allowed) to reflect post‑purchase medication data/records
- **Notifications:** FCM/APNs for transactional pushes; **Notifee** for rich notifications and local reminders (e.g., refill)
- **Links & Intents:** iOS Universal Links / Android App Links for deep‑linking (promo, order detail, prescription); NFC reader intents

### 🚀 Deployment strategies for internal testing

**Fastlane + TestFlight + Google Play Internal Testing**

- Separate tracks per **brand & env**: iOS schemes / Android productFlavors for two brands, `staging` / `production`
- **Fastlane** lanes to build, sign, and upload (iOS: match/App Store Connect API; Android: Play App Signing)
- **TestFlight** internal/external groups (QA, Compliance, Product); **Play** internal/closed tracks with phased rollouts

### 🤖 Automation for building, testing, and deployments

**GitHub Actions + Fastlane + TestFlight / Play Internal**

- CI runs lint, typecheck, unit/component tests on every PR (e2e can be run on demand)
- Matrix builds for iOS/Android and brand/env combinations
- Fastlane automates build, signing, and upload to TestFlight / Play Internal
- Auto version bump & changelog from Conventional Commits
- MSW + Detox in CI to test e-prescription flows (QR/NFC) without real devices

<!-- **Why for DocMorris app**

- Two brands & multiple environments → matrix builds ensure each combo (DocMorris/PromoFarma × iOS/Android × staging/prod) is tested and shipped the same way
- Healthcare + e‑prescription (QR/NFC) → CI runs deterministic MSW/Detox flows with mocked camera/NFC to protect real data and catch regressions
- 20‑dev / multi‑squad setup → PR gates (typecheck/lint/tests) give fast feedback and keep trunk stable while teams work in parallel
- Regulated domain → automated signing, versioning, release notes, and symbol uploads create a reliable audit trail
- Safer rollouts → TestFlight / Play Internal tracks enable staged releases and quick rollback if issues appear
- Security by default → short‑lived CI secrets (no keys in repo) and redacted logs prevent PII/PHI leakage
- Fast, low‑risk fixes → optional CodePush for UI/JS hotfixes (non‑security‑critical) without waiting for store review -->

### 🛰 Monitoring

**Sentry (mobile)**

- One tool for crashes, errors, and performance
- Release Health: link errors to build/brand/env
- Performance traces on key flows (cold start, QR→NFC→e‑Rx submit, checkout)
- Alerts to Slack/Teams with SLOs (crash‑free rate, e‑Rx success, payment failures)

<!-- **Why for DocMorris app**
- Dual-brand & multi-environment: per-brand Release Health and alert routing (DocMorris / PromoFarma; staging / prod).
- Healthcare-critical flows: trace and alert on e‑prescription steps (QR → NFC → submit) and checkout success.
- Multi-squad setup (20 devs / 5 teams): ownership rules and regression alerts reduce MTTR across journey touchpoints.
- Auditable releases: link crashes/errors to build numbers, commits, and changelogs for safer staged rollouts. -->

### 📊 Tracking

**Matomo (self-hosted)**

- Privacy-first, GDPR-compliant analytics (hosted in EU)
- Event tracking for key flows: search, product view, add-to-cart, checkout, e-prescription
- Brand/env segmentation to compare two brands performance
- Dashboards per squad for conversion, retention, and funnel analysis
- Consent management integrated with app settings (opt-in/out)

<!-- **Why for DocMorris app**

- Healthcare domain → requires GDPR-compliant, EU-hosted analytics with strict PII handling
- Two-brand setup → per-brand dashboards to measure conversion and engagement separately
- Multi-squad workflow → event data segmented by feature area (search, checkout, prescription) for focused improvements
- Server-side fallback ensures reliable tracking even with ad/tracker blocking or offline usage -->

### 🔄 OTA Updates

**Microsoft CodePush (via App Center)**

- Push JS/CSS/image updates without full App Store / Play Store review
- Used for non-critical hotfixes and minor UI/content changes
- Separate deployment keys per brand and environment (staging / production)
- Integrates into CI pipeline with gating: typecheck, lint, tests before release
- Rollout controls: staged percentage release, instant rollback if issues found
- Compliance-safe: no business logic or security-sensitive changes pushed OTA
- Release notes tied to commit history for auditability

<!-- **Why for DocMorris app**

- Two-brand setup → brand/env-specific deployment keys prevent cross-brand mix-ups:contentReference[oaicite:0]{index=0}
- Healthcare context → only safe, non-critical updates (UI copy, styling) are delivered OTA to comply with regulations
- Large multi-squad team → hotfixes can be deployed quickly without waiting for app store reviews
- Supports rapid iteration on patient-facing UI/UX (e.g., onboarding screens, prescription instructions) while keeping core logic unchanged -->

### 🔐 Local storing of sensitive health data

**Secure Storage (react-native-keychain / EncryptedSharedPreferences) + Encrypted SQLite (SQLCipher)**

- Store sensitive data (e.g., e-prescription tokens) only when required, encrypted at rest
- iOS: Keychain Services (+ Face ID / Touch ID), Android: EncryptedSharedPreferences + Keystore
- Encrypted SQLite for structured offline data (draft prescriptions, refill schedules)
- Auto-delete after submission or expiry; user can delete anytime (GDPR)
- In-memory for transient data; secure wipe on logout/account removal
- Keys managed by OS secure hardware (Secure Enclave / TEE)
- Exclude sensitive data from backups unless encrypted

<!-- **Why for DocMorris app**

- Handles regulated health data (e-prescriptions, insurance info) under GDPR
- Two-brand, multi-team setup → standardized secure storage patterns prevent inconsistent handling
- Offline capability ensures prescriptions can be processed even without network, without compromising security
- Supports patient trust by allowing full manual deletion of personal data at any time -->
