<img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Fwhatphilipdoes.com%2F&up_message=live&down_message=offline&style=flat-square">

# whatphilipdoes

This portfolio page is build with [`Astro`](https://astro.build/).

### Environment Setup

Create a `.env` file with the following contents:

```sh
# Server Info
USER = 
SERVER = 
URL =

# Imprint
SURNAME = 
FIRSTNAME =
STREET = 
NUMBER = 
ZIP = 
CITY = 
MAIL = 
PHONE = 
```
To use the supplied `Github Actions` add upload the `.env` variables as repository secrets to Github (requires `gh` CLI tool):

```sh
gh secret set --env-file .env
```

### SSH Setup

> The pipeline in this repo is specific to Hetzner konsoleh webhosting. The workflow could be modified to other SFTP based interfaces.

```sh
ssh-keygen -t ed25519 -C "your-email@example.com"
```

Then add the public key in konsoleh to "Öffentliche SFTP-Schlüssel"