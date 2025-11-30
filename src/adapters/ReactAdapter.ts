import { useEffect, useState, useRef } from 'react';
import { OSDetector } from '../core/OSDetector';
import { ZoomManager } from '../core/ZoomManager';
import { ConfigManager } from '../core/ConfigManager';
import { ZoomControllerConfig, ZoomState, OS, OSDetectionResult } from '../types';
import { CSSVariables } from '../utils/cssVariables';

/**
 * useOSZoom - React Hook for OS Zoom Controller
 * @param {ZoomControllerConfig} config - Configuration object
 * @returns {Object} - Hook API with state and methods
 */
export function useOSZoom(config?: ZoomControllerConfig) {
  const [state, setState] = useState<ZoomState>({
    currentZoom: 1,
    appliedOS: 'unknown',
    isActive: false
  });

  const [osInfo, setOsInfo] = useState<OSDetectionResult>({
    os: 'unknown',
    isMobile: false,
    browser: undefined
  });
  const zoomManagerRef = useRef<ZoomManager | null>(null);
  const cssVariablesRef = useRef<CSSVariables | null>(null);

  useEffect(() => {
    // Only run on client side (SSR-safe)
    if (typeof window === 'undefined') {
      return;
    }

    // Detect OS on client side only
    const detectedOSInfo = OSDetector.detect();
    setOsInfo(detectedOSInfo);

    // Initialize managers
    zoomManagerRef.current = new ZoomManager(ConfigManager.mergeConfig(config));
    cssVariablesRef.current = new CSSVariables();

    // Inject CSS
    cssVariablesRef.current.injectCSS();

    // Apply zoom based on detected OS
    const detectedOS = detectedOSInfo.os;
    zoomManagerRef.current.apply(detectedOS as OS);
    setState(zoomManagerRef.current.getState());

    if (config?.debug) {
      console.log('[useOSZoom] Initialized:', detectedOSInfo);
    }

    return () => {
      if (cssVariablesRef.current) {
        cssVariablesRef.current.removeCSS();
      }
    };
  }, []);

  const setZoom = (os: OS, zoomLevel: number) => {
    if (zoomManagerRef.current) {
      zoomManagerRef.current.setZoom(os, zoomLevel);
      setState(zoomManagerRef.current.getState());
    }
  };

  const getZoom = (os?: OS) => {
    if (!zoomManagerRef.current) return 1;
    return zoomManagerRef.current.getZoom(os || osInfo.os);
  };

  const reset = () => {
    if (zoomManagerRef.current) {
      zoomManagerRef.current.reset();
      setState(zoomManagerRef.current.getState());
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

