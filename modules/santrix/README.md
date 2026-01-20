# SanTrix Editor

[![npm version](https://img.shields.io/npm/v/santrix.svg?style=flat-square)](https://www.npmjs.com/package/santrix)
[![license](https://img.shields.io/npm/l/santrix.svg?style=flat-square)](https://github.com/NopeThisIsShini/SanTrix/blob/main/LICENSE.TXT)

A powerful, professional-grade **MIT-licensed** rich text editor for the modern web.

## Installation

```bash
npm install santrix
```

## Usage

### CDN (Copy & Paste Ready)

Create an `index.html` file and paste this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SanTrix Editor</title>
  <script src="https://unpkg.com/santrix/js/santrix/santrix.min.js"></script>
</head>
<body>
  <textarea id="editor">Hello World! Start typing here...</textarea>
  
  <script>
    santrix.init({
      selector: "#editor",
      height: 400,
      plugins: "lists link image table code",
      toolbar: "undo redo | bold italic underline | bullist numlist | link image table | code"
    });
  </script>
</body>
</html>
```

Open the file in your browser and you're ready to go!

### ES Modules (For Modern Projects)

```javascript
import santrix from "santrix";

santrix.init({
  selector: "#editor",
  height: 500,
  plugins: "lists link image table code codesample",
  toolbar: "undo redo | bold italic | bullist numlist | link image table | code",
  menubar: true
});
```

## Available Plugins

| Category | Plugins |
|----------|---------|
| **Content** | `lists`, `link`, `image`, `media`, `table`, `codesample`, `emoticons` |
| **Editing** | `searchreplace`, `wordcount`, `code`, `fullscreen`, `preview` |
| **Formatting** | `visualblocks`, `visualchars`, `charmap`, `insertdatetime` |

## Configuration Options

```javascript
santrix.init({
  selector: "#editor",        // Target element
  height: 500,                // Editor height in pixels
  width: "100%",              // Editor width
  plugins: "lists link",      // Space-separated plugins
  toolbar: "bold italic",     // Toolbar buttons
  menubar: true,              // Show/hide menubar
  skin: "oxide",              // UI skin (oxide, oxide-dark)
  content_css: "default"      // Content styling
});
```

## License

SanTrix is a fork of TinyMCE 6 (MIT). See [LICENSE.TXT](./LICENSE.TXT) for details.

## Links

- [Homepage](https://nopethisisshini.github.io/SanTrix.dev/)
- [GitHub](https://github.com/NopeThisIsShini/SanTrix)
- [Issues](https://github.com/NopeThisIsShini/SanTrix/issues)
