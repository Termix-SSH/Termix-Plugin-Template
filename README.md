<div align="center">

<img src="https://raw.githubusercontent.com/Termix-SSH/Termix/main/public/icon.svg" width="120" height="120" alt="Termix Logo" />

<h1>Termix Plugin Template</h1>

<p>A starter template for building your own Termix plugin</p>

</div>

<br />

## Overview

[Termix](https://github.com/Termix-SSH/Termix) is self-hosted, plugin-based server management, and every feature outside the core is a plugin. This template is a small Hello World plugin you can copy to start your own. It has one of each thing most plugins need, set up the same way as the official plugins.

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

Plugins build against [`@termix-ssh/plugin-sdk`](https://www.npmjs.com/package/@termix-ssh/plugin-sdk). The official plugins, like [Docker](https://github.com/Termix-SSH/Plugin-Docker), are good examples to read.

1. Pick an id: lowercase letters, digits and dashes. Change `id` in `manifest.json`, the tab id in `src/frontend/index.tsx`, and the permission in the test. Tables are named `p_<id with - as _>_<name>`.
2. Change `name`, `description`, `author`, `repository` and `category` in `manifest.json`, and `name` in `package.json`.
3. Declare every capability your code uses in `capabilities`. Termix refuses any call the manifest did not declare.
4. Put every string the UI shows in `locales/en.json`.
5. After changing `src/backend/tables.ts`, run `npm run migrations -- <short_name>`.
6. To release, bump `version` in `manifest.json` and `package.json`, add its notes to the top of `CHANGELOG.md` (a `## 1.0.1` heading with `### Added`, `### Changed` or `### Fixed` lists) and push a tag like `v1.0.0`. To release the same version again from the current commit, run the Release workflow by hand. It replaces the release files. The release body is that version's section of `CHANGELOG.md`, and Termix shows it in the plugin's page.

The CI and Release workflows call the shared ones in [Termix Registry](https://github.com/Termix-SSH/Termix-Registry). Release signs with the `TERMIX_PLUGIN_SIGNING_KEY` org secret and tells the registry with `TERMIX_PAT`, so it only works in the Termix-SSH organization, and the registry only lists repositories in its `sources.json`. Outside it, copy that workflow and sign with your own key.

<br />

## Sponsors

Interested in a paid placement to support development? Email [mail@termix.site](mailto:mail@termix.site).

<!-- SPONSORS:START -->

<div align="center">

<br />

<a href="https://www.digitalocean.com/">
  <img src="https://termix.site/img/sponsors/digitalocean.svg" height="40" alt="DigitalOcean" />
</a>
&nbsp;&nbsp;&nbsp;
<a href="https://crowdin.com/">
  <img src="https://termix.site/img/sponsors/crowdin.svg" height="40" alt="Crowdin" />
</a>
&nbsp;&nbsp;&nbsp;
<a href="https://www.blacksmith.sh/">
  <img src="https://termix.site/img/sponsors/blacksmith.svg" height="40" alt="Blacksmith" />
</a>
&nbsp;&nbsp;&nbsp;
<a href="https://www.cloudflare.com/">
  <img src="https://termix.site/img/sponsors/cloudflare.png" height="40" alt="Cloudflare" />
</a>
&nbsp;&nbsp;&nbsp;
<a href="https://akamai.com/">
  <img src="https://termix.site/img/sponsors/akamai.svg" height="40" alt="Akamai" />
</a>
&nbsp;&nbsp;&nbsp;
<a href="https://aws.amazon.com/">
  <img src="https://termix.site/img/sponsors/aws.png" height="40" alt="AWS" />
</a>
&nbsp;&nbsp;&nbsp;
<a href="https://rackgenius.com/">
  <img src="https://termix.site/img/sponsors/rackgenius.png" height="40" alt="Rack Genius" />
</a>
&nbsp;&nbsp;&nbsp;
<a href="https://ginernet.com/">
  <img src="https://termix.site/img/sponsors/ginernet.png" height="40" alt="Ginernet" />
</a>
&nbsp;&nbsp;&nbsp;
<a href="https://www.hetzner.com/?mtm_campaign=termix&mtm_medium=referral&mtm_content=sponsoring_link">
  <img src="https://termix.site/img/sponsors/hetzner.png" height="40" alt="Hetzner" />
</a>

</div>

<!-- SPONSORS:END -->

<br />

## Support

To report a bug or request a feature, open a [support ticket](https://github.com/Termix-SSH/Support/issues/new/choose). You need to be logged in to GitHub. Please be as detailed as possible, preferably in English.

For discussions and questions, join the [Discord](https://discord.gg/jVQGdvHDrf) server.

<br />

## License

Distributed under the Apache License Version 2.0. See [LICENSE](https://github.com/Termix-SSH/Termix/blob/main/LICENSE) for more information.
