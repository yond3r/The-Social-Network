const router = require ("express").Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addUrPals,
    removeUrPals
} = require("../../controllers/userControl");

router.route("/").get(getAllUser).post(createUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/userId/urPals/:urPalsId").post(addUrPals).delete(removeUrPals);

module.exports = router;