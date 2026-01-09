import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import edgeone from '@edgeone/astro';

// https://astro.build/config
export default defineConfig({
  /*
  Currently it is deployed on Tencent Cloud EdgeOne, on an Asia-based Pages platform (the author is also based in Asia).
  If you want to deploy to GitHub Pages, the `site`, `base` and `build.format` fields below help Astro output a directory compatible
  with Pages. Keep the `adapter` if you still need EdgeOne for other deploy targets — remove it if you only target GitHub Pages.
  */
  site: 'https://amadeo86.github.io',
  title: 'Ramón Amadeo | Tech con Impacto',
  description: 'Técnico en Sistemas, innovador frugal y creador de soluciones tech para desarrollo local.',
  base: '/',
  build: {
    format: 'directory'
  },
  // SEO mejorado
  integrations: [
    tailwind()
  ],
  // Markdown con syntax highlighting
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  adapter: edgeone(),
  server: {
    port: 4321,
    host: true
  },
  devToolbar: {
    enabled: false
  },
  vite: {
    build: {
      minify: 'terser',
      cssMinify: true
    },
    server: {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    }
  }
});
