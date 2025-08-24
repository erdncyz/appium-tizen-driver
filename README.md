# Appium Tizen Driver

[![NPM version](http://img.shields.io/npm/v/@erdncyz/appium-tizen-driver.svg)](https://npmjs.org/package/@erdncyz/appium-tizen-driver)
[![Downloads](http://img.shields.io/npm/dm/@erdncyz/appium-tizen-driver.svg)](https://npmjs.org/package/@erdncyz/appium-tizen-driver)
[![License](https://img.shields.io/npm/l/@erdncyz/appium-tizen-driver.svg)](https://github.com/erdncyz/appium-tizen-driver/blob/master/LICENSE)
[![Appium](https://img.shields.io/badge/Appium-2.x-brightgreen.svg)](https://appium.io/)

> **🚀 Modern Appium 2.x Driver for Tizen Devices**
> 
> **Appium Tizen Driver** is a comprehensive test automation solution for Samsung Tizen devices and applications. This driver enables automated testing of Tizen applications on both emulators and real devices, providing full compatibility with the latest **Appium 2.x** framework and **W3C WebDriver** standards.

## ✨ **Key Features**

- 🔥 **Appium 2.x Full Compatibility** - Built for modern Appium architecture
- 🌐 **W3C WebDriver Support** - Industry-standard capabilities format
- 📱 **Tizen Device Support** - Works with emulators and real Tizen devices
- 🎯 **Comprehensive Automation** - Touch, gesture, element interaction, and more
- 🚀 **High Performance** - Optimized for fast and reliable test execution
- 🔧 **Easy Integration** - Simple setup and configuration
- 📊 **Rich Logging** - Detailed debugging and monitoring capabilities

## 🎯 **What is Tizen?**

**Tizen** is Samsung's open-source operating system for smart devices, including:
- 📺 **Smart TVs** - Samsung Smart TV applications
- ⌚ **Wearables** - Samsung Galaxy Watch applications  
- 📱 **Mobile Devices** - Samsung Z series phones
- 🏠 **IoT Devices** - Smart home and IoT applications

This driver enables automated testing of applications running on all Tizen platforms.

## 🚀 **Quick Start**

### **Step 1: Install Appium 2.x**
```bash
npm install -g appium@latest
```

### **Step 2: Install Tizen Driver**
```bash
# Note: appium driver install may not work for custom drivers
# If you get an error, use one of the alternative methods below

# Method 1: Install from GitHub (Recommended)
git clone https://github.com/erdncyz/appium-tizen-driver.git
cd appium-tizen-driver
npm install
npm run build
npm link

# Method 2: Install from NPM and link manually
npm install @erdncyz/appium-tizen-driver
cd node_modules/@erdncyz/appium-tizen-driver
npm link

# Method 3: Try official Appium driver install (may fail for custom drivers)
appium driver install @erdncyz/appium-tizen-driver
```

### **Step 3: Start Appium Server**
```bash
appium server --use-drivers=tizen
```

### **Step 4: Run Your Tests**
```javascript
// Your test code here
const capabilities = {
  "capabilities": {
    "alwaysMatch": {
      "platformName": "Tizen",
      "appium:automationName": "Tizen",
      "appium:appPackage": "com.samsung.example",
      "appium:deviceName": "TizenDevice"
    }
  }
};
```

## 📦 **Installation Options**

### **Appium 2.x (Recommended)**
```bash
# Method 1: Install from GitHub (Recommended)
git clone https://github.com/erdncyz/appium-tizen-driver.git
cd appium-tizen-driver
npm install
npm run build
npm link

# Method 2: Install from NPM and link manually
npm install @erdncyz/appium-tizen-driver
cd node_modules/@erdncyz/appium-tizen-driver
npm link

# Method 3: Try official Appium driver install (may fail for custom drivers)
appium driver install @erdncyz/appium-tizen-driver

# Method 4: Install globally (not recommended for Appium 2.x)
npm install -g @erdncyz/appium-tizen-driver
```

### **From Local Directory**
```bash
# Install from local development version
appium driver install /path/to/appium-tizen-driver
```

### **Appium 1.x (Legacy Support)**
```bash
npm install -g @erdncyz/appium-tizen-driver
```

## 🎯 **Usage Examples**

### **Starting Appium Server**
```bash
# Start with Tizen driver
appium server --use-drivers=tizen

# Start with custom port
appium server --use-drivers=tizen --port 4724

# Start with base path
appium server --use-drivers=tizen --base-path /wd/hub
```

### **W3C Capabilities (Appium 2.x - Recommended)**

#### **Basic Example**
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
```

#### **Complete Example with WebDriverIO**
```javascript
const { remote } = require('webdriverio');

const capabilities = {
  "capabilities": {
    "alwaysMatch": {
      "platformName": "Tizen",
      "appium:automationName": "Tizen",
      "appium:appPackage": "com.samsung.example",
      "appium:deviceName": "TizenDevice",
      "appium:tizenInstallTimeout": 90000,
      "appium:sdbPort": 26101
    },
    "firstMatch": [{}]
  }
};

const driver = await remote({
  hostname: 'localhost',
  port: 4723,
  path: '/wd/hub',
  capabilities: capabilities.capabilities,
  logLevel: 'info'
});

// Your test code here
await driver.$('~button').click();
await driver.pause(2000);
await driver.deleteSession();
```

#### **Using Selenium WebDriver**
```javascript
const { Builder } = require('selenium-webdriver');

const capabilities = {
  "platformName": "Tizen",
  "appium:automationName": "Tizen",
  "appium:appPackage": "com.samsung.example",
  "appium:deviceName": "TizenDevice"
};

const driver = await new Builder()
  .usingServer('http://localhost:4723/wd/hub')
  .withCapabilities(capabilities)
  .build();

// Your test code here
await driver.quit();
```

### **Legacy MJSONWP Format (Appium 1.x)**
```javascript
import { TizenDriver } from '@erdncyz/appium-tizen-driver';

let defaultCaps = {
  appPackage: 'com.samsung.example',
  deviceName: 'Tizen',
  platformName: 'Tizen'
};

let driver = new TizenDriver();
await driver.createSession(defaultCaps);
```

## 🔧 **System Requirements**

### **Software Requirements**
- **Appium**: 2.0.0 or higher (recommended) or 1.22.0+ (legacy)
- **Node.js**: 14.0.0 or higher  
- **Tizen Studio**: For SDB (Smart Development Bridge) communication
- **Java Runtime**: Required for Tizen Studio tools

### **Hardware Requirements**
- **Tizen Device**: Emulator or real device with Developer Mode enabled
- **USB Connection**: For real device testing
- **Network Connection**: For emulator testing

### **Tizen Studio Setup**
1. **Download Tizen Studio**: [https://developer.tizen.org/development/tizen-studio/download](https://developer.tizen.org/development/tizen-studio/download)
2. **Install SDB Tools**: Package Manager → Tools → SDB
3. **Enable Developer Mode**: On your Tizen device
4. **Connect Device**: Via USB or network

### **Device Setup**
```bash
# Check if device is connected
sdb devices

# Enable developer mode (if needed)
sdb shell tizen security-profiles add active profile

# Install test app (example)
sdb install /path/to/your/app.tpk
```

## ⚙️ **Capabilities Configuration**

### **Required Capabilities**

| Capability | Type | Description | Example |
|------------|------|-------------|---------|
| `platformName` | String | Platform name (must be 'Tizen') | `"Tizen"` |
| `appium:automationName` | String | Automation engine (must be 'Tizen') | `"Tizen"` |
| `appium:appPackage` | String | Package identifier of the Tizen app | `"com.samsung.example"` |
| `appium:deviceName` | String | Name of the Tizen device | `"TizenDevice"` |

### **Optional Capabilities**

| Capability | Type | Default | Description | Example |
|------------|------|---------|-------------|---------|
| `appium:tizenInstallTimeout` | Number | `60000` | App installation timeout in milliseconds | `90000` |
| `appium:sdbPort` | Number | `26101` | SDB connection port | `26101` |
| `appium:fullReset` | Boolean | `false` | Full reset of the device | `true` |
| `appium:noReset` | Boolean | `false` | Don't reset app state | `true` |
| `appium:fastReset` | Boolean | `true` | Fast reset (default) | `false` |

### **Capabilities Example**
```javascript
const capabilities = {
  "capabilities": {
    "alwaysMatch": {
      // Required capabilities
      "platformName": "Tizen",
      "appium:automationName": "Tizen",
      "appium:appPackage": "com.samsung.example",
      "appium:deviceName": "TizenDevice",
      
      // Optional capabilities
      "appium:tizenInstallTimeout": 90000,
      "appium:sdbPort": 26101,
      "appium:fullReset": false,
      "appium:noReset": false
    }
  }
};
```

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

## 🎮 **Available Commands**

The Tizen Driver provides comprehensive automation capabilities for Tizen applications:

### **Element Interaction**
| Command | Description | Example |
|---------|-------------|---------|
| `click()` | Click on element | `await element.click()` |
| `getAttribute()` | Get element attribute | `await element.getAttribute('text')` |
| `setAttribute()` | Set element attribute | `await element.setAttribute('value', 'text')` |
| `getText()` | Get element text | `await element.getText()` |
| `setValue()` | Set element value | `await element.setValue('text')` |
| `clear()` | Clear element value | `await element.clear()` |
| `isEnabled()` | Check if element is enabled | `await element.isEnabled()` |
| `isDisplayed()` | Check if element is displayed | `await element.isDisplayed()` |
| `getSize()` | Get element size | `await element.getSize()` |
| `getLocation()` | Get element location | `await element.getLocation()` |

### **Touch & Gesture Actions**
| Command | Description | Example |
|---------|-------------|---------|
| `tap()` | Tap on coordinates | `await driver.tap([100, 200])` |
| `touchUp()` | Touch up action | `await driver.touchUp(100, 200)` |
| `touchDown()` | Touch down action | `await driver.touchDown(100, 200)` |
| `touchMove()` | Touch move action | `await driver.touchMove(100, 200)` |
| `touchLongClick()` | Long press | `await driver.touchLongClick(100, 200, 2000)` |
| `swipe()` | Swipe gesture | `await driver.swipe(100, 200, 300, 400)` |
| `flick()` | Flick gesture | `await driver.flick(100, 200, 300, 400, 100)` |
| `performTouch()` | Custom touch action | `await driver.performTouch([{action: 'press', x: 100, y: 200}])` |

### **App Management**
| Command | Description | Example |
|---------|-------------|---------|
| `installApp()` | Install app | `await driver.installApp('/path/to/app.tpk')` |
| `removeApp()` | Remove app | `await driver.removeApp('com.samsung.example')` |
| `isAppInstalled()` | Check if app installed | `await driver.isAppInstalled('com.samsung.example')` |
| `launchApp()` | Launch app | `await driver.launchApp()` |
| `startApp()` | Start app | `await driver.startApp()` |
| `closeApp()` | Close app | `await driver.closeApp()` |
| `isStartedApp()` | Check if app started | `await driver.isStartedApp()` |

### **Device & System**
| Command | Description | Example |
|---------|-------------|---------|
| `getDeviceTime()` | Get device time | `await driver.getDeviceTime()` |
| `pressHardwareKey()` | Press hardware key | `await driver.pressHardwareKey('BACK')` |
| `back()` | Go back | `await driver.back()` |
| `takeScreenshot()` | Take screenshot | `await driver.takeScreenshot()` |
| `pullFile()` | Pull file from device | `await driver.pullFile('/path/to/file')` |

### **Element Finding**
| Command | Description | Example |
|---------|-------------|---------|
| `findElement()` | Find single element | `await driver.findElement('id', 'button1')` |
| `findElements()` | Find multiple elements | `await driver.findElements('class', 'button')` |
| `getAutomationId()` | Get automation ID | `await element.getAutomationId()` |

### **Advanced Actions**
| Command | Description | Example |
|---------|-------------|---------|
| `execute()` | Execute custom script | `await driver.execute('return document.title')` |
| `performGesture()` | Perform custom gesture | `await driver.performGesture([{action: 'press', x: 100, y: 200}])` |

## 🔍 **Element Locators**

The driver supports multiple locator strategies:

```javascript
// By ID
await driver.findElement('id', 'button1');

// By Accessibility ID
await driver.findElement('accessibility id', 'login_button');

// By Class Name
await driver.findElement('class name', 'Button');

// By Name
await driver.findElement('name', 'Login Button');
```

## 🚨 **Troubleshooting**

### **Common Issues & Solutions**

#### **1. Device Connection Issues**
```bash
# Check if device is connected
sdb devices

# If no devices found, try:
sdb kill-server
sdb start-server
sdb devices
```

#### **2. App Installation Errors**
```bash
# Check if app is already installed
sdb shell pm list packages | grep your.package.name

# Uninstall if needed
sdb uninstall your.package.name

# Install with verbose output
sdb install -v /path/to/app.tpk
```

#### **3. Permission Issues**
```bash
# Enable developer mode
sdb shell tizen security-profiles add active profile

# Grant permissions
sdb shell pm grant your.package.name android.permission.WRITE_EXTERNAL_STORAGE
```

#### **4. Appium Server Issues**
```bash
# Check Appium version
appium --version

# Update Appium
npm update -g appium

# Check driver installation
appium driver list
```

### **Error Messages & Solutions**

| Error | Cause | Solution |
|-------|-------|----------|
| `SessionNotCreatedError` | Invalid capabilities | Check `platformName` and `automationName` |
| `NoSuchElementError` | Element not found | Verify element locator and timing |
| `WebDriverException` | Device not connected | Check SDB connection |
| `TimeoutError` | Operation timeout | Increase timeout values |

## ❓ **FAQ**

### **Q: What Tizen devices are supported?**
A: All Tizen devices including Smart TVs, wearables, mobile devices, and IoT devices.

### **Q: Can I use this with Appium 1.x?**
A: Yes, but Appium 2.x is recommended for full functionality and W3C support.

### **Q: How do I find my app's package name?**
A: Use `sdb shell pm list packages | grep your.app.name` or check your app's manifest.

### **Q: What if my device is not detected?**
A: Ensure Developer Mode is enabled and try restarting SDB server.

### **Q: Can I run tests on emulator?**
A: Yes, both Tizen emulator and real devices are supported.

### **Q: How do I update the driver?**
A: Run `appium driver update @erdncyz/appium-tizen-driver`

## 🤝 **Contributing**

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### **Development Setup**
```bash
# Clone the repository
git clone https://github.com/erdncyz/appium-tizen-driver.git
cd appium-tizen-driver

# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build
```

## 📄 **License**

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- Original Samsung Appium Tizen Driver team
- Appium community for the excellent framework
- Tizen developer community for support and feedback

---

**⭐ If this project helps you, please give it a star on GitHub!**
