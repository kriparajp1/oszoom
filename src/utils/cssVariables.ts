/**
 * CSSVariables - Manages CSS custom properties for zoom scaling
 */
export class CSSVariables {
  private static readonly CSS_VARIABLES = {
    scaleFactor: '--scale-factor',
    baseFontSize: '--base-font-size',
    headingSize: '--heading-size',
    spacingUnit: '--spacing-unit',
    lineHeight: '--line-height',
    borderRadius: '--border-radius'
  };

  /**
   * Set scale factor CSS variable
   * @param {number} factor - Scale factor (0.5-2.0)
   */
  setScaleFactor(factor: number): void {
    const root = document.documentElement;

    // Set primary scale factor
    root.style.setProperty(CSSVariables.CSS_VARIABLES.scaleFactor, factor.toString());

    // Set calculated values
    root.style.setProperty(
      CSSVariables.CSS_VARIABLES.baseFontSize,
      `calc(16px * ${factor})`
    );
    root.style.setProperty(
      CSSVariables.CSS_VARIABLES.headingSize,
      `calc(32px * ${factor})`
    );
    root.style.setProperty(
      CSSVariables.CSS_VARIABLES.spacingUnit,
      `calc(20px * ${factor})`
    );
    root.style.setProperty(
      CSSVariables.CSS_VARIABLES.lineHeight,
      `calc(1.6 * ${factor})`
    );
    root.style.setProperty(
      CSSVariables.CSS_VARIABLES.borderRadius,
      `calc(8px * ${factor})`
    );
  }

  /**
   * Inject CSS variables into document
   */
  injectCSS(): void {
    if (document.getElementById('oszoom-styles')) {
      return; // Already injected
    }

    const style = document.createElement('style');
    style.id = 'oszoom-styles';
    style.textContent = `
      :root {
        ${CSSVariables.CSS_VARIABLES.scaleFactor}: 1;
        ${CSSVariables.CSS_VARIABLES.baseFontSize}: calc(16px * var(${CSSVariables.CSS_VARIABLES.scaleFactor}));
        ${CSSVariables.CSS_VARIABLES.headingSize}: calc(32px * var(${CSSVariables.CSS_VARIABLES.scaleFactor}));
        ${CSSVariables.CSS_VARIABLES.spacingUnit}: calc(20px * var(${CSSVariables.CSS_VARIABLES.scaleFactor}));
        ${CSSVariables.CSS_VARIABLES.lineHeight}: calc(1.6 * var(${CSSVariables.CSS_VARIABLES.scaleFactor}));
        ${CSSVariables.CSS_VARIABLES.borderRadius}: calc(8px * var(${CSSVariables.CSS_VARIABLES.scaleFactor}));
      }
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      html {
        font-size: var(${CSSVariables.CSS_VARIABLES.baseFontSize});
      }
      h1 {
        font-size: var(${CSSVariables.CSS_VARIABLES.headingSize});
        margin-bottom: var(${CSSVariables.CSS_VARIABLES.spacingUnit});
      }
      h2, h3, h4, h5, h6 {
        margin-bottom: calc(var(${CSSVariables.CSS_VARIABLES.spacingUnit}) * 0.75);
      }
      p {
        line-height: var(${CSSVariables.CSS_VARIABLES.lineHeight});
        margin-bottom: calc(var(${CSSVariables.CSS_VARIABLES.spacingUnit}) * 0.5);
      }
      button, input, select, textarea {
        border-radius: var(${CSSVariables.CSS_VARIABLES.borderRadius});
      }
    `;

    document.head.appendChild(style);
  }

  /**
   * Remove injected CSS
   */
  removeCSS(): void {
    const style = document.getElementById('oszoom-styles');
    if (style) {
      style.remove();
    }
  }

  /**
   * Get current CSS variable value
   * @param {string} variableName - CSS variable name
   * @returns {string} - Variable value
   */
  getVariable(variableName: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
  }
}

