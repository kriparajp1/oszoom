import { ZoomControllerConfig } from '../types';

/**
 * ConfigManager - Handles configuration and presets
 */
export class ConfigManager {
  private static readonly DEFAULT_CONFIG: ZoomControllerConfig = {
    windows: { enabled: false, zoomLevel: 1 },
    macos: { enabled: false, zoomLevel: 1 },
    linux: { enabled: false, zoomLevel: 1 },
    android: { enabled: false, zoomLevel: 1 },
    ios: { enabled: false, zoomLevel: 1 },
    debug: false,
    enableCSS: true,
    enableJavaScript: true
  };

  /**
   * Merge user config with defaults
   * @param {ZoomControllerConfig} userConfig - User provided configuration
   * @returns {ZoomControllerConfig} - Merged configuration
   */
  static mergeConfig(userConfig?: ZoomControllerConfig): ZoomControllerConfig {
    return {
      ...this.DEFAULT_CONFIG,
      ...userConfig
    };
  }

  /**
   * Configuration presets for common use cases
   */
  static presets = {
    /**
     * Only Windows at 80% zoom
     */
    windowsOnly: (): ZoomControllerConfig => ({
      windows: { enabled: true, zoomLevel: 0.8 },
      macos: { enabled: false, zoomLevel: 1 },
      linux: { enabled: false, zoomLevel: 1 },
      android: { enabled: false, zoomLevel: 1 },
      ios: { enabled: false, zoomLevel: 1 }
    }),

    /**
     * Only macOS at 80% zoom
     */
    macosOnly: (): ZoomControllerConfig => ({
      windows: { enabled: false, zoomLevel: 1 },
      macos: { enabled: true, zoomLevel: 0.8 },
      linux: { enabled: false, zoomLevel: 1 },
      android: { enabled: false, zoomLevel: 1 },
      ios: { enabled: false, zoomLevel: 1 }
    }),

    /**
     * All desktop systems at 80%
     */
    desktopOnly: (): ZoomControllerConfig => ({
      windows: { enabled: true, zoomLevel: 0.8 },
      macos: { enabled: true, zoomLevel: 0.8 },
      linux: { enabled: true, zoomLevel: 0.8 },
      android: { enabled: false, zoomLevel: 1 },
      ios: { enabled: false, zoomLevel: 1 }
    }),

    /**
     * All platforms at 80%
     */
    allPlatforms: (): ZoomControllerConfig => ({
      windows: { enabled: true, zoomLevel: 0.8 },
      macos: { enabled: true, zoomLevel: 0.8 },
      linux: { enabled: true, zoomLevel: 0.8 },
      android: { enabled: true, zoomLevel: 0.8 },
      ios: { enabled: true, zoomLevel: 0.8 }
    }),

    /**
     * Mobile only at 80%
     */
    mobileOnly: (): ZoomControllerConfig => ({
      windows: { enabled: false, zoomLevel: 1 },
      macos: { enabled: false, zoomLevel: 1 },
      linux: { enabled: false, zoomLevel: 1 },
      android: { enabled: true, zoomLevel: 0.8 },
      ios: { enabled: true, zoomLevel: 0.8 }
    })
  };
}

