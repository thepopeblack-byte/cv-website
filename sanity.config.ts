"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import {
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
  sanityStudioBasePath,
} from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "popeblack_portfolio",
  title: "Kayode Popoola Editorial Studio",
  basePath: sanityStudioBasePath,
  projectId: sanityProjectId || "missingproject",
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
