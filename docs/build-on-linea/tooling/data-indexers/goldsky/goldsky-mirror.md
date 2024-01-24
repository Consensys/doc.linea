---
title: Quickstart - Mirror
sidebar_position: 3
---

To get started with Goldsky Mirror:

1. Create an account at **[app.goldsky.com](https://app.goldsky.com/)**.
2. Choose a plan that best fits your needs.
3. Create an API key on the **[Settings page](https://app.goldsky.com/dashboard/settings)**.
4. Install the Goldsky CLI:

   ```bash
   npm install -g @goldskycom/cli
   ```

5. Log in with the API key created earlier:

   ```bash
   goldsky login
   ```

6. Use the following command to walk through a guided experience to create pipelines. Based on the input you provide, the CLI will generate a pipeline definition for you behind the scenes.

   ```bash
   goldsky pipeline create <your-pipeline-name>
   ```

7. Upon successfully walking through the CLI, an active pipeline will be created and data should appear in the destination sink shortly. A monitoring table will automatically be displayed, or can be activated using the following command:

   ```bash
   goldsky pipeline monitor <your-pipeline-name>
   ```

8. For greater flexibility, Mirror pipelines can be defined via JSON configuration files. For more detail and full reference information on how to define pipelines, data sources, transformations, and sinks via JSON - visit [Goldsky’s docs](https://docs.goldsky.com/mirror/references/pipeline-configuration).
