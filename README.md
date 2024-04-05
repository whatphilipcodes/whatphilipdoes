<img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Fwhatphilipdoes.com%2F&up_message=live&down_message=offline&style=flat-square">

# whatphilipdoes

This portfolio is based on the Nuxt 3 minimal starter template. The config is set up to build for static hosting without ssr. A live version can be found via the url in the repo description.

## Setup

```bash
# npm
npm install
```

## Development Server

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

## Continuous Deployment

This repo includes a GitHub action to automatically deploy the production build to an FTP server. The action is triggered by a push to the main branch. The action requires the following action secrets to be set in the repository settings:

```bash
FTPPASSWORD
```

```bash
FTPUSERNAME
```

```bash
FTPPORT
```

```bash
FTPSERVER
```

Due to a bug in the FTP action, it is necessary to create an empty file called `.ftp-deploy-sync-state.json` in the 'public_html' directory of the FTP server before the first sync.

In order to use the review-deploy script, the same secrets as above need to be included in a '.env' file in the project root.
