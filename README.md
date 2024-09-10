# Linea documentation

[Linea](https://linea.build/) is a developer-ready layer 2 network, scaling Ethereum by providing
an Ethereum-equivalent environment in which to execute transactions, which are then submitted to
Ethereum Mainnet through a zero-knowledge rollup.

This documentation repository is built using [Docusaurus](https://docusaurus.io/), and the site
itself is published at [`docs.linea.build`](https://docs.linea.build/).

See [more](https://docs-template.consensys.net/) information about how Consensys uses Docusaurus.

## Contribute to the docs

See something missing? Error in our documentation? Create an issue [here](https://github.com/Consensys/doc.linea/issues).

Alternatively, help us improve our documentation! [Fork our repo](https://github.com/ConsenSys/doc.linea/fork),
create a pull request, and tag us for review! (for help on this, see [below](#how-to-submit-a-suggestion-or-change)).

Take a look at some [good first issues](https://github.com/ConsenSys/doc.linea/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
to get started.

### How to submit a suggestion or change

The best way to suggest a change to these docs is through a process known as a **pull request**.
If you're not familiar with how that works, check out [GitHub's guide here](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

If you do intend to submit a pull request, please open an issue first, and [link to it in your pull request](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue). **This is particularly important if you are an ecosystem contributor** —
submitting your details in an issue first will make it much easier for our docs team to process your
contributions.

If that process is too involved for you, you can always open a thread on the [Community forum](https://community.linea.build/),
or a ticket on the [Support page](https://support.linea.build/hc/en-us).

If you are familiar with making a pull request, we **highly recommend that you run a version of these docs locally, and preview your changes locally, before submitting them**.
In fact, it's part of the PR process.

### Contribute to community tutorials

If you've created fleshed-out guides and tutorials, or intend to, we'd love to feature your content
in our [community tutorials section](./docs/developers/guides/community/index.mdx).

First, create an issue describing the content you want to see added or intend to add. If you're
representing an organization (such as a dapp), please use the ecosystem contribution issue form.

When you're ready to start work, [fork our repo](https://github.com/Consensys/doc.linea/fork),
create a pull request, and tag us for review!

### Contribute to the Zero-Knowledge Glossary

Diving into zero-knowledge rollups and getting stumped by the technical jargon? We've started an
open source Zero-Knowledge glossary to define some common terms you might encounter as you dive
into the L2 landscape.

[Fork our repo](https://github.com/Consensys/doc.linea/fork), and add a term in alphabetical
order to `docs/reference/glossary.md`. Then, make a pull request and tag us for review!

### Additional Resources

View the [Consensys doc contribution guidelines](https://docs-template.consensys.net/) for
information on how to:

- [Submit a contribution](https://docs-template.consensys.net/contribute/submit-a-contribution) using forks and pull requests.
- Consult the [documentation style guide](https://docs-template.consensys.net/contribute/style-guide).
- [Format your Markdown](https://docs-template.consensys.net/contribute/format-markdown) correctly.
- [Preview the docs](https://docs-template.consensys.net/contribute/preview) locally.

## Running locally

You will need to have **Node.js** installed to run the live previews of the docs locally.

It is highly recommended that you use a tool like [`nvm`](https://github.com/nvm-sh/nvm#installing-and-updating)
to manage Node.js versions on your machine.

### Installing recommended Node.js version with `nvm`

1. Follow the above instructions to install `nvm` on your machine, or go [here](https://github.com/nvm-sh/nvm#installing-and-updating).
2. Go to the root folder of this project in your terminal.
3. Run `nvm install` followed by `nvm use`. This will install the version specified by this project in the `.nvmrc` file.

### Running this project

1. Navigate to root folder of the project after installing Node.js
2. Run the following in sequence, which only needs to be done once:

   ```bash
   npm install
   npm run prepare
   ```

3. To preview and for every time afterwards:

   ```bash
   npm run start
   ```

### Build

    $ npm run build

This command generates static content into the `build` directory and can be served using any static
contents hosting service.

### Adding new words to the dictionary

This repository includes a _linter_, which you can think of as a spell-check that also checks code
formatting and standards, and a lot more. It's possible that you will use a word in your content
that is not known to the linter, and your build, or commit, will fail.

You can run the linter any time with the command `npm run lint`.

If the linter finds a word that it doesn't recognize, take a look at `project-words.txt` in the root
directory; if the word that the linter caught is correctly spelled, and you wish it to pass the
linter's test, add it to `project-words.txt`, save, add and commit those changes, and see if it
passes.

For tidiness, please ensure you adhere to the alphabetical order established in `project-words.txt`.
