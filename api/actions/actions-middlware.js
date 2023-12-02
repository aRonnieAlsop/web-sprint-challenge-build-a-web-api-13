// add middlewares here related to actions
const Actions = require('./actions-model')

function handleError(err, req, res) {
    res.status(err.status || 500).json({
        message: err.message,
        developerMessage: 'something wicked this way comes',
    })
}

async function validateActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if (action) {
            req.action = action
            next()
        } else {
            res.status(404).json({
                message: 'what action?'
            })
        }
    } catch (err) {
        next(err)
    }
}

function checkActionPayload(req, res, next) {
    const { project_id, description, notes } = req.body

    if (!project_id || !description || !notes ) {
        res.status(400).json({
            message: 'stuff is required'
        })
    } else {
        next()
    }
}

module.exports = {
    handleError,
    validateActionId,
    checkActionPayload,
}