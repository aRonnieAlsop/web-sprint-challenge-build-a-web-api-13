// Write your "actions" router here!
const express = require('express')
const {
    handleError,
    validateActionId,
    checkActionPayload,
} = require('./actions-middlware')
const Actions = require('./actions-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Actions.get()
        .then(action => {
            if (action) {
                res.status(200).json(action)
            } else {
                res.status(200).json([])
            }
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action)
})

router.post('/', checkActionPayload, (req, res, next) => {
    const newAction = req.body

    Actions.insert(newAction)
        .then((action) => {
            res.status(201).json(action)
        })
        .catch((err) => {
            next(err)
        })
})

router.delete('/:id', validateActionId, (req, res, next) => {
    Actions.remove(req.params.id)
    .then(() => {
        res.status(200).json({ message: 'that action is toast'})
    })
    .catch(next)
})


module.exports = router



// - [ ] `[PUT] /api/actions/:id`
//   - Returns the updated action as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.
// - [ ] `[DELETE] /api/actions/:id`
//   - Returns no response body.
//   - If there is no action with the given `id` it responds with a status code 404.