<div align="center">

<img src="https://raw.githubusercontent.com/Termix-SSH/Termix/main/public/icon.svg" width="120" height="120" alt="Termix Logo" />

<h1>Termix Plugin Template</h1>

<p>A starting point for building your own Termix plugin</p>

</div>

<br />

## Overview

Termix Plugin Template is a small Hello World plugin you can copy to start your own. It has one of each thing most plugins need, set up the same way as the official plugins.

<br />

## Features

- A tab opened from the sidebar
- Two API routes
- An admin setting
- A table with migrations for SQLite, PostgreSQL and MySQL
- A backend test
- A release workflow that builds, signs and publishes to the [Termix Registry](https://github.com/Termix-SSH/Termix-Registry)

<br />

## Getting Started

1. Pick an id: lowercase letters, digits and dashes. Change `id` in `manifest.json`, the tab id in `src/frontend/index.tsx`, and the permission in the test. Tables are named `p_<id with - as _>_<name>`.
2. Change `name`, `description`, `author`, `repository` and `category` in `manifest.json`, and `name` in `package.json`.
3. Declare every capability your code uses in `capabilities`. Termix refuses any call the manifest did not declare.
4. Put every string the UI shows in `locales/en.json`.
5. After changing `src/backend/tables.ts`, run `npm run migrations -- <short_name>`.
6. To release, bump `version` in `manifest.json` and `package.json`, add it to the top of `CHANGELOG.json` and push a tag like `v1.0.0`. To release the same version again from the current commit, run the Release workflow by hand. It replaces the release files.

The CI and Release workflows call the shared ones in [Termix Registry](https://github.com/Termix-SSH/Termix-Registry). Release signs with the `TERMIX_PLUGIN_SIGNING_KEY` org secret and tells the registry with `TERMIX_PAT`, so it only works in the Termix-SSH organization, and the registry only lists repositories in its `sources.json`. Outside it, copy that workflow and sign with your own key.

<br />

## Support

To report a bug or request a feature, open a [support ticket](https://github.com/Termix-SSH/Support/issues/new/choose). You need to be logged in to GitHub. Please be as detailed as possible, preferably in English.

For discussions and questions, join the [Discord](https://discord.gg/jVQGdvHDrf) server.

<br />

## License

Distributed under the Apache License Version 2.0. See [LICENSE](https://github.com/Termix-SSH/Termix/blob/main/LICENSE) for more information.
