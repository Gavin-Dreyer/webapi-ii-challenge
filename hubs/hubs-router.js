const router = require('express').Router()

const Hubs = require('../data/db')

router.get('/', (req, res) => {
    console.log(req.query)
    Hubs.find(req.query)
    .then(hubs => {
        res.status(200).json(hubs)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "The posts information could not be retrieved."
        });
    });
})

router.get('/:id', (req, res) => {
    const id = req.params.id

    Hubs.findById(id)
    .then(itemID => {
        if(itemID.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(200).json(itemID)
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "The post information could not be retrieved." 
        });
      });
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id

    Hubs.findCommentById(id)
    .then(commentID => {
        if(commentID.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(200).json(commentID)
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "The post information could not be retrieved." 
        });
      });
})

module.exports = router;