---
title: Quickstart
sidebar_position: 2
image: /img/socialCards/dipdup.jpg
---
## Step 1 — Install DipDup
The easiest way to install DipDup as a CLI application is [pipx](https://pipx.pypa.io/stable/) with pipx install dipdup command. If you don't want to deal with tooling, we have a convenient installer script. Run the following command in your terminal:

```bash
curl -Lsf https://dipdup.io/install.py | python3
```

See the [Installation](https://dipdup.io/docs/installation) page for other options.

## Step 2 — Create a project
DipDup CLI has a built-in project generator with lots of templates. To create a new project interactively, run the following command:

```bash
dipdup new
```

For educational purposes, we'll create a project from scratch, so choose `[none]` network and `demo_blank` template.

Follow the instructions; the project will be created in the new directory.

## Step 3 — Configuration file
The project root directory contains a YAML file named `dipdup.yaml`. It's the main configuration file of your indexer. Available options are described in detail on [this page](https://dipdup.io/docs/getting-started/config). For now, just replace its content with the following:

```bash
spec_version: 2.0
package: kakarot

datasources:
  mainnet_node:
    kind: evm.node
    url: https://sepolia-rpc.kakarot.org

contracts:
  some_contract:
    kind: evm
    address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
    typename: not_typed

indexes:
  evm_index:
    kind: evm.subsquid.transactions
    datasource: mainnet_node
    handlers:
      - callback: on_output_transaction
        from: some_contract
    last_level: 4631


database:
  kind: sqlite
  path: data/kakarot.sqlite
```

Now it's time to generate directories and files required for the project: callbacks stubs, types and other entities we defined in configuration, don't worry in this guide we will only need a small portion of those:

```bash
dipdup init
```

You can read more about the structure of the DipDup package [here](https://dipdup.io/docs/getting-started/package).

## Step 4 — Define models and implement data handlers
In this step, we define the business logic of our application. DipDup supports storing data in SQLite, PostgreSQL and TimescaleDB databases. We use custom ORM based on Tortoise ORM as an abstraction layer.

First, you need to define a model class. Our schema will consist of a single `Transaction` model:

```bash
from dipdup import fields
from dipdup.models import Model


class Transaction(Model):
    hash = fields.TextField(pk=True)
    block_number = fields.IntField()
    from_ = fields.TextField()
    to = fields.TextField(null=True)

    created_at = fields.DatetimeField(auto_now_add=True)
```


Our single handler will be responsible for processing output transactions as described in the index definition in config:

```bash
from dipdup.context import HandlerContext
from dipdup.models.evm_node import EvmNodeTransactionData
from dipdup.models.evm_subsquid import SubsquidTransactionData

from kakarot import models as models


async def on_output_transaction(
    ctx: HandlerContext,
    transaction: SubsquidTransactionData | EvmNodeTransactionData,
) -> None:
    await models.Transaction(
        hash=transaction.hash,
        block_number=transaction.block_number,
        from_=transaction.from_,
        to=transaction.to,
    ).save()
```

## Step 5 — Results
Time to run the indexer. Processed data will be written to the SQLite file defined in the configuration:

```bash
dipdup run
```

DipDup will fetch all the historical data and switch to realtime mode. You can check the progress in the logs.

Query database to see the results:

```bash
sqlite3 /tmp/kakarot.sqlite 'SELECT * FROM transaction LIMIT 10'
```
