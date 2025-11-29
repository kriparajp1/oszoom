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
   * 
   * This is the most flexible approach - only sets the scale factor,
   * and CSS calc() handles all the calculations automatically.
   * This maintains clean responsive behavior and avoids whitespace issues.
   */
  setScaleFactor(factor: number): void {
    const root = document.documentElement;

    // Only set the scale factor - CSS calc() handles the rest
    // This is the most flexible and maintainable approach
    root.style.setProperty(CSSVariables.CSS_VARIABLES.scaleFactor, factor.toString());
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
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      :root {
        /* Scaling variable - adjust this to change overall size */
        ${CSSVariables.CSS_VARIABLES.scaleFactor}: 1;
        
        /* Base font size (scales based on factor) */
        ${CSSVariables.CSS_VARIABLES.baseFontSize}: calc(16px * var(${CSSVariables.CSS_VARIABLES.scaleFactor}));
        ${CSSVariables.CSS_VARIABLES.headingSize}: calc(32px * var(${CSSVariables.CSS_VARIABLES.scaleFactor}));
        ${CSSVariables.CSS_VARIABLES.spacingUnit}: calc(20px * var(${CSSVariables.CSS_VARIABLES.scaleFactor}));
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
        font-size: var(${CSSVariables.CSS_VARIABLES.baseFontSize});
        line-height: 1.6;
        margin-bottom: calc(var(${CSSVariables.CSS_VARIABLES.spacingUnit}) * 0.5);
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

