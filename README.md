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
- Two API routes behind a permission
- An admin setting
- A table with migrations for SQLite, PostgreSQL and MySQL
- Backend and frontend tests
- A release workflow that builds, signs and publishes to the [Termix Registry](https://github.com/Termix-SSH/Termix-Registry)

<br />

## Getting Started

You need Node 24 and a Termix server you are an admin on. The full guide is at [docs.termix.site/develop](https://docs.termix.site/develop).

1. Click **Use this template** on GitHub to make your own repo, then clone it.
2. In `manifest.json`, change `id`, `name`, `description`, `author`, `repository` and `docs`. The id is lowercase with dashes, like `my-plugin`. Then search the repo for `hello-world`, `hello_world` and `Hello World` and rename them to match: `package.json`, `locales/en.json`, the index name in `src/backend/tables.ts`, the API paths in `src/backend/routes.ts`, the tab id in `src/frontend/index.tsx` and the tests.
3. Install the packages, then delete `migrations/` and write it again for your id:

   ```bash
   npm install
   npm run migrations
   ```

4. In Termix, open **Settings**, then **General**, and turn on **Plugin developer mode**. Then make an API key under **Settings**, **API keys**.
5. Build and install the plugin on your server. It rebuilds and reinstalls every time you save a file:

   ```bash
   npx termix-plugin dev --server http://localhost:30001 --key tmx_your_key
   ```

6. Run the tests and checks before you push:

   ```bash
   npm test
   npm run typecheck
   npm run validate
   npm run build
   ```

7. Write your docs in `docs/`. `docs/index.md` is the page people see first. Settings, permissions, environment variables and the API reference are added for you from `manifest.json` and the `@openapi` comments on your routes.

When you change a table in `src/backend/tables.ts`, run `npm run migrations` to write the SQLite, PostgreSQL and MySQL migrations. `npm run pack` writes `<id>-<version>.tmxplug` of the built plugin, which you can install from a file in the Plugins tab while developer mode is on.

## Releasing

Work happens on a `dev-X.Y.Z` branch made from `main`, named after the version it will ship as. `main` only changes when a release merges a dev branch into it.

Run the **Release** workflow by hand from the dev branch:

- **beta** publishes `X.Y.Z-beta.N` (N counts up on its own). Termix only offers it to people who turned on Beta versions for this plugin. Run it as often as you like.
- **stable** releases `X.Y.Z`, merges the dev branch into `main`, deletes the dev branch and removes that version's beta releases. Add a `## X.Y.Z` section to `CHANGELOG.md` first, it becomes the release notes.
- **overwrite** releases the manifest version again from the current commit, replacing its files.
- **dry-run** builds and packs without publishing anything.

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

Found a bug in this template or have an idea? Open an issue in this repo: [report a bug](https://github.com/Termix-SSH/Termix-Plugin-Template/issues/new?template=bug_report.yml) or [request a feature](https://github.com/Termix-SSH/Termix-Plugin-Template/issues/new?template=feature_request.yml).

Problems with Termix itself (login, hosts, credentials, sharing, sync) go in the [Termix repo](https://github.com/Termix-SSH/Termix/issues/new/choose). Not sure where it goes? Open it there and it will be moved.

Please be as detailed as possible, preferably in English. For questions about building plugins, join the [Discord](https://discord.gg/jVQGdvHDrf) server.

<br />

## License

Distributed under the Apache License Version 2.0. See [LICENSE](LICENSE) for more information.
