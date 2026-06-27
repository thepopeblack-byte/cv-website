import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = path.dirname(fileURLToPath(import.meta.url));
const localNextPackage = path.join(
  projectDir,
  "node_modules",
  "next",
  "package.json",
);
const workspaceRoot = fs.existsSync(localNextPackage)
  ? projectDir
  : path.dirname(projectDir);

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: workspaceRoot,
  turbopack: {
    root: workspaceRoot,
  },
};

export default nextConfig;
