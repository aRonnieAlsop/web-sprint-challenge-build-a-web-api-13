// Write your "projects" router here!
const express = require('express')
const {
    errorHandler,
    validateProjectId,
    checkProjectPayload,
 } = require('./projects-middleware')
const Projects = require('./projects-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Projects.get()
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(200).json([])
            }
        }) 
        .catch(err => {
            next(err)
        }) 
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', checkProjectPayload, (req, res, next) => {
    const newProject = req.body
    
    Projects.insert(newProject) 
        .then((project) => {
            res.status(201).json(project)
        })
        .catch((err) => {
            next(err)
        })
})

router.delete('/:id', validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
    .then(() => {
        res.status(200).json({ message: 'that project is gone' })
    })
    .catch(next)
})

router.put('/:id', validateProjectId, checkProjectPayload, async (req, res) => {
    const updateProject = await Projects.update(req.params.id, req.body)
    res.status(200).json(updateProject)
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const projectActions = await Projects.getProjectActions(req.params.id)
        res.json(projectActions)
    } catch (err) {
        next(err)
    }
})

router.use(errorHandler)


module.exports = router