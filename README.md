# SanTrix Editor

[![npm version](https://img.shields.io/npm/v/santrix.svg?style=flat-square)](https://www.npmjs.com/package/santrix)
[![license](https://img.shields.io/npm/l/santrix.svg?style=flat-square)](https://github.com/NopeThisIsShini/SanTrix/blob/main/LICENSE.TXT)

A powerful, professional-grade rich text editor for the modern web. SanTrix is fully **MIT-licensed**, providing a robust WYSIWYG experience suitable for both open-source and commercial projects.

> ⚠️ **Alpha Release**: This is an early alpha version. APIs may change in future releases.

## Features

- **Rich Text Editing** – Mature and battle-tested WYSIWYG editing engine.
- **Framework Agnostic** – Integrates with any modern web workflow via standard JavaScript.
- **Deep Customization** – Full control over toolbars, menus, and editor behavior.
- **Plugin System** – Extend functionality with built-in and custom plugins.

## Installation

```bash
npm install santrix
```

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

## Licensing

SanTrix is a fork maintained by the SanTrix Team, based on the MIT-licensed source of the TinyMCE core (Portions Copyright © 2022 Ephox Corporation DBA Tiny Technologies, Inc.).

All modifications and distribution are licensed under the **MIT License**.

[View Full License](./LICENSE.TXT)

## Links

- [GitHub Repository](https://github.com/NopeThisIsShini/SanTrix)
- [Report Issues](https://github.com/NopeThisIsShini/SanTrix/issues)
