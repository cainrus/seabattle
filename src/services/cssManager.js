import { useState } from "react";

export function useCssVars() {
  const [ cssVars, setCssVars ] = useState(getCssVars());

  return {
    cssVars,
    setCssVars,
  }
}

let cachedCssVars = null;
function getCssVars() {
  const rootStyles = getComputedStyle(document.documentElement);
  if (cachedCssVars !== null) return cachedCssVars;
  cachedCssVars = {};
  for (const propertyName of rootStyles) {
    if (propertyName.startsWith('--')) {
      cachedCssVars[propertyName] = rootStyles.getPropertyValue(propertyName).trim();
    }
  }

  return {...cachedCssVars};
}
