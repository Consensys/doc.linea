# RpcPlayground — Design Spec

**Ticket:** Consensys/doc.linea#1398
**Branch:** `rpc-sandbox-implementation`
**Date:** 2026-04-21

## Goal

Replace the static `## Example` / `### Request` / `### Response` blocks on
Linea's API reference pages with an interactive playground that fires a live
request against `https://rpc.linea.build` and shows the real response.

Inspired by QuickNode's method pages. No auth, no API key — the endpoint is
already public.

## Component API

```tsx
<RpcPlayground
  method="eth_blockNumber"
  params={[]}
  exampleResponse={{ jsonrpc: "2.0", id: 1, result: "0x1ce313f" }}
  endpoint="https://rpc.linea.build" // optional, default
/>
```

| Prop              | Type                  | Required | Default                    |
| ----------------- | --------------------- | -------- | -------------------------- |
| `method`          | `string`              | yes      | —                          |
| `params`          | `unknown[]`           | yes      | —                          |
| `exampleResponse` | `Record<string, any>` | yes      | —                          |
| `endpoint`        | `string`              | no       | `https://rpc.linea.build` |

## Behavior

1. **Initial render:** shows request code (curl by default) + `exampleResponse`
   rendered as JSON in a response panel marked "Example" (neutral border).
2. **Language dropdown** (top-right of request panel): Curl · Ethers.js · Viem.
   Switches the request code. Selection is component-local; no URL or storage
   persistence (page refresh resets to curl).
3. **Copy button** (icon, top-right of request panel): copies the currently
   visible code string. Shows "Copied!" tooltip for ~1.5s.
4. **Run button** (bottom of request panel, brand purple): fires
   `fetch(endpoint, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: {...}})`.
   - While loading: button disabled, small spinner replaces label.
   - On success: response panel switches to "Live" state with a subtle green
     left-border accent and pretty-printed JSON body (result or error).
   - On network failure / non-2xx: response panel switches to "Error" state
     with red left-border accent and the error message.
5. **Params are read-only.** The component never renders an editable form.

Pressing Run again replaces the previous live response; the static
`exampleResponse` is only shown until the first Run.

## Architecture

Four files, co-located in `src/components/RpcPlayground/`:

```
src/components/RpcPlayground/
├── index.tsx              # Component (props, state, layout)
├── languages.ts           # Pure template generators per language
├── useRpcCall.ts          # Fetch hook: { loading, response, error, run }
└── styles.module.css      # Scoped styles via CSS Modules
```

**Why this split:** `languages.ts` is pure string generation and is trivially
testable in isolation. `useRpcCall.ts` owns all async/network concerns. The
component is a thin view layer that wires state to JSX — small enough to hold
in a single mental model.

### `languages.ts`

Exports:

```ts
export type Language = "curl" | "ethers" | "viem";
export const LANGUAGES: { id: Language; label: string }[];
export function renderCode(lang: Language, method: string, params: unknown[], endpoint: string): string;
```

Templates (note: `{params}` is `JSON.stringify(params)`, not the raw array):

