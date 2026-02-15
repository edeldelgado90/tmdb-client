/**
 * Configuración de debug. Activar con EXPO_PUBLIC_DEBUG=true en .env
 * En desarrollo (__DEV__) está activo por defecto si no se define la variable.
 */
const envDebug = process.env.EXPO_PUBLIC_DEBUG;
const isExplicitlyEnabled = envDebug === 'true' || envDebug === '1';
const isExplicitlyDisabled = envDebug === 'false' || envDebug === '0';

export function isDebugEnabled(): boolean {
    if (isExplicitlyDisabled) return false;
    if (isExplicitlyEnabled) return true;
    return typeof __DEV__ !== 'undefined' && __DEV__;
}

export function debugLog(action: string, message: string, data?: unknown): void {
    if (!isDebugEnabled()) return;
    const prefix = `[DEBUG] ${action}`;
    if (data !== undefined) {
        console.log(prefix, message, data);
    } else {
        console.log(prefix, message);
    }
}

export function debugWarn(action: string, message: string, data?: unknown): void {
    if (!isDebugEnabled()) return;
    const prefix = `[DEBUG] ${action}`;
    if (data !== undefined) {
        console.warn(prefix, message, data);
    } else {
        console.warn(prefix, message);
    }
}

export function debugError(action: string, message: string, error?: unknown): void {
    if (!isDebugEnabled()) return;
    const prefix = `[DEBUG] ${action}`;
    console.error(prefix, message, error ?? '');
}
