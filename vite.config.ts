// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig as baseDefineConfig } from "@lovable.dev/vite-tanstack-config";

export default async (env) => {
  const config = await baseDefineConfig({
    tanstackStart: {
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
      // nitro/vite builds from this
      server: { entry: "server" },
    },
    vite: {
      resolve: {
        tsconfigPaths: true,
      },
    },
  })(env);

  // Filter out the vite-tsconfig-paths plugin to resolve the Vite 8 warning
  // as it is now supported natively via resolve.tsconfigPaths: true
  config.plugins = config.plugins.filter(
    (p) => p && p.name !== "vite-tsconfig-paths"
  );

  return config;
};
