/**
 * Astro integration — valida env vars no build start
 * Falha fast se PUBLIC_CHECKOUT_URL inválida (formato wa.me/...)
 */
import { config as loadEnv } from 'dotenv';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

export default function validateEnv() {
  return {
    name: 'uni-ia-validate-env',
    hooks: {
      'astro:config:setup': ({ config }) => {
        // Carrega .env do root do projeto
        loadEnv({ path: resolve(fileURLToPath(config.root), '.env') });
      },
      'astro:build:start': () => {
        const checkoutUrl = process.env.PUBLIC_CHECKOUT_URL || '';
        const waPattern = /^https?:\/\/(wa\.me|api\.whatsapp\.com)\//;

        if (!checkoutUrl) {
          throw new Error(
            '\n[UNI IA] PUBLIC_CHECKOUT_URL não definida.\n' +
            'Defina no .env (local) ou Vercel dashboard (prod).\n' +
            'Formato esperado: https://wa.me/{numero}?text=...\n'
          );
        }

        if (!waPattern.test(checkoutUrl)) {
          throw new Error(
            `\n[UNI IA] PUBLIC_CHECKOUT_URL inválida: "${checkoutUrl}"\n` +
            'Formato esperado: https://wa.me/... ou https://api.whatsapp.com/...\n'
          );
        }

        const lote = process.env.PUBLIC_LOTE_ATIVO || '1';
        if (!['1', '2', '3'].includes(lote)) {
          throw new Error(
            `\n[UNI IA] PUBLIC_LOTE_ATIVO inválido: "${lote}". Use 1, 2 ou 3.\n`
          );
        }

        console.log(`✓ [UNI IA] env vars válidas · lote ativo = ${lote}`);
      },
    },
  };
}
