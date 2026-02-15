// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Evita que Metro use el build ESM de paquetes como zustand (import.meta), que
// rompe en web con "Cannot use 'import.meta' outside a module".
config.resolver.unstable_enablePackageExports = false;

// Con unstable_enablePackageExports=false, Metro usa "main" de axios (build Node),
// que requiere "crypto" y falla en React Native. Forzamos la build browser.
const axiosBrowserPath = path.resolve(
  __dirname,
  'node_modules/axios/dist/browser/axios.cjs'
);
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'axios') {
    return { type: 'sourceFile', filePath: axiosBrowserPath };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
