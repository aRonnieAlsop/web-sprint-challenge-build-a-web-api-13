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

router.put('/:id', validateActionId, checkActionPayload, async (req, res) => {
    const updateAction = await Actions.update(req.params.id, req.body)
    res.status(200).json(updateAction)
})

module.exports = router




