// add middlewares here related to projects
const Projects = require('./projects-model')

function errorHandler(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message,
        developerMessage: 'ooops',
    })
}

async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if (project) {
            req.project = project
            next()
        } else {
            res.status(404).json({
                message: 'project not found'
            })
        }
    } catch (err) {
        next(err)
    }
}

function checkProjectPayload(req, res, next) {
   const { name, description} = req.body

   if (!name || !description) {
        res.status(400).json({
            message: 'name & description are required'
        })
   } else {
        next()
   }
}

module.exports = {
    errorHandler, 
    validateProjectId,
    checkProjectPayload,
}
