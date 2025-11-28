import { OSDetector } from '../core/OSDetector';
import { ZoomManager } from '../core/ZoomManager';
import { ConfigManager } from '../core/ConfigManager';
import { ZoomControllerConfig, OS } from '../types';
import { CSSVariables } from '../utils/cssVariables';

/**
 * OSZoom - Vanilla HTML/JavaScript adapter
 * Main class for vanilla JavaScript integration
 */
export class OSZoom {
  private osDetector: typeof OSDetector;
  private zoomManager: ZoomManager;
  private cssVariables: CSSVariables;

  // Static reference to ConfigManager for presets
  static ConfigManager = ConfigManager;

  constructor(config?: ZoomControllerConfig) {
    this.osDetector = OSDetector;
    this.cssVariables = new CSSVariables();
    const mergedConfig = ConfigManager.mergeConfig(config);
    this.zoomManager = new ZoomManager(mergedConfig);
    this.initialize(mergedConfig);
  }

  /**
   * Initialize the controller
   * @private
   */
  private initialize(config: ZoomControllerConfig): void {
    // Inject CSS variables
    this.cssVariables.injectCSS();

    // Detect OS and apply zoom
    const osInfo = this.osDetector.detect();
    this.zoomManager.apply(osInfo.os);

    if (config.debug) {
      console.log('[OSZoom] Initialized:', osInfo);
      console.log('[OSZoom] Config:', config);
      console.log('[OSZoom] State:', this.zoomManager.getState());
    }
  }

  /**
   * Update zoom for specific OS
   * @param {OS} os - Operating system
   * @param {number} zoomLevel - Zoom level (0.5-2.0)
   */
  setZoom(os: OS, zoomLevel: number): void {
    this.zoomManager.setZoom(os, zoomLevel);
  }

  /**
   * Get current zoom level
   * @param {OS} [os] - Operating system (optional)
   * @returns {number} - Zoom level
   */
  getZoom(os?: OS): number {
    if (!os) {
      return this.zoomManager.getState().currentZoom;
    }
    return this.zoomManager.getZoom(os);
  }

  /**
   * Reset zoom to 100%
   */
  reset(): void {
    this.zoomManager.reset();
  }

  /**
   * Get detected OS information
   * @returns {Object} - OS detection result
   */
  getOSInfo() {
    return this.osDetector.detect();
  }

  /**
   * Get current zoom state
   * @returns {Object} - Current zoom state
   */
  getState() {
    return this.zoomManager.getState();
  }

  /**
   * Destroy controller and cleanup
   */
  destroy(): void {
    this.reset();
    this.cssVariables.removeCSS();
  }
}

