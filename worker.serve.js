const CloudWorker = require('@dollarshaveclub/cloudworker')
const kv = require('@dollarshaveclub/cloudworker/lib/kv')
const fs = require('fs')
const { promisify } = require('util')
const { DEV_WORKER_PORT = 4321 } = process.env

const readFile = path => promisify(fs.readFile)(path, 'utf8')

readFile('./bundle/worker.js')
  .then(workerBody => {
    const cw = new CloudWorker(workerBody, {
      debug: true,
      bindings: {
        SESSION_KV: new kv.KeyValueStore('./mock-kv-session.json'),
      },
    })
    cw.listen(DEV_WORKER_PORT)
    console.log({ DEV_WORKER_PORT })
  })
  .catch(e => console.trace(e.message))
