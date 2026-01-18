# SanTrix Editor

[![npm version](https://img.shields.io/npm/v/santrix.svg?style=flat-square)](https://www.npmjs.com/package/santrix)
[![license](https://img.shields.io/npm/l/santrix.svg?style=flat-square)](https://github.com/NopeThisIsShini/SanTrix/blob/main/LICENSE.TXT)

A powerful, professional-grade rich text editor for the modern web. SanTrix is fully **MIT-licensed**, providing a robust WYSIWYG experience suitable for both open-source and commercial projects.

> ⚠️ **Pre-Release Version**: This is a pre-release version. APIs are stabilizing but may still change before the stable 1.0 release.

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

## Documentation

For detailed documentation, examples, and API reference, visit:
- **GitHub Repository**: [https://github.com/NopeThisIsShini/SanTrix](https://github.com/NopeThisIsShini/SanTrix)
- **Documentation** (coming soon): https://santrix.org

## Available Plugins

SanTrix comes with a comprehensive set of built-in plugins:

- **Content**: lists, link, image, media, table, codesample, emoticons
- **Editing**: searchreplace, wordcount, code, fullscreen
- **Formatting**: visualblocks, visualchars, nonbreaking, charmap
- And many more!

## Contributing

SanTrix is an open-source project and we encourage developers to contribute patches and code to be included in the main package.

**Basic Rules**
- Contributed code will be licensed under the MIT license
- Copyright notices will be changed to SanTrix team, contributors will get credit for their work
- All third party code will be reviewed, tested and possibly modified before being released

**How to Contribute**

The SanTrix source code is [hosted on Github](https://github.com/NopeThisIsShini/SanTrix). Through Github you can submit pull requests and log new bugs and feature requests.

For detailed contribution guidelines, see [CONTRIBUTING.md](https://github.com/NopeThisIsShini/SanTrix/blob/main/CONTRIBUTING.md).

## Licensing

**The 100% free fork of the world's #1 open source rich text editor.**

Used and trusted by millions of developers, **TinyMCE** (the original project we've forked) is the world’s most customizable, scalable, and flexible rich text editor. However, they changed the license of TinyMCE 7 to GPLv2+ (or a commercial license) while it has been MIT for TinyMCE 6 and LGPL for older versions. This creates problems for users (see the discussion) so a fork has been created here.

SanTrix is a fork maintained by the SanTrix Team, based on the MIT-licensed source of the TinyMCE core (Portions Copyright © 2022 Ephox Corporation DBA Tiny Technologies, Inc.).

All modifications and distribution are licensed under the **MIT License**.

- [View Full License](./LICENSE.TXT)
- [View Attribution Notice](./NOTICE.md)

## Links

- [GitHub Repository](https://github.com/NopeThisIsShini/SanTrix)
- [Report Issues](https://github.com/NopeThisIsShini/SanTrix/issues)
- [npm Package](https://www.npmjs.com/package/santrix)

