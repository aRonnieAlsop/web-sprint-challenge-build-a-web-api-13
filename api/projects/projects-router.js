// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')

const router = express.Router()

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
//this get needs fixed
router.get('/:id', (req, res) => {

})

router.post('/', (req, res) => {
    const newProject = req.body
    if (!newProject.name || !newProject.description) {
        res.status(400).json({ message: `oops`})
    } else {
        Project.insert(newProject)
        .then(project => {
            res.status(201).json(project)
        })
        .catch (err => {
            res.status(500).json({ message: `oops`})
        })
    }
})


module.exports = router