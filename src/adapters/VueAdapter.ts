import { ref, Ref, onMounted, onUnmounted } from 'vue';
import { OSDetector } from '../core/OSDetector';
import { ZoomManager } from '../core/ZoomManager';
import { ConfigManager } from '../core/ConfigManager';
import { ZoomControllerConfig, ZoomState, OS, OSDetectionResult } from '../types';
import { CSSVariables } from '../utils/cssVariables';

/**
 * useOSZoom - Vue 3 Composable for OS Zoom Controller
 * @param {ZoomControllerConfig} config - Configuration object
 * @returns {Object} - Composable API with reactive state and methods
 */
export function useOSZoom(config?: ZoomControllerConfig) {
  const state: Ref<ZoomState> = ref({
    currentZoom: 1,
    appliedOS: 'unknown',
    isActive: false
  });

  const osInfo: Ref<OSDetectionResult> = ref(OSDetector.detect());
  let zoomManager: ZoomManager | null = null;
  const cssVariables = new CSSVariables();

  onMounted(() => {
    zoomManager = new ZoomManager(ConfigManager.mergeConfig(config));
    cssVariables.injectCSS();
    zoomManager.apply(osInfo.value.os as OS);
    state.value = zoomManager.getState();

    if (config?.debug) {
      console.log('[useOSZoom] Vue - Initialized:', osInfo.value);
    }
  });

  onUnmounted(() => {
    cssVariables.removeCSS();
  });

  const setZoom = (os: OS, zoomLevel: number) => {
    if (zoomManager) {
      zoomManager.setZoom(os, zoomLevel);
      state.value = zoomManager.getState();
    }
  };

  const getZoom = (os?: OS): number => {
    if (!zoomManager) return 1;
    return zoomManager.getZoom(os || osInfo.value.os);
  };

  const reset = () => {
    if (zoomManager) {
      zoomManager.reset();
      state.value = zoomManager.getState();
    }
  };

  return {
    state,
    osInfo,
    setZoom,
    getZoom,
    reset
  };
}

