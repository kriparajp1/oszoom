import { ZoomState, OS, OSZoomConfig, ZoomControllerConfig } from '../types';
import { CSSVariables } from '../utils/cssVariables';

/**
 * ZoomManager - Handles zoom application and management
 */
export class ZoomManager {
  private state: ZoomState;
  private config: ZoomControllerConfig;
  private cssVariables: CSSVariables;

  constructor(config: ZoomControllerConfig = {}) {
    this.config = config;
    this.cssVariables = new CSSVariables();
    this.state = {
      currentZoom: 1,
      appliedOS: 'unknown',
      isActive: false
    };
  }

  /**
   * Apply zoom based on OS
   * @param {OS} os - Operating system
   */
  apply(os: OS): void {
    const osConfig = this.getOSConfig(os);
    if (!osConfig.enabled) {
      this.log(`Zoom disabled for ${os}`);
      return;
    }

    this.state.currentZoom = osConfig.zoomLevel;
    this.state.appliedOS = os;
    this.state.isActive = true;

    this.applyZoom(osConfig.zoomLevel);

    this.log(`Applied ${osConfig.zoomLevel * 100}% zoom for ${os}`);
  }

  /**
   * Apply CSS variables zoom
   * @private
   */
  private applyZoom(zoomLevel: number): void {
    if (this.config.enableCSS !== false) {
      this.cssVariables.setScaleFactor(zoomLevel);
    }

    if (this.config.enableJavaScript !== false) {
      this.applyJavaScriptZoom(zoomLevel);
    }
  }

  /**
   * Apply JavaScript-based zoom (using CSS variables only)
   * @private
   */
  private applyJavaScriptZoom(zoomLevel: number): void {
    // CSS variables approach - no need for zoom or transform
    // The CSS variables handle all scaling through calc()
    // This is more flexible and maintainable
  }

  /**
   * Update zoom dynamically
   * @param {OS} os - Operating system
   * @param {number} zoomLevel - Zoom level (0.5 - 2.0)
   */
  setZoom(os: OS, zoomLevel: number): void {
    if (zoomLevel < 0.5 || zoomLevel > 2) {
      this.log('Zoom level must be between 0.5 and 2.0');
      return;
    }

    const config = this.getOSConfig(os);
    config.zoomLevel = zoomLevel;
    this.apply(os);
  }

  /**
   * Get zoom level for OS
   * @param {OS} os - Operating system
   * @returns {number} - Zoom level
   */
  getZoom(os: OS): number {
    return this.getOSConfig(os).zoomLevel;
  }

  /**
   * Reset zoom to 100%
   */
  reset(): void {
    this.state.currentZoom = 1;
    this.state.isActive = false;

    // Reset CSS variable to 1 (100%)
    this.cssVariables.setScaleFactor(1);

    this.log('Zoom reset to 100%');
  }

  /**
   * Get current state
   * @returns {ZoomState}
   */
  getState(): ZoomState {
    return { ...this.state };
  }

  /**
   * Get OS configuration
   * @private
   */
  private getOSConfig(os: OS): OSZoomConfig {
    const defaultConfig: OSZoomConfig = {
      enabled: true,
      zoomLevel: 1
    };

    return (this.config as any)[os] || defaultConfig;
  }

  /**
   * Check if Firefox
   * @private
   */
  private isFirefox(): boolean {
    return navigator.userAgent.toLowerCase().includes('firefox');
  }

  /**
   * Logging utility
   * @private
   */
  private log(message: string): void {
    if (this.config.debug) {
      console.log(`[OSZoom] ${message}`);
    }
  }
}

