# Open Source Cloud Client SDK for Typescript

## Development

Prerequisites:
- Lerna (install with `npm install -g lerna`)

Install dependencies

```
npm install
```

Build libraries

```
npm run build
```

## Release

```
npm run lerna:version
```

Publish to NPM is then executed with GitHub actions.

We use conventional commits to enforce semantic versioning.