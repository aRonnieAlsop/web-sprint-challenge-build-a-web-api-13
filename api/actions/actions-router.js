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

module.exports = router

// - [ ] `[GET] /api/actions/:id`
//   - Returns an action with the given `id` as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
// - [ ] `[POST] /api/actions`
//   - Returns the newly created action as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
//   - When adding an action make sure the `project_id` provided belongs to an existing `project`.
// - [ ] `[PUT] /api/actions/:id`
//   - Returns the updated action as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.
// - [ ] `[DELETE] /api/actions/:id`
//   - Returns no response body.
//   - If there is no action with the given `id` it responds with a status code 404.