import { OS, OSDetectionResult } from '../types';

/**
 * OSDetector - Detects operating system from user agent
 */
export class OSDetector {
  /**
   * Detect operating system from user agent
   * @returns {OSDetectionResult} - Detected OS information
   */
  static detect(): OSDetectionResult {
    const userAgent = navigator.userAgent.toLowerCase();

    let os: OS = 'unknown';
    let version: string | undefined;
    let isMobile = false;
    let browser: string | undefined;

    // Detect Browser
    if (userAgent.includes('edg')) {
      browser = 'Edge';
    } else if (userAgent.includes('chrome')) {
      browser = 'Chrome';
    } else if (userAgent.includes('firefox')) {
      browser = 'Firefox';
    } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
      browser = 'Safari';
    }

    // Detect OS
    if (userAgent.includes('win')) {
      os = 'windows';
      const match = userAgent.match(/windows nt ([\d.]+)/);
      if (match) {
        const versionNum = parseFloat(match[1]);
        if (versionNum === 10.0) {
          version = userAgent.includes('windows nt 10.0; win64')
            ? 'Windows 11'
            : 'Windows 10';
        } else if (versionNum === 6.3) {
          version = 'Windows 8.1';
        } else if (versionNum === 6.2) {
          version = 'Windows 8';
        } else if (versionNum === 6.1) {
          version = 'Windows 7';
        }
      }
    } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
      os = 'ios';
      isMobile = true;
      const match = userAgent.match(/os (\d+)_(\d+)/);
      if (match) {
        version = `${match[1]}.${match[2]}`;
      }
    } else if (userAgent.includes('android')) {
      os = 'android';
      isMobile = true;
      const match = userAgent.match(/android ([\d.]+)/);
      if (match) {
        version = match[1];
      }
    } else if (userAgent.includes('mac')) {
      os = 'macos';
      const match = userAgent.match(/mac os x ([\d_]+)/);
      if (match) {
        version = match[1].replace(/_/g, '.');
      }
    } else if (userAgent.includes('linux')) {
      os = 'linux';
    }

    return {
      os,
      version,
      isMobile,
      browser,
      userAgent: navigator.userAgent
    };
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

