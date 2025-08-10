import type { NitroApp } from 'nitropack';
import { defineNitroPlugin } from 'nitropack/runtime/internal/plugin';

export default defineNitroPlugin((nitroApp: NitroApp) => {
  nitroApp.hooks.hook('render:response', (response) => {
    if (!response.headers) return;

    const colorSchemeCH = 'Sec-CH-Prefers-Color-Scheme';

    // Append to Accept-CH
    const acceptCH = response.headers['Accept-CH'];
    response.headers['Accept-CH'] = acceptCH ? `${acceptCH}, ${colorSchemeCH}` : colorSchemeCH;

    // Append to Vary
    const vary = response.headers['Vary'];
    response.headers['Vary'] = vary ? `${vary}, ${colorSchemeCH}` : colorSchemeCH;

    // Allow Client Hint in all contexts (optional)
    const permissionsPolicy = response.headers['Permissions-Policy'];
    const newPolicy = 'ch-prefers-color-scheme=*';
    response.headers['Permissions-Policy'] = permissionsPolicy
      ? `${permissionsPolicy}, ${newPolicy}`
      : newPolicy;
  });
});
