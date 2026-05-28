# Node size updater archive

The node-size updater workflow was removed in PR #1501 because the scheduled
job was stale and its observability credentials were no longer maintained.

`config.json` is preserved here so the updater can be restored later without
reconstructing the previous node targets. The active updater script now keeps
those targets as a frozen in-code constant, so request parameters no longer flow
from a local JSON file into outbound Prometheus requests.

To restore the old file-backed configuration, move this file back to
`linea-node-size/config.json`, update `scripts/fetchNodeSize.js` to read it, and
restore a workflow or manual runner with the required observability credentials.
