export type Language = "curl" | "ethers" | "viem";

export const LANGUAGES: { id: Language; label: string; prism: string }[] = [
  { id: "curl", label: "Curl", prism: "bash" },
  { id: "ethers", label: "Ethers.js", prism: "javascript" },
  { id: "viem", label: "Viem", prism: "javascript" },
];

type Renderer = (method: string, params: unknown[], endpoint: string) => string;

const RENDERERS: Record<Language, Renderer> = {
  curl: (method, params, endpoint) => {
    const body = JSON.stringify(
      { jsonrpc: "2.0", method, params, id: 1 },
      null,
      2,
    );
    // Escape single quotes for shell so an apostrophe inside a param value
    // can't break out of the `-d '...'` quoting.
    const shellBody = body.replace(/'/g, "'\\''");
    return `curl ${endpoint} \\
  -X POST \\
  -H "Content-Type: application/json" \\
  -d '${shellBody}'`;
  },

  ethers: (method, params, endpoint) =>
    `import { JsonRpcProvider } from 'ethers';

const provider = new JsonRpcProvider('${endpoint}');
const result = await provider.send('${method}', ${JSON.stringify(params, null, 2)});
console.log(result);`,

  viem: (method, params, endpoint) =>
    `import { createPublicClient, http } from 'viem';
import { linea } from 'viem/chains';

const client = createPublicClient({
  chain: linea,
  transport: http('${endpoint}'),
});
const result = await client.request({
  method: '${method}',
  params: ${JSON.stringify(params, null, 2)},
});
console.log(result);`,
};

export const renderCode = (
  lang: Language,
  method: string,
  params: unknown[],
  endpoint: string,
): string => RENDERERS[lang](method, params, endpoint);
