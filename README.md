# mini-hapi-server
Minimal configuration-based Hapi-powered server. Ideal for quick prototyping, static file server or proxy server.

`$ npm install mini-hapi-server`

## As a command-line tool

Load the configuration as the parameter.

```
$ proxy-up myconfig.json
```

The `myconfig.json` file takes a Hapi configuration object:
```json
{
  "server": {
    "host": "0.0.0.0",
    "port": 3000
  },
  "routes": [{
    "method": "*",
    "path": "/{p*}",
    "handler": {
      "proxy": {
        "host": "google.com",
        "port": 80,
        "redirects": 5
      }
    }
  }]
}
```

The configuration itself can either be JSON or JavaScript.

## Programmatic usage

```javascript
const startServer = require('mini-hapi-server');

startServer({
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  routes: [{
    method: '*',
    path: '/{p*}',
    handler: {
      proxy: {
        host: 'google.com',
        port: 80,
        redirects: 5,
      },
    },
  }],
})
```

### API
```javascript
startServer(config, statusRoute = true)
```

The function accepts a second parameter which is set to `true` by default. If set to `true`, it exports a status route on `/status` which returns `ok` by default. (This can be used an AWS ELB status check.)

## License
MIT
