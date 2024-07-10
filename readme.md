## Open Source Cloud Client Libraries for Javascript

Javascript client libraries for [Open Source Cloud](https://www.osaas.io). The Javascript client libraries for [Open Source Cloud API](https://api.osaas.io) are implemented in Typescript, for server-side use with Node and is [open source](https://github.com/Eyevinn/osaas-client-ts).

- [Signup for Open Source Cloud](https://app.osaas.io)
- [API Documentation](https://api.osaas.io)
- [Source code](https://github.com/Eyevinn/osaas-client-ts)

### What is Open Source Cloud?

A software as a service based on open source with a unique transparent model where revenue is shared with the open source authors. Open Source Cloud offers media industry companies a quick way to incorporate open source in their solutions and the option to run the same software in-house as the source code is publicly available.

### Development

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

Release

```
npm run lerna:version
```

Publish to NPM is then executed with GitHub actions.

We use conventional commits to enforce semantic versioning.
