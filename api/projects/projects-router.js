// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')

const router = express.Router()

// - [ ] `[GET] /api/projects`
//   - Returns an array of projects as the body of the response.
//   - If there are no projects it responds with an empty array.
router.get('/', (req, res) => {
    Project.get()
        .then(projects => {
            if (projects) {
                res.status(200).json(projects)
            } else {
                res.status(200).json([])
            }
        }) 
        .catch(err => {
            res.status(500).json({ message: `oops` })
        }) 
})


module.exports = router