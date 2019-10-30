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
        })
    })
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
        })
      })
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id

    Hubs.findPostComments(id)
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
        })
      })
})

// router.get('/:id/comments', (req, res) => {
//     const id = req.params.id

//     Hubs.findCommentById(id)
//     .then(commentID => {
//         if(commentID.length === 0) {
//             res.status(404).json({ message: "The post with the specified ID does not exist." })
//         } else {
//             res.status(200).json(commentID)
//         }
//     })
//     .catch(error => {
//         console.log(error);
//         res.status(500).json({
//             error: "The post information could not be retrieved." 
//         })
//       })
// })

router.post('/', (req, res) => {
    const info = req.body
    const { title, contents } = info

    if(!title || !contents) res.status(400).json({ errorMessage: "Please provide title and contents for the post." })

    Hubs.insert(info)
    .then(newPost => {
        res.status(201).json(info)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "There was an error while saving the post to the database"
        })
      })
})

router.post('/:id/comments', (req, res) => {
    const id = req.params.id 
    const info = req.body
    const { text } = info
    const newObj = {post_id: id, ...info}
    console.log(info)
    

    if(!text) res.status(400).json({ errorMessage: "Please provide text for the comment." })
    console.log(id)

    Hubs.insertComment(newObj)
    .then(newPost => {
        console.log(newPost)
        if(newPost.length === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(201).json(newObj)
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "There was an error while saving the post to the database"
        })
      })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id

    Hubs.remove(id)
    .then(count => {
        console.log(count, id)
        if(count === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(200).json({ message: `Item with id ${id} deleted`})
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "The post could not be removed"
        })
      })

})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const info = req.body
    const { title, contents} = info

    if(!title || !contents) res.status(400).json({ errorMessage: "Please provide title and contents for the post." })

    Hubs.update(id, info)
    .then(count => {
        console.log(count)
        if(count === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(200).json(info)
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "The post information could not be modified."
        })
      })
})

module.exports = router;

// router.post('/:id/comments', (req, res) => {
//     const id = req.params.id 
//     const info = req.body
//     const { text } = info
//     const newObj = {post_id: id, ...info}
//     console.log(info)
    

//     if(!text) res.status(400).json({ errorMessage: "Please provide text for the comment." })
//     console.log(id)

//     Hubs.insertComment(newObj)
//     .then(newPost => {
//         console.log(newPost)
//         if(newPost.length === 0){
//             res.status(404).json({ message: "The post with the specified ID does not exist." })
//         } else {
//             res.status(201).json(newObj)
//         }
//     })
//     .catch(error => {
//         console.log(error);
//         res.status(500).json({
//             error: "There was an error while saving the post to the database"
//         })
//       })