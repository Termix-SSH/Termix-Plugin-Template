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

I really hope I remember to change this

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

Bugs and ideas for this plugin go in this repo's [issues](../../issues). Problems with Termix itself go in the [Termix repo](https://github.com/Termix-SSH/Termix/issues/new/choose), and questions about building plugins can go in the [Discord](https://discord.gg/jVQGdvHDrf) server.

<br />

## License

Distributed under the Apache License Version 2.0. See [LICENSE](https://github.com/Termix-SSH/Termix/blob/main/LICENSE) for more information.
