// React-specific entry point
// Re-exports the hook with the expected name

export { useOSZoom as useOSZoomReact } from './adapters/ReactAdapter';
export { ConfigManager } from './core/ConfigManager';
export type { ZoomControllerConfig, ZoomState, OS, OSDetectionResult } from './types';

