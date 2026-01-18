# SanTrix Editor - Development Repository

[![npm version](https://img.shields.io/npm/v/santrix.svg?style=flat-square)](https://www.npmjs.com/package/santrix)
[![license](https://img.shields.io/npm/l/santrix.svg?style=flat-square)](https://github.com/NopeThisIsShini/SanTrix/blob/main/LICENSE.TXT)

> **🏗️ This is the development monorepo.** For installation and usage, see the [npm package](https://www.npmjs.com/package/santrix).

A powerful, professional-grade rich text editor for the modern web. SanTrix is fully **MIT-licensed**, providing a robust WYSIWYG experience suitable for both open-source and commercial projects.

> ⚠️ **Pre-Release Version**: This is a pre-release version. APIs are stabilizing but may still change before the stable 1.0 release.

---

## 📜 Copyright & Attribution

**The 100% free fork of the world's #1 open source rich text editor.**

Used and trusted by millions of developers, **TinyMCE** (the original project we've forked) is the world’s most customizable, scalable, and flexible rich text editor. However, they changed the license of TinyMCE 7 to GPLv2+ (or a commercial license) while it has been MIT for TinyMCE 6 and LGPL for older versions. This creates problems for users (see the discussion) so a fork has been created here.

**SanTrix** is a fork and derivative work based on **[TinyMCE](https://github.com/tinymce/tinymce)**, originally developed by **Ephox Corporation DBA Tiny Technologies, Inc.**

- Original TinyMCE Core: Copyright © 2022 Ephox Corporation DBA Tiny Technologies, Inc.
- SanTrix Modifications: Copyright © 2026 SanTrix Team

Both the original TinyMCE source code and SanTrix modifications are licensed under the **MIT License**.

**We gratefully acknowledge Tiny Technologies for their excellent work on TinyMCE** which forms the foundation of this project.

> **Note:** SanTrix is NOT affiliated with, endorsed by, or sponsored by Tiny Technologies, Inc.

---

## Features

- **Rich Text Editing** – Mature and battle-tested WYSIWYG editing engine.
- **Framework Agnostic** – Integrates with any modern web workflow via standard JavaScript.
- **Deep Customization** – Full control over toolbars, menus, and editor behavior.
- **Plugin System** – Extend functionality with built-in and custom plugins.

## Installation (For Users)

To use SanTrix in your project:

```bash
npm install santrix
```

**For development/building from source**, see the [Development Setup](#development-setup) section below.

## Quick Start

### Using CDN (Recommended for quick testing)

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/santrix/santrix.min.js"></script>
  </head>
  <body>
    <textarea id="my-editor">Hello World!</textarea>

    <script>
      santrix.init({
        selector: "#my-editor",
        height: 400,
      });
    </script>
  </body>
</html>
```

### Using ES Modules (After npm install)

```javascript
import santrix from "santrix";

santrix.init({
  selector: "#my-editor",
  height: 500,
  plugins: ["lists", "link", "image", "code", "table"],
  toolbar: "undo redo | bold italic | bullist numlist | link image",
});
```

## Development Setup

This repository is a monorepo containing the SanTrix editor and its internal modules.

### Prerequisites

- Node.js >= 14.x
- Yarn 1.22.x (specified in `packageManager` field)

### Clone & Install

```bash
git clone https://github.com/NopeThisIsShini/SanTrix.git
cd SanTrix
yarn install
```

### Build

```bash
# Build everything (development)
yarn dev

# Build for production
yarn build

# Build just the santrix module
cd modules/santrix
yarn grunt
```

### Development Workflow

```bash
# Start development server (localhost:3000)
yarn start

# Run tests
yarn test

# Run tests in browser
yarn browser-test

# Run linter
yarn eslint
```

### Project Structure

```
SanTrix/
├── modules/
│   ├── santrix/          # Main editor package (published to npm)
│   ├── oxide/            # UI skin
│   ├── oxide-icons-default/  # Default icon set
│   └── [other modules]/  # Internal utility modules
├── js/                   # Compiled output
└── dist/                 # Distribution builds
```

For more detailed build instructions, see the individual module READMEs.

---

## Licensing

SanTrix is a fork maintained by the SanTrix Team, based on the MIT-licensed source of the TinyMCE core (Portions Copyright © 2022 Ephox Corporation DBA Tiny Technologies, Inc.).

All modifications and distribution are licensed under the **MIT License**.

[View Full License](./LICENSE.TXT)

## Links

- [GitHub Repository](https://github.com/NopeThisIsShini/SanTrix)
- [Report Issues](https://github.com/NopeThisIsShini/SanTrix/issues)
