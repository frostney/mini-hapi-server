# proxy-up
Simple Hapi-powered proxy server

`$ npm install proxy-up`

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
  "proxy": [{
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
const proxyup = require('proxyup');

proxyup({
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  proxy: [{
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
proxyup(config, statusRoute = true)
```

The function accepts a second parameter which is set to `true` by default. If set to `true`, it exports a status route on `/status` which returns `ok` by default. (This can be used an AWS ELB status check.)

## License
MIT
