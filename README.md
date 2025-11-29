# OS Zoom - Universal OS-Specific Zoom Controller

A universal, framework-agnostic npm package for applying OS-specific zoom levels to websites. Supports React, Vue, Angular, Next.js, and vanilla HTML with dynamic zoom control and extensive customization options.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Quick Start](#quick-start)
5. [Usage Examples](#usage-examples)
6. [API Reference](#api-reference)
7. [Advanced Usage](#advanced-usage)
8. [Troubleshooting](#troubleshooting)

---

## Overview

**OS Zoom** is a lightweight, TypeScript-based package that automatically detects the user's operating system and applies custom zoom levels accordingly. Perfect for:

- Cross-platform web applications
- Responsive design implementation
- Accessibility improvements
- Custom viewing experiences per OS

**Supported Operating Systems:**
- Windows (all versions: 7, 8, 8.1, 10, 11)
- macOS (all versions)
- Linux
- Android
- iOS

**Supported Frameworks:**
- React & Next.js
- Vue 3
- Angular
- Vanilla HTML/JavaScript
- Any framework that supports JavaScript

---

## Features

✅ **Multi-OS Support** - Automatic detection and OS-specific zoom configuration  
✅ **Framework Agnostic** - Works with React, Vue, Angular, Next.js, and vanilla JavaScript  
✅ **Dynamic Zoom Control** - Update zoom levels on-the-fly at runtime  
✅ **CSS Variables System** - Easy customization through CSS custom properties  
✅ **Preset Configurations** - Ready-to-use configurations for common scenarios  
✅ **Full TypeScript Support** - Complete type safety and IntelliSense  
✅ **Zero Dependencies** - Lightweight, no external dependencies  
✅ **Debug Mode** - Built-in debugging and logging  
✅ **Multiple Bundle Formats** - CommonJS, ESM, and UMD  
✅ **Accessibility Friendly** - Respects user preferences and enables dynamic adjustment

---

## Installation

```bash
npm install oszoom
```

or

```bash
yarn add oszoom
```

or

```bash
pnpm add oszoom
```

---

## Quick Start

**Note:** OS Zoom automatically detects the user's operating system and applies the configured zoom level immediately on page load. No manual interaction required!

### Vanilla HTML/JavaScript

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://unpkg.com/oszoom@latest/dist/index.js"></script>
</head>
<body>
    <h1>OS Zoom Demo</h1>
    <p>Zoom is automatically applied based on your OS!</p>
    <script>
        // Wait for script to load, then access OSZoom
        window.addEventListener('DOMContentLoaded', function() {
            // Access OSZoom class (try different ways for compatibility)
            const OSZoomClass = window.OSZoom?.default || window.OSZoom?.OSZoom || window.OSZoom;
            
            if (!OSZoomClass) {
                console.error('OSZoom not found!');
                return;
            }
            
            // Different zoom levels for different OS
            // Windows users will see 80% zoom (0.8)
            // macOS users will see 50% zoom (0.5)
            // Linux users will see 90% zoom (0.9)
            const zoom = new OSZoomClass({
                windows: { enabled: true, zoomLevel: 0.8 },  // 80% zoom for Windows
                macos: { enabled: true, zoomLevel: 0.5 },    // 50% zoom for macOS
                linux: { enabled: true, zoomLevel: 0.9 },    // 90% zoom for Linux
                android: { enabled: false, zoomLevel: 1 },   // No zoom for Android
                ios: { enabled: false, zoomLevel: 1 },       // No zoom for iOS
                debug: true  // Enable debug to see what's happening
            });
            
            // Check what was applied automatically
            const osInfo = zoom.getOSInfo();
            const state = zoom.getState();
            
            console.log('OS:', osInfo.os);
            console.log('Zoom:', state.currentZoom);
            console.log('Browser:', osInfo.browser);
        });
    </script>
</body>
</html>
```

### React

```jsx
import { useOSZoomReact } from 'oszoom/react';

function App() {
  // Different zoom levels for different OS
  // Windows: 80%, macOS: 50%, Linux: 90%
  const { state, osInfo } = useOSZoomReact({
    windows: { enabled: true, zoomLevel: 0.8 },  // 80% zoom
    macos: { enabled: true, zoomLevel: 0.5 },    // 50% zoom
    linux: { enabled: true, zoomLevel: 0.9 },    // 90% zoom
    android: { enabled: false, zoomLevel: 1 },
    ios: { enabled: false, zoomLevel: 1 }
  });
  
  return (
    <div>
      <p>OS: {osInfo.os}</p>
      <p>Current Zoom: {(state.currentZoom * 100).toFixed(0)}%</p>
      <p><em>Applied automatically on page load!</em></p>
    </div>
  );
}
```

### Vue 3

```vue
<script setup>
import { useOSZoomVue } from 'oszoom';

// Different zoom levels for different OS
// Windows: 80%, macOS: 50%, Linux: 90%
const { state, osInfo } = useOSZoomVue({
  windows: { enabled: true, zoomLevel: 0.8 },  // 80% zoom
  macos: { enabled: true, zoomLevel: 0.5 },    // 50% zoom
  linux: { enabled: true, zoomLevel: 0.9 },    // 90% zoom
  android: { enabled: false, zoomLevel: 1 },
  ios: { enabled: false, zoomLevel: 1 }
});
</script>

<template>
  <div>
    <p>OS: {{ osInfo.value.os }}</p>
    <p>Current Zoom: {{ (state.value.currentZoom * 100).toFixed(0) }}%</p>
    <p><em>Applied automatically on page load!</em></p>
  </div>
</template>
```

### Angular

```typescript
import { OSZoomService } from 'oszoom';

@Component({...})
export class AppComponent {
  state = this.zoomService.getState();
  osInfo = this.zoomService.osInfo;

  constructor(private zoomService: OSZoomService) {
    // Different zoom levels for different OS
    // Windows: 80%, macOS: 50%, Linux: 90%
    // Zoom is automatically applied when service is instantiated
  }
  
  ngOnInit() {
    console.log('OS:', this.osInfo.os);
    console.log('Zoom:', this.state.currentZoom);
    console.log('Applied automatically!');
  }
}

// In your module or component, provide config:
// providers: [
//   {
//     provide: OSZoomService,
//     useFactory: () => new OSZoomService({
//       windows: { enabled: true, zoomLevel: 0.8 },  // 80% zoom
//       macos: { enabled: true, zoomLevel: 0.5 },    // 50% zoom
//       linux: { enabled: true, zoomLevel: 0.9 }     // 90% zoom
//     })
//   }
// ]
```

---

## Configuring Different Zoom Levels Per OS

You can set different zoom levels for each operating system. The zoom is automatically applied when the page loads based on the detected OS.

### Example: Windows 80%, macOS 50%, Linux 90%

```javascript
const zoom = new OSZoom({
  windows: { enabled: true, zoomLevel: 0.8 },  // Windows users see 80% zoom
  macos: { enabled: true, zoomLevel: 0.5 },    // macOS users see 50% zoom
  linux: { enabled: true, zoomLevel: 0.9 },    // Linux users see 90% zoom
  android: { enabled: false, zoomLevel: 1 },  // Android: no zoom (100%)
  ios: { enabled: false, zoomLevel: 1 }         // iOS: no zoom (100%)
});
```

### Zoom Level Reference

- `0.5` = 50% zoom (smaller)
- `0.75` = 75% zoom
- `0.8` = 80% zoom
- `0.9` = 90% zoom
- `1.0` = 100% zoom (normal size)
- `1.2` = 120% zoom (larger)
- `1.5` = 150% zoom
- `2.0` = 200% zoom (maximum)

### Common Configurations

**Desktop Only (Different Levels):**
```javascript
{
  windows: { enabled: true, zoomLevel: 0.8 },  // Windows: 80%
  macos: { enabled: true, zoomLevel: 0.5 },    // macOS: 50%
  linux: { enabled: true, zoomLevel: 0.9 },   // Linux: 90%
  android: { enabled: false, zoomLevel: 1 },
  ios: { enabled: false, zoomLevel: 1 }
}
```

**Windows and macOS Only:**
```javascript
{
  windows: { enabled: true, zoomLevel: 0.8 },  // Windows: 80%
  macos: { enabled: true, zoomLevel: 0.5 },   // macOS: 50%
  linux: { enabled: false, zoomLevel: 1 },
  android: { enabled: false, zoomLevel: 1 },
  ios: { enabled: false, zoomLevel: 1 }
}
```

**All Platforms (Different Levels):**
```javascript
{
  windows: { enabled: true, zoomLevel: 0.8 },   // Windows: 80%
  macos: { enabled: true, zoomLevel: 0.5 },     // macOS: 50%
  linux: { enabled: true, zoomLevel: 0.9 },      // Linux: 90%
  android: { enabled: true, zoomLevel: 0.75 },   // Android: 75%
  ios: { enabled: true, zoomLevel: 0.75 }        // iOS: 75%
}
```

---

## Automatic Configuration (Default Behavior)

The package automatically detects the user's OS and applies the configured zoom level on page load. No button clicks needed!

### Vanilla HTML/JavaScript - Automatic Zoom

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OS Zoom - Automatic</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .info {
            background: #f0f0f0;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <h1>OS Zoom - Automatic Configuration</h1>
    
    <div class="info">
        <p><strong>Detected OS:</strong> <span id="os-name">Detecting...</span></p>
        <p><strong>Current Zoom:</strong> <span id="zoom-level">100%</span></p>
        <p><strong>Status:</strong> <span id="status">Zoom applied automatically on page load!</span></p>
    </div>
    
    <h2>Content Example</h2>
    <p>This page automatically applies different zoom levels based on your OS:</p>
    <ul>
        <li><strong>Windows:</strong> 80% zoom (0.8)</li>
        <li><strong>macOS:</strong> 50% zoom (0.5)</li>
        <li><strong>Linux:</strong> 90% zoom (0.9)</li>
        <li><strong>Other OS:</strong> 100% zoom (1.0)</li>
    </ul>
    <p>The zoom is applied immediately when the page loads - no interaction needed!</p>

    <script type="module">
        import OSZoom from './node_modules/oszoom/dist/index.esm.js';
        
        // Automatic configuration with different zoom levels per OS
        // Zoom applies immediately based on detected OS
        const zoomInstance = new OSZoom({
            windows: { enabled: true, zoomLevel: 0.8 },  // Windows: 80% zoom
            macos: { enabled: true, zoomLevel: 0.5 },    // macOS: 50% zoom
            linux: { enabled: true, zoomLevel: 0.9 },    // Linux: 90% zoom
            android: { enabled: false, zoomLevel: 1 },  // Android: No zoom (100%)
            ios: { enabled: false, zoomLevel: 1 }         // iOS: No zoom (100%)
        });
        
        // Display detected information
        const osInfo = zoomInstance.getOSInfo();
        const state = zoomInstance.getState();
        
        document.getElementById('os-name').textContent = osInfo.os.toUpperCase();
        document.getElementById('zoom-level').textContent = 
            (state.currentZoom * 100).toFixed(0) + '%';
    </script>
</body>
</html>
```

### Using Presets - Automatic Configuration

```html
<!DOCTYPE html>
<html>
<head>
    <title>OS Zoom - Preset Example</title>
</head>
<body>
    <h1>Automatic Zoom with Presets</h1>
    <p>Zoom is automatically applied based on your OS!</p>
    
    <script type="module">
        import OSZoom, { ConfigManager } from './node_modules/oszoom/dist/index.esm.js';
        
        // Use preset - automatically applies 80% zoom for desktop OS
        const zoom = new OSZoom(ConfigManager.presets.desktopOnly());
        
        // That's it! Zoom is automatically applied
        console.log('OS:', zoom.getOSInfo().os);
        console.log('Zoom:', zoom.getState().currentZoom);
    </script>
</body>
</html>
```

### React - Automatic Configuration

```jsx
import React from 'react';
import { useOSZoomReact } from 'oszoom/react';

function App() {
  // Different zoom levels for different OS
  // Windows: 80% (0.8), macOS: 50% (0.5), Linux: 90% (0.9)
  // Zoom is automatically applied when component mounts
  const { state, osInfo } = useOSZoomReact({
    windows: { enabled: true, zoomLevel: 0.8 },  // Windows: 80% zoom
    macos: { enabled: true, zoomLevel: 0.5 },    // macOS: 50% zoom
    linux: { enabled: true, zoomLevel: 0.9 },    // Linux: 90% zoom
    android: { enabled: false, zoomLevel: 1 },
    ios: { enabled: false, zoomLevel: 1 }
  });
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>OS Zoom - Automatic</h1>
      <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '5px' }}>
        <p><strong>Detected OS:</strong> {osInfo.os.toUpperCase()}</p>
        <p><strong>Current Zoom:</strong> {(state.currentZoom * 100).toFixed(0)}%</p>
        <p><em>Zoom was applied automatically on page load!</em></p>
        <p><small>Windows users see 80%, macOS users see 50%, Linux users see 90%</small></p>
      </div>
      
      <h2>Your Content</h2>
      <p>This content is automatically zoomed based on your operating system.</p>
      <p>No buttons needed - it just works!</p>
    </div>
  );
}

export default App;
```

### Vue 3 - Automatic Configuration

```vue
<template>
  <div style="padding: 20px">
    <h1>OS Zoom - Automatic</h1>
    <div style="background: #f0f0f0; padding: 15px; border-radius: 5px">
      <p><strong>Detected OS:</strong> {{ osInfo.value.os.toUpperCase() }}</p>
      <p><strong>Current Zoom:</strong> {{ (state.value.currentZoom * 100).toFixed(0) }}%</p>
      <p><em>Zoom was applied automatically on page load!</em></p>
      <p><small>Windows users see 80%, macOS users see 50%, Linux users see 90%</small></p>
    </div>
    
    <h2>Your Content</h2>
    <p>This content is automatically zoomed based on your operating system.</p>
    <p>No buttons needed - it just works!</p>
  </div>
</template>

<script setup>
import { useOSZoomVue } from 'oszoom';

// Different zoom levels for different OS
// Windows: 80% (0.8), macOS: 50% (0.5), Linux: 90% (0.9)
// Zoom is automatically applied when component mounts
const { state, osInfo } = useOSZoomVue({
  windows: { enabled: true, zoomLevel: 0.8 },  // Windows: 80% zoom
  macos: { enabled: true, zoomLevel: 0.5 },    // macOS: 50% zoom
  linux: { enabled: true, zoomLevel: 0.9 },    // Linux: 90% zoom
  android: { enabled: false, zoomLevel: 1 },
  ios: { enabled: false, zoomLevel: 1 }
});
</script>
```

### Angular - Automatic Configuration

```typescript
import { Component, OnInit } from '@angular/core';
import { OSZoomService } from 'oszoom';

@Component({
  selector: 'app-root',
  providers: [
    {
      provide: OSZoomService,
      useFactory: () => new OSZoomService({
        // Different zoom levels for different OS
        // Windows: 80% (0.8), macOS: 50% (0.5), Linux: 90% (0.9)
        windows: { enabled: true, zoomLevel: 0.8 },  // Windows: 80% zoom
        macos: { enabled: true, zoomLevel: 0.5 },    // macOS: 50% zoom
        linux: { enabled: true, zoomLevel: 0.9 },    // Linux: 90% zoom
        android: { enabled: false, zoomLevel: 1 },
        ios: { enabled: false, zoomLevel: 1 }
      })
    }
  ],
  template: `
    <div style="padding: 20px">
      <h1>OS Zoom - Automatic</h1>
      <div style="background: #f0f0f0; padding: 15px; border-radius: 5px">
        <p><strong>Detected OS:</strong> {{ osInfo.os | uppercase }}</p>
        <p><strong>Current Zoom:</strong> {{ (state.currentZoom * 100) | number:'1.0' }}%</p>
        <p><em>Zoom was applied automatically on page load!</em></p>
        <p><small>Windows users see 80%, macOS users see 50%, Linux users see 90%</small></p>
      </div>
      
      <h2>Your Content</h2>
      <p>This content is automatically zoomed based on your operating system.</p>
      <p>No buttons needed - it just works!</p>
    </div>
  `
})
export class AppComponent implements OnInit {
  state = this.zoomService.getState();
  osInfo = this.zoomService.osInfo;

  constructor(private zoomService: OSZoomService) {
    // Zoom is automatically applied when service is instantiated
  }

  ngOnInit(): void {
    // State is already set - zoom was applied automatically
    console.log('Zoom applied automatically:', this.state);
  }
}
```

---

## Usage Examples (With Manual Controls)

### Vanilla HTML/JavaScript

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OS Zoom Demo</title>
</head>
<body>
    <h1>OS Zoom Controller Demo</h1>
    
    <div id="info">
        <p><strong>Detected OS:</strong> <span id="os-name">Detecting...</span></p>
        <p><strong>Current Zoom:</strong> <span id="zoom-level">100%</span></p>
    </div>
    
    <div>
        <button onclick="zoomInstance.setZoom('macos', 0.8)">macOS: 80%</button>
        <button onclick="zoomInstance.setZoom('windows', 0.75)">Windows: 75%</button>
        <button onclick="zoomInstance.reset()">Reset to 100%</button>
    </div>

    <script type="module">
        import OSZoom, { ConfigManager } from './node_modules/oszoom/dist/index.esm.js';
        
        const zoomInstance = new OSZoom(
            OSZoom.ConfigManager.presets.macosOnly()
        );
        
        const osInfo = zoomInstance.getOSInfo();
        document.getElementById('os-name').textContent = osInfo.os.toUpperCase();
        document.getElementById('zoom-level').textContent = 
            (zoomInstance.getState().currentZoom * 100).toFixed(0) + '%';
    </script>
</body>
</html>
```

### React Example

```jsx
import React from 'react';
import { useOSZoomReact, ConfigManager } from 'oszoom/react';

function OSZoomApp() {
  const { state, osInfo, setZoom, reset } = useOSZoomReact(
    ConfigManager.presets.desktopOnly()
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>OS Zoom Controller - React Example</h1>
      
      <div>
        <p><strong>Detected OS:</strong> {osInfo.os.toUpperCase()}</p>
        <p><strong>Current Zoom:</strong> {(state.currentZoom * 100).toFixed(0)}%</p>
      </div>
      
      <div>
        <button onClick={() => setZoom('windows', 0.80)}>Windows: 80%</button>
        <button onClick={() => setZoom('macos', 0.80)}>macOS: 80%</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default OSZoomApp;
```

### Vue 3 Example

```vue
<template>
  <div>
    <h1>OS Zoom Controller - Vue 3 Example</h1>
    
    <div>
      <p><strong>Detected OS:</strong> {{ osInfo.value.os.toUpperCase() }}</p>
      <p><strong>Current Zoom:</strong> {{ (state.value.currentZoom * 100).toFixed(0) }}%</p>
    </div>
    
    <div>
      <button @click="setZoom('windows', 0.80)">Windows: 80%</button>
      <button @click="setZoom('macos', 0.80)">macOS: 80%</button>
      <button @click="reset">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { useOSZoomVue, ConfigManager } from 'oszoom';

const { state, osInfo, setZoom, reset } = useOSZoomVue(
  ConfigManager.presets.desktopOnly()
);
</script>
```

### Angular Example

```typescript
import { Component, OnInit } from '@angular/core';
import { OSZoomService, ConfigManager } from 'oszoom';

@Component({
  selector: 'app-os-zoom',
  template: `
    <div>
      <h1>OS Zoom Controller - Angular Example</h1>
      
      <div>
        <p><strong>Detected OS:</strong> {{ osInfo.os | uppercase }}</p>
        <p><strong>Current Zoom:</strong> {{ (state.currentZoom * 100) | number:'1.0' }}%</p>
      </div>
      
      <div>
        <button (click)="setZoom('windows', 0.80)">Windows: 80%</button>
        <button (click)="setZoom('macos', 0.80)">macOS: 80%</button>
        <button (click)="reset()">Reset</button>
      </div>
    </div>
  `
})
export class OSZoomComponent implements OnInit {
  state = this.zoomService.getState();
  osInfo = this.zoomService.osInfo;

  constructor(private zoomService: OSZoomService) {}

  ngOnInit(): void {
    this.zoomService.state$.subscribe(newState => {
      this.state = newState;
    });
  }

  setZoom(os: string, level: number): void {
    this.zoomService.setZoom(os as any, level);
    this.state = this.zoomService.getState();
  }

  reset(): void {
    this.zoomService.reset();
    this.state = this.zoomService.getState();
  }
}
```

### Next.js Example

```jsx
'use client';

import { useOSZoomReact, ConfigManager } from 'oszoom/react';
import { useEffect, useState } from 'react';

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const { state, osInfo, setZoom, reset } = useOSZoomReact(
    ConfigManager.presets.allPlatforms()
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>OS Zoom Controller - Next.js Example</h1>
      <p>OS: {osInfo.os}, Zoom: {(state.currentZoom * 100).toFixed(0)}%</p>
      <button onClick={() => setZoom('windows', 0.80)}>Windows: 80%</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

---

## API Reference

### Core Classes

#### OSDetector

Static utility class for detecting operating system information.

**Methods:**
- `detect(): OSDetectionResult` - Detect OS and return detailed information
- `isOS(targetOS: OS): boolean` - Check if specific OS is detected
- `isMobile(): boolean` - Check if on mobile device
- `getBrowser(): string | undefined` - Get detected browser name

#### ZoomManager

Handles zoom application and state management.

**Methods:**
- `apply(os: OS): void` - Apply zoom based on OS
- `setZoom(os: OS, zoomLevel: number): void` - Update zoom level
- `getZoom(os: OS): number` - Get zoom level for OS
- `reset(): void` - Reset zoom to 100%
- `getState(): ZoomState` - Get current zoom state

#### ConfigManager

Manages configuration and provides preset configurations.

**Presets:**
- `windowsOnly()` - Only Windows at 80%
- `macosOnly()` - Only macOS at 80%
- `desktopOnly()` - Desktop systems at 80%
- `allPlatforms()` - All platforms at 80%
- `mobileOnly()` - Mobile only at 80%

### Adapters

#### Vanilla JavaScript (OSZoom)

```javascript
const zoom = new OSZoom(config);

// Methods
zoom.setZoom(os, zoomLevel);
zoom.getZoom(os);
zoom.reset();
zoom.getOSInfo();
zoom.getState();
zoom.destroy();
```

#### React Hook (useOSZoomReact)

```javascript
const { state, osInfo, setZoom, getZoom, reset } = useOSZoomReact(config);
```

#### Vue 3 Composable (useOSZoomVue)

```javascript
const { state, osInfo, setZoom, getZoom, reset } = useOSZoomVue(config);
```

#### Angular Service (OSZoomService)

```typescript
constructor(private zoom: OSZoomService) {}

this.zoom.setZoom(os, zoomLevel);
this.zoom.getZoom(os);
this.zoom.reset();
this.zoom.getState();
this.zoom.state$; // Observable
```

### Configuration Interface

```typescript
interface ZoomControllerConfig {
  windows?: { enabled: boolean; zoomLevel: number };
  macos?: { enabled: boolean; zoomLevel: number };
  linux?: { enabled: boolean; zoomLevel: number };
  android?: { enabled: boolean; zoomLevel: number };
  ios?: { enabled: boolean; zoomLevel: number };
  debug?: boolean;
  enableCSS?: boolean;
  enableJavaScript?: boolean;
}
```

### CSS Variables Available

```css
--scale-factor           /* Overall zoom factor */
--base-font-size         /* Base font size (scales) */
--heading-size           /* Heading size (scales) */
--spacing-unit           /* Spacing unit (scales) */
--line-height            /* Line height (scales) */
--border-radius          /* Border radius (scales) */
```

---

## Advanced Usage

### Custom Configuration

```javascript
const config = {
  windows: { enabled: true, zoomLevel: 0.75 },
  macos: { enabled: true, zoomLevel: 0.85 },
  linux: { enabled: false, zoomLevel: 1 },
  debug: true
};

const zoom = new OSZoom(config);
```

### Dynamic Zoom Updates

```javascript
const osInfo = zoom.getOSInfo();

if (osInfo.os === 'windows') {
  zoom.setZoom('windows', 0.9);
} else if (osInfo.os === 'macos') {
  zoom.setZoom('macos', 0.85);
}
```

### Custom CSS Usage

```css
:root {
  --scale-factor: 1;
  --base-font-size: calc(16px * var(--scale-factor));
}

body {
  font-size: var(--base-font-size);
}
```

---

## Troubleshooting

### Zoom Not Applied

```javascript
// Enable debug mode
const zoom = new OSZoom({ debug: true });

// Check OS detection
const osInfo = zoom.getOSInfo();
console.log('Detected OS:', osInfo);
```

### CSS Not Applying

```javascript
// Check if CSS is injected
const style = document.getElementById('oszoom-styles');
console.log('CSS Injected:', !!style);
```

---

## License

MIT License - Feel free to use in personal and commercial projects.

---

## Support & Contributing

For issues, feature requests, or contributions:

- GitHub: https://github.com/yourusername/oszoom
- NPM: https://www.npmjs.com/package/oszoom

---

**Created for Synx Automation Pvt Ltd**  
**WhatsApp Marketing Automation Platform**

# oszoom
