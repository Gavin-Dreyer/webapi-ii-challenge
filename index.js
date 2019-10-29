const express = require('express');


const hubsRouter = require('./hubs/hubs-router')

const server = express()

server.use(express.json())

server.use('/api/posts', hubsRouter)

const port = 5000
server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`)
})