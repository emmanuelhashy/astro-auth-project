// @ts-check
import { defineConfig } from 'astro/config';
import auth from "auth-astro";
import react from "@astrojs/react";
import db from '@astrojs/db';

import netlify from "@astrojs/netlify";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [db(), auth({
    configFile: './auth.config.mts'  // Explicitly specify the .mts extension
  }), react()],
  output: "server", 
  adapter: netlify(),

  vite: {
    plugins: [tailwindcss()]
  }
});