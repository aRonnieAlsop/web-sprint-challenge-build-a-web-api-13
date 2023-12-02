// Write your "projects" router here!
const express = require('express')
const {
    errorHandler,
    validateProjectId,
    checkProjectPayload,
 } = require('./projects-middleware')
const Projects = require('./projects-model')

const router = express.Router()

router.get('/', (req, res) => {
    Projects.get()
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(200).json([])
            }
        }) 
        .catch(err => {
            res.status(500).json({ message: 'no fetch' })
        }) 
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', checkProjectPayload, (req, res) => {
    const newProject = req.body
    
    Projects.insert(newProject) 
        .then((project) => {
            res.status(201).json(project)
        })
        .catch((err) => {
            res.status(500).json({ message: 'unable to post for some reason'})
        })
})

router.delete('/:id', validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
    .then(() => {
        res.status(200).json({ message: 'that project is gone' })
    })
    .catch(next)
})



router.use(errorHandler)


module.exports = router