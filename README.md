# Appium Tizen Driver

[![NPM version](http://img.shields.io/npm/v/appium-tizen-driver.svg)](https://npmjs.org/package/appium-tizen-driver)
[![Downloads](http://img.shields.io/npm/dm/appium-tizen-driver.svg)](https://npmjs.org/package/appium-tizen-driver)

Appium Tizen Driver is a test automation tool for Tizen devices. Appium Tizen Driver automates Tizen applications, tested on emulators and real devices. Appium Tizen Driver is part of the [Appium](https://github.com/appium/appium) mobile test automation tool.

**✨ Version 2.0 - Now Compatible with Appium 2.x!**

This driver has been fully updated to work with **Appium 2.x** and supports modern **W3C WebDriver** capabilities format.

## Installation

### Appium 2.x (Recommended)

```bash
appium driver install appium-tizen-driver
```

Or install from local directory:
```bash
appium driver install /path/to/appium-tizen-driver
```

### Appium 1.x (Legacy)

```bash
npm install -g appium-tizen-driver
```

## Usage

### Starting Appium Server

```bash
appium server --use-drivers=tizen
```

### W3C Capabilities (Appium 2.x)

```javascript
const capabilities = {
  "capabilities": {
    "alwaysMatch": {
      "platformName": "Tizen",
      "appium:automationName": "Tizen",
      "appium:appPackage": "com.samsung.example",
      "appium:deviceName": "TizenDevice"
    },
    "firstMatch": [{}]
  }
};

// Using WebDriverIO
const { remote } = require('webdriverio');
const driver = await remote({
  hostname: 'localhost',
  port: 4723,
  path: '/wd/hub',
  capabilities: capabilities.capabilities
});
```

### Legacy MJSONWP Format (Appium 1.x)

```javascript
import { TizenDriver } from 'appium-tizen-driver';

let defaultCaps = {
  appPackage: 'com.samsung.example',
  deviceName: 'Tizen',
  platformName: 'Tizen'
};

let driver = new TizenDriver();
await driver.createSession(defaultCaps);
```

## Requirements

- **Appium**: 2.0.0 or higher (recommended) or 1.22.0+ (legacy)
- **Node.js**: 14.0.0 or higher  
- **Tizen Studio**: For SDB (Smart Development Bridge)
- **Tizen Device**: Emulator or real device with Developer Mode enabled

## Capabilities

### Standard Capabilities

| Capability | Description | Example |
|------------|-------------|---------|
| `platformName` | Platform name (must be 'Tizen') | `"Tizen"` |
| `appium:automationName` | Automation engine (must be 'Tizen') | `"Tizen"` |
| `appium:appPackage` | Package identifier of the Tizen app | `"com.samsung.example"` |
| `appium:deviceName` | Name of the Tizen device | `"TizenDevice"` |

### Optional Capabilities

| Capability | Description | Default | Example |
|------------|-------------|---------|---------|
| `appium:tizenInstallTimeout` | App installation timeout (ms) | `60000` | `90000` |
| `appium:sdbPort` | SDB connection port | `26101` | `26101` |

## Changelog

### v2.0.0 (2024)
- **🚀 MAJOR**: Full Appium 2.x compatibility
- **✨ NEW**: W3C WebDriver capabilities support
- **✨ NEW**: Modern Appium 2.x driver architecture
- **🔧 IMPROVED**: Enhanced capabilities parsing and validation
- **🔧 IMPROVED**: Better error handling and debugging
- **⚡ PERFORMANCE**: Optimized session creation process
- **🛠️ TECHNICAL**: Updated dependencies for Appium 2.x
- **🛠️ TECHNICAL**: Migrated to latest BaseDriver version

### v1.x (Legacy)
- Original Appium 1.x implementation

## Commands
- `getAttribute`
- `setAttribute`
- `click`
- `touchUp`
- `touchDown`
- `touchMove`
- `touchLongClick`
- `tap`
- `getLocation`
- `getLocationValueByElementId`
- `getText`
- `elementEnabled`
- `elementDisplayed`
- `getSize`
- `setValue`
- `setValueImmediate`
- `clear`
- `replaceValue`
- `flick`
- `fakeFlick`
- `fakeFlickElement`
- `swipe`
- `doSwipe`
- `pullFile`
- `takeScreenShot`
- `getScreenshotData`
- `getScreenshot`
- `execute`
- `doFindElementOrEls`
- `findElOrEls`
- `getAutomationId`
- `getDeviceTime`
- `inputText`
- `pressHardwareKey`
- `back`
- `installApp`
- `removeApp`
- `isAppInstalled`
- `launchApp`
- `startApp`
- `closeApp`
- `isStartedApp`
- `doTouchAction`
- `performGesture`
- `performTouch`
