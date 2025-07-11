**English** | [繁體中文](README-zh-TW.md) | [简体中文](README-zh-CN.md)

# Obsidian Chinese Converter

Convert Chinese text between Simplified and Traditional scripts directly in Obsidian. Powered by [opencc-js](https://github.com/nk2028/opencc-js).

## Features

- **Context Menu Integration**: Right-click to convert selected text
- **Command Palette**: Access conversions via Obsidian command palette
- **Customizable Options**: Enable only needed conversions in settings
- **Multiple Standards**: Supports Taiwan and Hong Kong variants
- **Multilingual UI**: Available in English, Simplified Chinese, and Traditional Chinese

## Installation

### Community Plugins
1. Open **Settings** → **Community plugins** → **Browse**
2. Search for "Chinese Converter" and install
3. Enable the plugin in **Community plugins**

## Usage

1. **Select** Chinese text in the editor
2. **Convert** using either:
   - Right-click context menu
   - Command palette (`Ctrl+P`/`Cmd+P`)

### Settings
Configure available conversions in **Settings** → **Community plugins** → **Chinese Converter** (gear icon).

## Supported Conversions

The plugin supports the following conversion configurations:

| Name                                                  | From                          | To                              |
| ----------------------------------------------------- | ----------------------------- | ------------------------------- |
| Simplified to Traditional                             | Simplified Chinese            | Traditional Chinese             |
| Traditional to Simplified                             | Traditional Chinese           | Simplified Chinese              |
| Simplified to Traditional (Taiwan)                    | Simplified Chinese            | Traditional Chinese (Taiwan)    |
| Traditional (Taiwan) to Simplified                    | Traditional Chinese (Taiwan)  | Simplified Chinese              |
| Simplified to Traditional (Hong Kong)                 | Simplified Chinese            | Traditional Chinese (Hong Kong) |
| Traditional (Hong Kong) to Simplified                 | Traditional Chinese (Hong Kong) | Simplified Chinese              |
| Simplified to Traditional (Taiwan, with phrases)      | Simplified Chinese            | Traditional Chinese (Taiwan)    |
| Traditional (Taiwan) to Simplified (with phrases)     | Traditional Chinese (Taiwan)  | Simplified Chinese              |
| Traditional to Traditional (Taiwan)                   | Traditional Chinese           | Traditional Chinese (Taiwan)    |
| Traditional to Traditional (Hong Kong)                | Traditional Chinese           | Traditional Chinese (Hong Kong) |

## License

This plugin is released under the [MIT License](LICENSE).
