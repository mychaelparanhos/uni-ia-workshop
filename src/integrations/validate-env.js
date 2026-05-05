/**
 * Astro integration — valida env vars no build start
 * Aceita formato wa.me/ OU checkout.ticto.app/ OU outros gateways
 * (Stripe, Pagar.me, Hotmart, Eduzz)
 */
import { config as loadEnv } from 'dotenv';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

export default function validateEnv() {
  return {
    name: 'uni-ia-validate-env',
    hooks: {
      'astro:config:setup': ({ config }) => {
        loadEnv({ path: resolve(fileURLToPath(config.root), '.env') });
      },
      'astro:build:start': () => {
        const checkoutUrl = (process.env.PUBLIC_CHECKOUT_URL || '').trim();

        if (!checkoutUrl) {
          throw new Error(
            '\n[UNI IA] PUBLIC_CHECKOUT_URL não definida.\n' +
            'Defina no .env (local) ou Vercel dashboard (prod).\n'
          );
        }

        // Whitelist de hosts aceitos pra checkout
        const validPattern = /^https?:\/\/(wa\.me|api\.whatsapp\.com|checkout\.ticto\.app|pay\.hotmart\.com|sun\.eduzz\.com|pagar\.me|checkout\.stripe\.com|buy\.stripe\.com)\//;

        if (!validPattern.test(checkoutUrl)) {
          throw new Error(
            `\n[UNI IA] PUBLIC_CHECKOUT_URL host inválido: "${checkoutUrl}"\n` +
            'Hosts aceitos: wa.me, api.whatsapp.com, checkout.ticto.app, pay.hotmart.com, sun.eduzz.com, pagar.me, checkout.stripe.com, buy.stripe.com\n'
          );
        }

        const lote = (process.env.PUBLIC_LOTE_ATIVO || '1').trim();
        if (!['1', '2', '3'].includes(lote)) {
          throw new Error(
            `\n[UNI IA] PUBLIC_LOTE_ATIVO inválido: "${lote}". Use 1, 2 ou 3.\n`
          );
        }

        console.log(`✓ [UNI IA] env vars válidas · checkout = ${new URL(checkoutUrl).host} · lote ativo = ${lote}`);
      },
    },
  };
}
