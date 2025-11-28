// Export types
export type { OS, OSZoomConfig, ZoomControllerConfig, OSDetectionResult, ZoomState } from './types';

// Export core classes
export { OSDetector } from './core/OSDetector';
export { ZoomManager } from './core/ZoomManager';
export { ConfigManager } from './core/ConfigManager';

// Export utilities
export { CSSVariables } from './utils/cssVariables';

// Export adapters
export { OSZoom } from './adapters/VanillaAdapter';
export { useOSZoom as useOSZoomReact } from './adapters/ReactAdapter';
export { useOSZoom as useOSZoomVue } from './adapters/VueAdapter';
export { OSZoomService } from './adapters/AngularAdapter';

// Default export
import { OSZoom } from './adapters/VanillaAdapter';
export default OSZoom;

