## Project Overview

This project is part of the DocMorris coding challenge. The goal is to lay a solid technical foundation for a cross-platform mobile application that serves two different pharmacy brands under DocMorris N.V., with shared functionality and brand-specific UI.

### 🚀 Quick Start

#### Prerequisites

- Node.js 18+
- React Native development environment setup
- iOS Simulator (macOS) or Android emulator

#### Installation & Run

```bash
# Install dependencies
npm install

# iOS (macOS only)
cd ios && pod install && cd ..
npm run ios

# Android
npm run android

# Development server
npm start
```

#### Storybook (Component Library)

To view the component library in-app:

1. Set `SHOW_STORYBOOK = true` in `src/App.tsx`
2. Restart the app to see Storybook interface

## Part 1: Technical Foundations

### 🧑‍💻 Programming Language

**React Native with TypeScript** (bare workflow)

- Cross‑platform delivery for iOS and Android with full **native control** (NFC, biometrics, HealthKit/Fit, payments).
- Strong ecosystem and developer productivity (TypeScript, Jest, RNTL, Storybook).
- Future‑ready with the **New Architecture** (Fabric for UI, TurboModules/JSI for perf‑critical bridges).

### Styling

**[Restyle](https://github.com/Shopify/restyle) by Shopify + StyleSheet**

- A scalable theme system with type-safe design tokens
- Fast rendering with no runtime style computation (unlike styled-components)
- Easy brand switching via `ThemeProvider`
- Improved maintainability and developer experience through consistent usage of `Box`, `Text`, and `Button` components

### 🧠 State Management

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

### ♻️ Reusability of Components

**Storybook + Shopify Restyle + react-i18next**

- Storybook for isolated development, visual testing, and documentation of UI components
- Restyle for theme-aware, type-safe, and brand-switchable components
- Variants pattern for consistent styling while supporting brand-specific overrides
- Design tokens (colors, typography, spacing) enable easy scaling to new brands or themes
- Internationalization with react-i18next for multi-language support

### 🧹 Maintainability

**TypeScript (strict) + ESLint/Prettier + Husky + lint-staged + Zod**

- Strong typing with `strict` mode to catch errors early and refactor safely
- **Zod** for runtime validation of forms and API responses
- Centralized validation schemas reused across features (auth, checkout, e‑prescription)
- ESLint for consistent code style and best‑practice rules; Prettier for automatic formatting
- Husky + lint-staged to run lint/format/tests before commits
- Clear single‑repo structure (e.g., `src/features/*`, `src/shared/{ui,lib,api,validation}`)

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

### 🛰 Monitoring

**Sentry (mobile)**

- One tool for crashes, errors, and performance
- Release Health: link errors to build/brand/env
- Performance traces on key flows (cold start, QR→NFC→e‑Rx submit, checkout)
- Alerts to Slack/Teams with SLOs (crash‑free rate, e‑Rx success, payment failures)

### 📊 Tracking

**Matomo (self-hosted)**

- Privacy-first, GDPR-compliant analytics (hosted in EU)
- Event tracking for key flows: search, product view, add-to-cart, checkout, e-prescription
- Brand/env segmentation to compare two brands performance
- Dashboards per squad for conversion, retention, and funnel analysis
- Consent management integrated with app settings (opt-in/out)

### 🔄 OTA Updates

**Microsoft CodePush (via App Center)**

- Push JS/CSS/image updates without full App Store / Play Store review
- Used for non-critical hotfixes and minor UI/content changes
- Separate deployment keys per brand and environment (staging / production)
- Integrates into CI pipeline with gating: typecheck, lint, tests before release
- Rollout controls: staged percentage release, instant rollback if issues found
- Compliance-safe: no business logic or security-sensitive changes pushed OTA
- Release notes tied to commit history for auditability

### 🔐 Local storing of sensitive health data

**Secure Storage (react-native-keychain / EncryptedSharedPreferences) + Encrypted SQLite (SQLCipher)**

- Store sensitive data (e.g., e-prescription tokens) only when required, encrypted at rest
- iOS: Keychain Services (+ Face ID / Touch ID), Android: EncryptedSharedPreferences + Keystore
- Encrypted SQLite for structured offline data (draft prescriptions, refill schedules)
- Auto-delete after submission or expiry; user can delete anytime (GDPR)
- In-memory for transient data; secure wipe on logout/account removal
- Keys managed by OS secure hardware (Secure Enclave / TEE)
- Exclude sensitive data from backups unless encrypted

## Part 2: App Recreation

### Overview

This project is a MVP inspired by the DocMorris app.
It recreates the cart screen: scanning a prescription (using mock data) and adding the corresponding products to a branded cart screen.
Built with React Native, TypeScript, Shopify Restyle for theming, and Redux Toolkit for state management, it is structured for easy expansion to real camera/NFC scanning and live API integration.

### 🚧 Unexpectedly Challenging Problems

#### **Type-Safe Theme System Integration**

- **Challenge**: Complex TypeScript patterns with Shopify Restyle
- **Complexity**: Balancing type safety with developer experience
- **Solution**: Custom variant patterns with proper type inference

#### **Advanced Component API Design**

- **Challenge**: Creating flexible, reusable components with multiple variants
- **Complexity**: Type-safe prop interfaces with conditional styling
- **Example**: `Button` component with 5 variants, `TextInput` with 4 variants

### 📚 Areas Needing Better Open-Source Libraries

#### **React Native Design Systems**

- **Gap**: Comprehensive design system libraries with built-in brand theming
- **Need**: Pre-built accessible components following platform guidelines
- **Missing**: Better TypeScript inference for variant systems

### 🤖 Where AI Assistant Proved Most Valuable

#### **High-Value Areas**

- ✅ **TypeScript Pattern Generation**: Complex theme typing, component interfaces
- ✅ **Design System Architecture**: Consistent component APIs, variant patterns
- ✅ **State Management Boilerplate**: Redux Toolkit patterns with TypeScript
- ✅ **Storybook Minimum Setup**: Minimum setup for Storybook and Button component development
