<img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Fwhatphilipdoes.com%2F&up_message=live&down_message=offline&style=flat-square">

# whatphilipdoes

This portfolio page is build with [`Astro`](https://astro.build/).

### Environment Setup

Create a `.env` file with the following contents:

```sh
# Server Info
SERVER_HOST = "www123.your-server.com"
SERVER_USER = "usernm"
SERVER_PASSWORD = "serverpassword"

SERVER_PATH_TEST = "/public_html/test/"
SERVER_PATH_LIVE = "/public_html/main/"

SERVER_URL_LIVE = "https://your-domain.com"
SERVER_URL_TEST = "https://test.your-domain.com"

# Legal Contact
LEGAL_FIRSTNAME = "First"
LEGAL_LASTNAME = "Last"
LEGAL_STREET = "Street"
LEGAL_NUMBER = "123"
LEGAL_ZIP = "45678"
LEGAL_CITY = "City"
LEGAL_PHONE = "+0 (0) 12345 678910"
LEGAL_MAIL = "mail@your-domain.com"
LEGAL_SITE = "https://your-domain.com"

# Regular Contact
MAIL = "mail@your-domain.com"

# Domain Info
MANAGED_SUBDOMAINS = "one,two,three"
```
To use the supplied `Github Action`, first create a production environment in the repository and then upload the `.env` variables as environment secrets (requires `gh` CLI tool):

```sh
gh secret set -e production -f .env
```