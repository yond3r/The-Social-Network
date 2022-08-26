const router = require ("express").Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addfriends,
    removefriends
} = require("../../controllers/userControl");

router.route("/").get(getAllUser).post(createUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/user/friends/:friends").post(addfriends).delete(removefriends);

module.exports = router;