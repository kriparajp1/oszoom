import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OSDetector } from '../core/OSDetector';
import { ZoomManager } from '../core/ZoomManager';
import { ConfigManager } from '../core/ConfigManager';
import { ZoomControllerConfig, ZoomState, OS, OSDetectionResult } from '../types';
import { CSSVariables } from '../utils/cssVariables';

/**
 * OSZoomService - Angular Service for OS Zoom Controller
 */
@Injectable({
  providedIn: 'root'
})
export class OSZoomService implements OnDestroy {
  private stateSubject = new BehaviorSubject<ZoomState>({
    currentZoom: 1,
    appliedOS: 'unknown',
    isActive: false
  });

  public state$: Observable<ZoomState> = this.stateSubject.asObservable();
  public osInfo: OSDetectionResult = OSDetector.detect();
  private zoomManager: ZoomManager;
  private cssVariables: CSSVariables;

  constructor(config?: ZoomControllerConfig) {
    this.cssVariables = new CSSVariables();
    this.zoomManager = new ZoomManager(ConfigManager.mergeConfig(config));
    this.initialize();
  }

  /**
   * Initialize the service
   * @private
   */
  private initialize(): void {
    this.cssVariables.injectCSS();
    this.zoomManager.apply(this.osInfo.os as OS);
    this.stateSubject.next(this.zoomManager.getState());
  }

  /**
   * Update zoom for specific OS
   * @param {OS} os - Operating system
   * @param {number} zoomLevel - Zoom level (0.5-2.0)
   */
  setZoom(os: OS, zoomLevel: number): void {
    this.zoomManager.setZoom(os, zoomLevel);
    this.stateSubject.next(this.zoomManager.getState());
  }

  /**
   * Get zoom level for OS
   * @param {OS} [os] - Operating system (optional)
   * @returns {number} - Zoom level
   */
  getZoom(os?: OS): number {
    return this.zoomManager.getZoom(os || this.osInfo.os);
  }

  /**
   * Reset zoom to 100%
   */
  reset(): void {
    this.zoomManager.reset();
    this.stateSubject.next(this.zoomManager.getState());
  }

  /**
   * Get current state
   * @returns {ZoomState}
   */
  getState(): ZoomState {
    return this.zoomManager.getState();
  }

  /**
   * Angular lifecycle hook - cleanup
   */
  ngOnDestroy(): void {
    this.cssVariables.removeCSS();
  }
}

