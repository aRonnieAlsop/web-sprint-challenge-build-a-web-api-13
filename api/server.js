const express = require('express')
const server = express()

// Configure your server here
server.use(express.json())

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server
