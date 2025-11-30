import { OS, OSDetectionResult } from '../types';

/**
 * OSDetector - Detects operating system using feature analysis
 * Completely avoids user agent parsing - uses browser features and APIs instead
 */
export class OSDetector {
  /**
   * Detect operating system using feature analysis (no user agent parsing)
   * Uses browser capabilities, APIs, and platform features to determine OS
   * @returns {OSDetectionResult} - Detected OS information
   */
  static detect(): OSDetectionResult {
    // Check if running in browser environment (SSR-safe)
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      // Return default for server-side rendering
      return {
        os: 'unknown',
        isMobile: false,
        browser: undefined
      };
    }
    
    // Use feature-based detection (no user agent parsing)
    const osInfo = this.detectFromFeatures();
    
    return {
      ...osInfo,
      browser: this.detectBrowserFromFeatures()
    };
  }

  /**
   * Detect OS using feature analysis and browser capabilities
   * @private
   */
  private static detectFromFeatures(): OSDetectionResult {
    let os: OS = 'unknown';
    let version: string | undefined;
    let isMobile = false;

    // Check for mobile devices first (using feature detection)
    if (this.isMobileDevice()) {
      isMobile = true;
      
      // iOS detection (feature-based) - check first as it's more specific
      if (this.isIOSDevice()) {
        os = 'ios';
        version = this.getIOSVersion();
      }
      // Android detection (feature-based)
      else if (this.isAndroidDevice()) {
        os = 'android';
        version = this.getAndroidVersion();
      }
      // Fallback: if mobile but can't determine, default to android (most common)
      else {
        os = 'android';
      }
    }
    // Desktop OS detection
    else {
      // Windows detection (feature-based) - check first as it's most common
      if (this.isWindowsDevice()) {
        os = 'windows';
        version = this.getWindowsVersion();
      }
      // macOS detection (feature-based)
      else if (this.isMacOSDevice()) {
        os = 'macos';
        version = this.getMacOSVersion();
      }
      // Linux detection (feature-based)
      else if (this.isLinuxDevice()) {
        os = 'linux';
      }
      // Fallback: use platform property as last resort
      else {
        const platform = navigator.platform?.toLowerCase() || '';
        if (platform.includes('win')) {
          os = 'windows';
        } else if (platform.includes('mac') || platform.includes('darwin')) {
          os = 'macos';
        } else if (platform.includes('linux')) {
          os = 'linux';
        }
        // If still unknown, default to windows (most common desktop OS)
        if (os === 'unknown') {
          os = 'windows';
        }
      }
    }

    return { os, version, isMobile };
  }

  /**
   * Detect if device is mobile using feature analysis
   * @private
   */
  private static isMobileDevice(): boolean {
    // Check for touch capabilities
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Check screen size and orientation (more lenient for tablets)
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const isSmallScreen = screenWidth < 1024 || screenHeight < 768;
    
    // Check for mobile-specific APIs
    const hasMobileAPIs = 'standalone' in window.navigator;
    const hasHighDPI = (window as any).devicePixelRatio > 1.5;
    
    // Check for mobile viewport behavior
    const hasMobileViewport = window.innerWidth < 768 || window.innerHeight < 768;
    
    // Mobile if: touch + (small screen OR mobile APIs OR high DPI with mobile viewport)
    return hasTouchScreen && (isSmallScreen || hasMobileAPIs || (hasHighDPI && hasMobileViewport));
  }

  /**
   * Detect iOS using feature analysis (no user agent parsing)
   * @private
   */
  private static isIOSDevice(): boolean {
    // iOS-specific features
    const hasIOSStandalone = 'standalone' in window.navigator;
    const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Check for iOS-specific CSS support (most reliable)
    const hasIOSCSS = CSS.supports('-webkit-touch-callout', 'none');
    
    // Check for iOS-specific vendor prefixes
    const hasWebkitVendor = CSS.supports('-webkit-appearance', 'none');
    
    // Check for iOS-specific behaviors
    // iOS Safari has specific touch event behaviors
    const hasIOSTouchBehavior = 'TouchEvent' in window && 
                                typeof (window as any).TouchEvent !== 'undefined';
    
    // Check platform (direct property, not parsed)
    const platform = navigator.platform?.toLowerCase() || '';
    const isIOSPlatform = platform.includes('iphone') || 
                          platform.includes('ipad') || 
                          platform.includes('ipod');
    
    // iOS detection: platform check OR (standalone + touch + iOS CSS features)
    return isIOSPlatform || 
           (hasIOSStandalone && hasTouchSupport && (hasIOSCSS || hasWebkitVendor)) ||
           (hasTouchSupport && hasIOSCSS && hasIOSTouchBehavior && this.isMobileDevice());
  }

  /**
   * Get iOS version using feature detection
   * @private
   */
  private static getIOSVersion(): string | undefined {
    // Limited version detection without user agent
    // Can check for specific iOS API availability
    if (typeof (window as any).webkitRequestFileSystem !== 'undefined') {
      return undefined; // Version detection limited without user agent
    }
    return undefined;
  }

  /**
   * Detect Android using feature analysis (no user agent parsing)
   * @private
   */
  private static isAndroidDevice(): boolean {
    // Must be mobile and not iOS
    if (!this.isMobileDevice() || this.isIOSDevice()) {
      return false;
    }
    
    const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Check platform (direct property, not parsed)
    const platform = navigator.platform?.toLowerCase() || '';
    const isAndroidPlatform = platform.includes('android') || 
                              platform.includes('linux') && this.isMobileDevice();
    
    // Android-specific behaviors
    // Android Chrome has specific features
    const hasChromeFeatures = typeof (window as any).chrome !== 'undefined' && 
                              (window as any).chrome.runtime &&
                              this.isMobileDevice();
    
    // Android detection: platform check OR (mobile + touch + Chrome on mobile)
    return isAndroidPlatform || 
           (hasTouchSupport && hasChromeFeatures && !this.isIOSDevice());
  }

  /**
   * Get Android version using feature detection
   * @private
   */
  private static getAndroidVersion(): string | undefined {
    // Limited version detection without user agent
    return undefined;
  }

  /**
   * Detect Windows using feature analysis (no user agent parsing)
   * @private
   */
  private static isWindowsDevice(): boolean {
    // Must not be mobile
    if (this.isMobileDevice()) {
      return false;
    }
    
    // Use platform (direct property, not parsed from user agent)
    const platform = navigator.platform?.toLowerCase() || '';
    const isWindowsPlatform = platform.includes('win') || 
                              platform.includes('wow64') ||
                              platform.includes('win64');
    
    // Windows-specific APIs (ActiveX only in IE, but check anyway)
    const hasActiveX = typeof (window as any).ActiveXObject !== 'undefined';
    
    // Windows often has specific screen dimensions
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const isDesktopScreen = screenWidth >= 1024 && screenHeight >= 768;
    
    // Windows detection: platform check (primary) OR (ActiveX + desktop screen)
    return isWindowsPlatform || (hasActiveX && isDesktopScreen);
  }

  /**
   * Get Windows version using feature detection
   * @private
   */
  private static getWindowsVersion(): string | undefined {
    const platform = navigator.platform?.toLowerCase() || '';
    if (platform.includes('win64') || platform.includes('wow64')) {
      return 'Windows 10/11';
    } else if (platform.includes('win32')) {
      return 'Windows';
    }
    return undefined;
  }

  /**
   * Detect macOS using feature analysis (no user agent parsing)
   * @private
   */
  private static isMacOSDevice(): boolean {
    // Must not be mobile
    if (this.isMobileDevice()) {
      return false;
    }
    
    // Use platform (direct property, not parsed from user agent) - most reliable
    const platform = navigator.platform?.toLowerCase() || '';
    const isMacPlatform = platform.includes('mac') || platform.includes('darwin');
    
    // macOS-specific features
    const hasWebkit = typeof (window as any).webkit !== 'undefined';
    
    // Check for Safari on macOS (Safari is primarily macOS)
    const hasSafariFeatures = typeof (window as any).safari !== 'undefined';
    
    // macOS often has specific screen characteristics (but not required)
    const hasRetinaDisplay = (window as any).devicePixelRatio >= 2;
    
    // macOS detection: platform check (primary) OR (Safari + WebKit + desktop)
    return isMacPlatform || 
           (hasSafariFeatures && hasWebkit && !this.isMobileDevice()) ||
           (hasWebkit && hasRetinaDisplay && !this.isWindowsDevice() && !this.isMobileDevice());
  }

  /**
   * Get macOS version using feature detection
   * @private
   */
  private static getMacOSVersion(): string | undefined {
    // Limited version detection without user agent
    return undefined;
  }

  /**
   * Detect Linux using feature analysis (no user agent parsing)
   * @private
   */
  private static isLinuxDevice(): boolean {
    // Must not be mobile, Windows, or macOS
    if (this.isMobileDevice() || this.isWindowsDevice() || this.isMacOSDevice()) {
      return false;
    }
    
    // Use platform (direct property, not parsed from user agent) - most reliable
    const platform = navigator.platform?.toLowerCase() || '';
    const isLinuxPlatform = (platform.includes('linux') && !platform.includes('android')) ||
                           platform.includes('x11');
    
    // Linux-specific browser features
    const hasFirefoxFeatures = typeof (window as any).InstallTrigger !== 'undefined';
    
    // Linux often uses Firefox or Chromium
    const hasChromiumFeatures = typeof (window as any).chrome !== 'undefined' && 
                                (window as any).chrome.runtime;
    
    // Linux detection: platform check (primary) OR (Firefox/Chromium on desktop, not Windows/Mac)
    return isLinuxPlatform || 
           ((hasFirefoxFeatures || hasChromiumFeatures) && 
            !this.isWindowsDevice() && 
            !this.isMacOSDevice() && 
            !this.isMobileDevice());
  }

  /**
   * Detect browser using feature detection (no user agent parsing)
   * @private
   */
  private static detectBrowserFromFeatures(): string | undefined {
    // Feature-based browser detection (no user agent parsing)
    if (typeof (window as any).chrome !== 'undefined' && (window as any).chrome.runtime) {
      return 'Chrome';
    }
    if (typeof (window as any).InstallTrigger !== 'undefined') {
      return 'Firefox';
    }
    if (typeof (window as any).safari !== 'undefined') {
      return 'Safari';
    }
    if ((window as any).StyleMedia) {
      return 'Edge';
    }
    return undefined;
  }


  /**
   * Check if specific OS is detected
   * @param {OS} targetOS - OS to check
   * @returns {boolean}
   */
  static isOS(targetOS: OS): boolean {
    return this.detect().os === targetOS;
  }

  /**
   * Check if on mobile device
   * @returns {boolean}
   */
  static isMobile(): boolean {
    return this.detect().isMobile;
  }

  /**
   * Get detected browser
   * @returns {string | undefined}
   */
  static getBrowser(): string | undefined {
    return this.detect().browser;
  }
}

