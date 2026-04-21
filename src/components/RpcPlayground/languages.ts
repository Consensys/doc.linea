export type Language = "curl" | "ethers" | "viem";

export const LANGUAGES: { id: Language; label: string; prism: string }[] = [
  { id: "curl", label: "Curl", prism: "bash" },
  { id: "ethers", label: "Ethers.js", prism: "javascript" },
  { id: "viem", label: "Viem", prism: "javascript" },
];

const paramsPretty = (params: unknown[]): string =>
  JSON.stringify(params, null, 2);

function renderCurl(
  method: string,
  params: unknown[],
  endpoint: string,
): string {
  const body = JSON.stringify(
    { jsonrpc: "2.0", method, params, id: 1 },
    null,
    2,
  );
  return `curl ${endpoint} \\
  -X POST \\
  -H "Content-Type: application/json" \\
  -d '${body}'`;
}

function renderEthers(
  method: string,
  params: unknown[],
  endpoint: string,
): string {
  const paramsLiteral = paramsPretty(params);
  return `import { JsonRpcProvider } from 'ethers';

const provider = new JsonRpcProvider('${endpoint}');
const result = await provider.send('${method}', ${paramsLiteral});
console.log(result);`;
}

function renderViem(
  method: string,
  params: unknown[],
  endpoint: string,
): string {
  const paramsLiteral = paramsPretty(params);
  return `import { createPublicClient, http } from 'viem';
import { linea } from 'viem/chains';

const client = createPublicClient({
  chain: linea,
  transport: http('${endpoint}'),
});
const result = await client.request({
  method: '${method}',
  params: ${paramsLiteral},
});
console.log(result);`;
}

export function renderCode(
  lang: Language,
  method: string,
  params: unknown[],
  endpoint: string,
): string {
  switch (lang) {
    case "curl":
      return renderCurl(method, params, endpoint);
    case "ethers":
      return renderEthers(method, params, endpoint);
    case "viem":
      return renderViem(method, params, endpoint);
  }
}
