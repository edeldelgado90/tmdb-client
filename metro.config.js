// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Evita que Metro use el build ESM de paquetes como zustand (import.meta), que
// rompe en web con "Cannot use 'import.meta' outside a module".
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
