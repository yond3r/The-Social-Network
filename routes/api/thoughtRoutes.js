const router = require ("express").Router();

// const { get } = require("http");
// const { put } = require(".");

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require("../../controllers/thoughtControl");

router.route("/").get(getAllThought).post(createThought);

router
    .route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

router.route("/:thoughtsId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;