import type { Config } from 'tailwindcss'

/**
 * Design tokens live as CSS variables in src/styles/tokens.css.
 * Tailwind reads them here so `bg-champagne`, `text-espresso` etc. work
 * and opacity modifiers (`bg-chestnut/20`) still function.
 */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        champagne: { DEFAULT: token('champagne'), deep: token('champagne-deep') },
        chestnut: { DEFAULT: token('chestnut'), shade: token('chestnut-shade') },
        espresso: token('espresso'),
        blush: { DEFAULT: token('blush'), soft: token('blush-soft') },
        rose: { DEFAULT: token('rose'), shade: token('rose-shade'), strong: token('rose-strong'), tint: token('rose-tint') },
        terracotta: { DEFAULT: token('terracotta'), shade: token('terracotta-shade'), strong: token('terracotta-strong'), tint: token('terracotta-tint') },
        gold: { DEFAULT: token('gold'), shade: token('gold-shade'), strong: token('gold-strong'), tint: token('gold-tint') },
        cornflower: { DEFAULT: token('cornflower'), shade: token('cornflower-shade'), strong: token('cornflower-strong'), tint: token('cornflower-tint') },
        sage: { DEFAULT: token('sage'), shade: token('sage-shade'), strong: token('sage-strong'), tint: token('sage-tint') },
        teal: { DEFAULT: token('teal'), shade: token('teal-shade'), strong: token('teal-strong'), tint: token('teal-tint') },
        accent: { DEFAULT: token('accent'), shade: token('accent-shade'), strong: token('accent-strong'), tint: token('accent-tint') },
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Editorial scale: comfortable body, very large display.
        body: ['1.0625rem', { lineHeight: '1.7' }], // 17px
        'body-lg': ['1.125rem', { lineHeight: '1.7' }], // 18px
        'display-sm': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2.75rem, 6vw, 4.75rem)', { lineHeight: '1', letterSpacing: '-0.025em' }],
        'display-xl': ['clamp(3.5rem, 12vw, 10.5rem)', { lineHeight: '0.92', letterSpacing: '-0.035em' }],
      },
      boxShadow: {
        // Warm, soft shadows so objects feel like they sit on a surface.
        object: '0 2px 4px rgb(var(--espresso) / 0.12), 0 10px 24px -8px rgb(var(--espresso) / 0.28)',
        lifted: '0 6px 10px rgb(var(--espresso) / 0.14), 0 28px 48px -12px rgb(var(--espresso) / 0.38)',
        panel: '-24px 0 64px -24px rgb(var(--espresso) / 0.35)',
      },
      transitionTimingFunction: {
        workbench: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      ringColor: { DEFAULT: token('blush') },
    },
  },
  plugins: [],
} satisfies Config
