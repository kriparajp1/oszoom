// Vanilla-only entry point for UMD builds
// This excludes framework-specific adapters

import { OSZoom } from './adapters/VanillaAdapter';
import { ConfigManager } from './core/ConfigManager';
import { OSDetector } from './core/OSDetector';
import { ZoomManager } from './core/ZoomManager';
import { CSSVariables } from './utils/cssVariables';

// Attach static properties to OSZoom class for UMD compatibility
(OSZoom as any).ConfigManager = ConfigManager;
(OSZoom as any).OSDetector = OSDetector;
(OSZoom as any).ZoomManager = ZoomManager;
(OSZoom as any).CSSVariables = CSSVariables;

// Default export only (for UMD with exports: 'default')
// Other exports are available as static properties on OSZoom
export default OSZoom;

