/**
 * Supported Operating Systems
 */
export type OS = 'windows' | 'macos' | 'linux' | 'android' | 'ios' | 'unknown';

/**
 * Zoom configuration for specific OS
 */
export interface OSZoomConfig {
  enabled: boolean;
  zoomLevel: number; // 0.5 to 2.0 (50% to 200%)
}

/**
 * Global configuration for all OS
 */
export interface ZoomControllerConfig {
  windows?: OSZoomConfig;
  macos?: OSZoomConfig;
  linux?: OSZoomConfig;
  android?: OSZoomConfig;
  ios?: OSZoomConfig;
  debug?: boolean;
  enableCSS?: boolean;
  enableJavaScript?: boolean;
}

/**
 * Default configuration
 */
export interface DefaultConfig {
  [key: string]: OSZoomConfig;
}

/**
 * OS Detection Result
 */
export interface OSDetectionResult {
  os: OS;
  version?: string;
  isMobile: boolean;
  browser?: string;
}

/**
 * Zoom state
 */
export interface ZoomState {
  currentZoom: number;
  appliedOS: OS;
  isActive: boolean;
}

