# SinestreaFCA

> Unofficial **Facebook Chat API** written in TypeScript — login via cookie/appState, extract security tokens, and connect to MQTT for real-time messaging.

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API](#api)
- [License](#license)

---

## Introduction

**SinestreaFCA** is a TypeScript library for automating interactions with Facebook Messenger using session cookies. It extracts security parameters (`fb_dtsg`, `lsd`, `jazoest`) and the `Sequence ID` from Facebook's web interface, and supports MQTT connections for real-time message events.

---

## Features

- 🔐 **Flexible login**: supports cookie string, AppState (JSON), or email/password.
- 🔑 **Security token extraction**: automatically retrieves `fb_dtsg`, `lsd`, `jazoest` from multiple sources (home page, mobile, Business).
- 📨 **Sequence ID retrieval**: via HTML or GraphQL as needed.
- 🌐 **MQTT configuration**: auto-detects endpoint and region for real-time connections.
- 🎨 **Custom logger**: gradient-colored log output for easy reading.
- 🍪 **Automatic Cookie Jar**: manages cookies across requests using `tough-cookie`.

---

## Requirements

| Tool    | Minimum version |
|---------|-----------------|
| Node.js | 18+             |
| npm     | 8+              |

---

## Installation

```bash
# Clone the repository
git clone https://github.com/iamdinhduchuy/SinestreaFCA.git
cd SinestreaFCA

# Install dependencies
npm install
```

---

## Usage

### Run in development mode

```bash
npm run dev
```

### Login with Cookie String

```typescript
import Login from "./src/index";

await Login("cookie1=value1; cookie2=value2; ...");
```

### Login with AppState

```typescript
import Login from "./src/index";

const appState = [
  {
    key: "c_user",
    value: "100000000000000",
    domain: ".facebook.com",
    path: "/",
    hostOnly: false,
    creation: "2024-01-01T00:00:00.000Z",
    lastAccessed: "2024-01-01T00:00:00.000Z",
  },
  // ... other cookies
];

await Login(appState);
```

### Login with Email / Password

> ⚠️ This feature is currently under development.

```typescript
import Login from "./src/index";

await Login("email@example.com", "password123");
```

---

## Project Structure

```
SinestreaFCA/
├── src/
│   ├── index.ts            # Entry point — Login function
│   ├── context.ts          # Singleton Context (userID, token, MQTT, ...)
│   ├── @types/             # TypeScript declarations
│   │   ├── api.d.ts        # API routes interface
│   │   ├── global.d.ts     # Global declarations
│   │   ├── index-entry.d.ts# LoginArgs & LoginInterface
│   │   └── types.d.ts      # AppState type
│   ├── client/
│   │   └── cookieJar.ts    # Axios HTTP client + Cookie Jar
│   ├── cores/
│   │   └── Facebook.ts     # Core logic: token extraction, MQTT, GraphQL
│   └── utils/
│       ├── index.ts        # Conversion utilities (AppState ↔ Cookie string)
│       └── log.ts          # Gradient color logger
├── package.json
├── tsconfig.json
└── LICENSE
```

---

## API

### `Login(...args)`

Main entry function. Accepts one of three argument forms:

| Parameter | Type | Description |
|-----------|------|-------------|
| `appState` | `AppState` | Array of cookie objects |
| `cookieString` | `string` | Cookie string in `key=value; ...` format |
| `email, password` | `string, string` | Facebook email and password |

After a successful login, `ContextInstance` is populated with:

| Property | Description |
|----------|-------------|
| `userID` | Facebook user ID |
| `fb_dtsg` | DTSG security token |
| `lsd` | LSD token |
| `jazoest` | jazoest value |
| `mqttEndpoint` | MQTT connection endpoint |
| `region` | MQTT region (default: `PRN`) |

---

### `FacebookCore`

Singleton class providing the following methods:

| Method | Description |
|--------|-------------|
| `getFullContext()` | Retrieves the full context from Facebook |
| `getDtsg()` | Retrieves `fb_dtsg` and `lsd` |
| `getSequenceId(userID, fb_dtsg)` | Retrieves Sequence ID via GraphQL |
| `getMqttConfig(html, userID)` | Extracts MQTT configuration |
| `extractSecurityParams(html)` | Parses security parameters from HTML |
| `generateJazoest(fb_dtsg)` | Computes `jazoest` from `fb_dtsg` |
| `checkHealthAccount(uid, token)` | Checks account health status |

---

## License

This project is distributed under the **ISC** license. See the [LICENSE](./LICENSE) file for more details.

---

> **Disclaimer**: This project is intended for educational and research purposes only. Automating interactions on Facebook may violate [Facebook's Terms of Service](https://www.facebook.com/terms.php). Use responsibly.
