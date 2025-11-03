<img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Fwhatphilipdoes.com%2F&up_message=live&down_message=offline&style=flat-square">

# whatphilipdoes

This portfolio page is build with [`Astro`](https://astro.build/).

### Environment Setup

Create a `.env` file with the following contents:

```sh
# Server Info
SERVER_HOST = ""
SERVER_USER = ""
SERVER_PASSWORD = ""

SERVER_PATH_TEST = ""
SERVER_PATH_LIVE = ""

# Contact Info
CONTACT_FIRSTNAME = ""
CONTACT_LASTNAME = ""
CONTACT_STREET = ""
CONTACT_NUMBER = ""
CONTACT_ZIP = ""
CONTACT_CITY = ""
CONTACT_PHONE = ""
CONTACT_MAIL = ""
CONTACT_SITE = ""
```
To use the supplied `Github Action`, first create a production environment in the repository and then upload the `.env` variables as environment secrets (requires `gh` CLI tool):

```sh
gh secret set -e production -f .env
```

### SSH Setup

> The pipeline in this repo is specific to Hetzner `konsoleh` webhosting. The workflow could be modified to other SFTP based interfaces.

```sh
ssh-keygen -t ed25519 -C "your-email@example.com"
```

Then add the public key in konsoleh to "Öffentliche SFTP-Schlüssel"