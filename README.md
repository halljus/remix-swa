# Experiment: Remix as an Azure Static Web App with underlying Azure Function

## Setup

Clone the repo, then:

```sh
npm install
cd server
npm install --omit=dev
cd ..
npm run build
```

Create the `server/local.settings.json` file with the following contents:

```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "FUNCTIONS_EXTENSION_VERSION": "~4"
  }
}
```

Modify `swa-cli.config.json` to point at whatever you called your Azure Static Web App:

```json
{
  "$schema": "https://aka.ms/azure/static-web-apps-cli/schema",
  "configurations": {
    "YOUR-AZURE-STATIC-WEB-APP-NAME-GOES-HERE": {
      "appLocation": ".",
      "apiLocation": "server",
      "outputLocation": "build/client",
      "apiLanguage": "node",
      "apiVersion": "18"
    }
  }
}
```

## Simulate Azure locally

```sh
npm run simulate-azure
```

Visit http://localhost:3000 and observe that it works. Any requests to `/assets/*` should be handled by the SWA, while all other requests (including the root document request) should be proxied to the Azure Function at `/api/remix` (running at http://localhost:3030).

## Deploy

```sh
npx cross-env SWA_CLI_DEPLOYMENT_TOKEN=<AZURE_SWA_DEPLOYMENT_TOKEN> swa deploy --no-use-keychain --verbose=silly
```
