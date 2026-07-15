import { defineCliConfig } from "sanity/cli";

import {
  sanityDataset,
  sanityProjectId,
  sanityStudioBasePath,
} from "./sanity/env";

export default defineCliConfig({
  api: {
    projectId: sanityProjectId || "missingproject",
    dataset: sanityDataset,
  },
  studioHost: "popeblack-editorial",
  project: {
    basePath: sanityStudioBasePath,
  },
});