- **curl** — single-line command (already the site's convention) with
  `{method}` and params substituted.
- **ethers** — `new JsonRpcProvider(endpoint).send(method, params)` (ethers v6).
- **viem** — `createPublicClient({ chain: linea, transport: http() }).request({ method, params })`.

### `useRpcCall.ts`

```ts
type Status = "idle" | "loading" | "success" | "error";

export function useRpcCall(endpoint: string, method: string, params: unknown[]): {
  status: Status;
  response: unknown | null;   // parsed JSON-RPC response (whole envelope)
  error: string | null;
  run: () => Promise<void>;
};
```

- Uses `fetch` with an `AbortController` cleaned up on unmount / re-run.
- Timeout: 15s (AbortController).
- On non-2xx or thrown error, sets `status="error"` with a human message.
- A successful HTTP 200 that contains a JSON-RPC `error` object is still
  `status="success"` — the envelope is valid, and we render `error` the same
  way as `result`. (This matches how users debug RPCs.)

### `index.tsx`

- Uses `@theme/CodeBlock` (Docusaurus's Prism wrapper) for syntax-highlighted
  rendering. This automatically picks up the site's `github` / `dracula` Prism
  themes and matches existing code block styling exactly — zero extra CSS
  needed for code internals.
- Language dropdown: native `<select>` styled via CSS Module to match other
  selects on the site (no custom popover component).
- Copy button: icon-only (extract to `src/components/icons/` per AGENTS.md
  forbidden-patterns rule against inline SVG).

## Styling

All styles in `styles.module.css` using existing tokens from
`src/css/tokens.css`:

| Element                 | Tokens used                                                 |
| ----------------------- | ----------------------------------------------------------- |
| Container border        | `var(--linea-border)`, `var(--linea-radius-md)`             |
| Panel background        | inherits from `@theme/CodeBlock`                            |
| Run button              | `var(--linea-brand-purple)`, hover `var(--linea-purple-hover)` |
| Language select         | `var(--linea-border)`, `var(--linea-text-primary)`          |
| Copy "Copied!" tooltip  | `var(--linea-surface-elevated)`, `var(--linea-text-primary)` |
| Live response border    | `#10b981` (new token: `--linea-success-accent`)             |
| Error response border   | `#ef4444` (new token: `--linea-error-accent`)               |

Two new tokens go in `tokens.css` under both theme blocks (success/error
accents aren't currently defined).

### Responsive

- Default: two stacked panels (request on top, response below).
- `@media (width >= 768px)`: unchanged — stays stacked (matches QuickNode
  pattern; side-by-side code+response reduces readable width too far on docs
  pages with a TOC).
- Mobile (`< 480px`): dropdown + copy wrap under the panel header if they
  would otherwise overflow; Run button stays full-width.

### Dark mode

Theme-aware tokens carry dark mode automatically. No `[data-theme="dark"]`
selectors needed.

## Which pages get the playground

### Runnable on rpc.linea.build (29 pages — use `<RpcPlayground>`)

```
eth_blockNumber, eth_call, eth_chainId, eth_estimateGas, eth_feeHistory,
eth_gasPrice, eth_getBalance, eth_getBlockByHash, eth_getBlockByNumber,
eth_getBlockReceipts, eth_getBlockTransactionCountByHash,
eth_getBlockTransactionCountByNumber, eth_getCode, eth_getLogs,
eth_getStorageAt, eth_getTransactionByBlockHashAndIndex,
eth_getTransactionByBlockNumberAndIndex, eth_getTransactionByHash,
eth_getTransactionCount, eth_getTransactionReceipt,
eth_maxPriorityFeePerGas, eth_syncing, linea_estimateGas, linea_getProof,
net_listening, net_peerCount, net_version, web3_clientVersion, web3_sha3
```

### Skip — keep existing static examples (16 pages)

**Not supported on public RPC:** `debug_traceBlockByHash`,
`debug_traceBlockByNumber`, `debug_traceCall`, `debug_traceTransaction`,
`trace_block`, `trace_call`, `trace_transaction`

**Require signed data / non-public endpoint:** `eth_sendRawTransaction`,
`eth_sendBundle`, `linea_getTransactionExclusionStatusV1`

**Stateful — stale filter IDs would always error:** `eth_getFilterChanges`,
`eth_getFilterLogs`, `eth_newBlockFilter`, `eth_newFilter`,
`eth_uninstallFilter`, `eth_accounts`

## Risk notes

- **CORS:** `rpc.linea.build` is expected to allow browser origins (it already
  services the MetaMask + dapp ecosystem from browsers). Will verify during
  implementation — if it doesn't, the fallback is a thin serverless proxy
  (same pattern as the Feedback Widget's `/api/feedback`), but this should
  not be needed.
- **Rate limits:** Public endpoint has typical public-RPC throttling. A user
  spamming Run would get 429s; we render that as an error. No mitigation.
- **TabItem `groupId="sdk-lang"` on `linea_estimateGas`:** the current page
  uses a tab group that syncs across the site. Replacing with `<RpcPlayground>`
  breaks that sync on this single page. Accepted: consistency across the 29
  pages matters more than a rarely-used cross-page sync.
- **Example response drift:** `exampleResponse` shows stale block numbers /
  hashes. Acceptable — it's a placeholder, the Run button fetches fresh data.

## Validation

1. `yarn typecheck` passes.
2. `yarn build` passes.
3. `yarn start`, open each of the 29 playground pages:
   - Page renders without hydration warnings.
   - Run fires request, response replaces placeholder.
   - Language dropdown switches code correctly.
   - Copy button works (paste into editor to confirm).
4. Mobile (390 px) + desktop (1440 px) × light + dark — no layout regressions.
5. Error path: temporarily point `endpoint` to an invalid URL, confirm red
   error state renders.

## Out of scope

- Editable params
- Request history
- Persisting language choice across pages
- OpenRPC schema validation
- Auth / API key input
