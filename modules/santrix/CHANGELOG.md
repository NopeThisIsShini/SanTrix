# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.1.0 - 2026-01-21

### Fixed

- Corrected CDN script URL in documentation from `santrix/js/santrix/santrix.min.js` to `santrix/santrix.min.js`

---

## 1.0.0 - 2026-01-20

### 🎉 First Stable Release

This is the first stable, production-ready release of SanTrix!

### Changed

- Promoted from alpha/pre-release to stable version
- Package now publishes with the correct module-specific README (not the monorepo README)
- All APIs are now stable and ready for production use
- Package structure matches HugeRTE/TinyMCE flat distribution
- Zero runtime dependencies (all dependencies are bundled)

### NOTE

- SanTrix is a fully MIT-licensed fork of TinyMCE 6
- Compatible with TinyMCE 6.x plugins and configurations

## 0.2.0-alpha - 2026-01-19

### Changed

- Fixed npm package structure to match HugeRTE/TinyMCE flat distribution
- Package now publishes with zero runtime dependencies (all dependencies are bundled)
- Clean package.json generated via moxiezip:component task

## 0.1.0 - 2026-01-18

### Changed

- Moved from alpha to pre-release version
- API stabilization phase - core APIs are now more stable
- Improved documentation and examples
- Enhanced build process for npm publishing

## 0.0.1 - 2026-01-14 (Initial Alpha)

### Added

- Initial release of SanTrix, a rebranding of the TinyMCE rich text editor.
- All core editor functionality including:
  - Rich text formatting (bold, italic, underline, strikethrough)
  - Lists (ordered, unordered)
  - Tables
  - Links and images
  - Code samples with syntax highlighting
  - Emoticons
  - Full-screen editing
  - Search and replace
  - Word count
  - And many more plugins

### Changed

- Rebranded from TinyMCE to SanTrix
- Updated global object from `tinymce` to `santrix`
- Fresh versioning starting from 0.0.1
