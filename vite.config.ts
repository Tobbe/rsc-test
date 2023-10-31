import fs from "node:fs";

import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

import type { NormalizedOutputOptions, OutputBundle, OutputChunk } from 'rollup'

function isOutputChunk(chunk: unknown): chunk is OutputChunk {
  return Array.isArray((chunk as OutputChunk).moduleIds)
}

const bannerPlugin = () => {
  return {
    name: 'banner',
    async writeBundle (_options: NormalizedOutputOptions, bundle: OutputBundle) {
      for (const [fileName, bundleInfo] of Object.entries(bundle)) {
        if (!isOutputChunk(bundleInfo)) {
          return
        }

        const code = fs.readFileSync(bundleInfo.moduleIds[0], { encoding: 'utf8' })
        if (code.startsWith('"use client"') || code.startsWith("'use client'")) {
          let data = fs.readFileSync(`./dist/${fileName}`, { encoding: 'utf8' })
          data = `"use client";\n${data}`
          fs.writeFileSync(`./dist/${fileName}`, data)
        }
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), dts({ include: ["lib"] })],
  build: {
    lib: {
      name: "RscTest",
      fileName: (format) => `rsc-test.${format}.js`,
      entry: resolve(__dirname, "lib/main.ts"),
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
      plugins: [
        bannerPlugin(),
      ],
    },
  },
});
