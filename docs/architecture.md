# NETFIX AI — Admin Portal Architecture & Visual Guides

This document outlines the architecture, layout hierarchy, and authentication flow for the **NETFIX AI Admin Portal**.

---

## 🏛️ System Architecture

```mermaid
flowchart TD
    subgraph Browser ["Admin Browser Client"]
        View["React 19 Admin UI<br/>(Vite + Tailwind CSS)"]
        State["Auth & Nav State Manager"]
        Service["adminAuthService API Client"]
    end

    subgraph Backend ["Backend API Server (Express)"]
        AuthMiddleware["Admin Auth Middleware<br/>(JWT Cookie Validator)"]
        AdminController["Admin Controller Services"]
        AuditService["Audit Log Service"]
        Database[("Supabase / Postgres DB")]
    end

    View --> State
    State --> Service
    Service -- "HTTPS REST API<br/>(with Credentials / Cookies)" --> AuthMiddleware
    AuthMiddleware --> AdminController
    AdminController --> AuditService
    AdminController --> Database
```

---

## 🔒 3-Step Admin Authentication Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Step1_Login: Navigate /admin/login
    Step1_Login --> Step2_MFA: Valid Credentials (temp_token)
    Step1_Login --> Step1_Login: Invalid Password Error

    Step2_MFA --> Step3_Captcha: Valid TOTP Code (mfa_verified_token)
    Step2_MFA --> Step2_MFA: Incorrect Code / Timeout

    Step3_Captcha --> Authenticated_Dashboard: Turnstile Verification Pass (HttpOnly Cookie Set)
    Step3_Captcha --> Step3_Captcha: Captcha Failure

    Authenticated_Dashboard --> [*]: Admin Logout / Session Expired
```

---

## 🧭 Admin Dashboard View Layout Matrix

```mermaid
flowchart LR
    Sidebar["AdminSidebar Navigation"] --> Dashboard["Admin Dashboard (Telemetry & Quick Actions)"]
    Sidebar --> Users["Users Directory (Role Management)"]
    Sidebar --> Agents["AI Agent Oversight (Worker Pool Metrics)"]
    Sidebar --> Access["Access Requests (Role Approvals)"]
    Sidebar --> Audit["Audit Trail (Immutable Security Logs)"]
    Sidebar --> Support["Support Center (Ticket Management)"]
    Sidebar --> Profile["Admin Profile Settings"]
    Sidebar --> Settings["System Governance & Policy Configuration"]
```
