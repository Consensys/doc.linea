/**
 * Convert a GitHub edit URL to a raw content URL.
 * Supports standard GitHub URLs (github.com/owner/repo/tree/branch/path).
 *
 * @example
 * getGitHubRawUrl('https://github.com/Consensys/doc.linea/tree/main/docs/index.mdx')
 * // => 'https://raw.githubusercontent.com/Consensys/doc.linea/main/docs/index.mdx'
 */
export function getGitHubRawUrl(
  editUrl: string | null | undefined,
): string | null {
  if (!editUrl) return null;

  // Pattern: https://github.com/{owner}/{repo}/tree/{branch}/{path}
  const match = editUrl.match(
    /github\.com\/([^/]+)\/([^/]+)\/tree\/([^/]+)\/(.+)/,
  );
  if (!match) return null;

  const [, owner, repo, branch, path] = match;
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
}
