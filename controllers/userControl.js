const {User, Thought} = require("../models");

//gathers all of the users
const userController = {
    getAllUser(req, res){
        User.find({})
        .populate({
            path: "friends",
            select: "-__v",
    })
    .select("-__v")
    .sort({_id: -1})
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
},

//one user gathered by their specific id
getUserById({params}, res) {
    User.findOne({_id: params.id})
        .populate({
            path: "thoughts",
            select: "-__v",
        })
        .populate({
            path: "friends",
            select: "-__v",
        })
        .select("-__v")
        .then((dbUserData)=>{
            if(!dbUserData) {
                return res
                    .status(404).json({msg: "No user is associated w/ this id!"})
            }
                res.json(dbUserData);
            })
                .catch((err) => {
                    console.log(err)
                    res.sendStatus(400)
            })
        },
//update the particular user by their id
updateUser({params, body}, res) {
    User.findOneAndUpdate({ _id: params.id}, body, {
        new: true,
        runValidators: true,
    })
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(404).json({msg: "No user is associated w/ this id!"})
                    return;
            }
            res.json(dbUserData);   
        })
            .catch((err) => res.json(err));
},

//delete
deleteUser({params}, res) {
    User.findOneAndDelete({_id: params.id})
    .then((dbUserData) => {
        if(!dbUserData) {
           return res.status(404).json({msg: "No user is associated w/ this id!"});
        }
            return Thought.deleteMany({_id: {$in: dbUserData.thoughts}});
        })
            .then(()=> {
                res.json({msg:"User and all of their thoughts have been deleted! Good luck & have a safe life!" });
            })
            .catch((err) = res.json(err));
},

//adding ur pals!! wow !!
addUrPals({params}, res){
    User.findOneAndUpdate(
        {_id: params.userId},
        { $addToSet: 
            {friends: params.friendId}
        },
        {new: true},
        {runValidators: true}
    )
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(404).json({msg: "No user is associated w/ this id!"});
                return;
            }
            res.json(dbUserData)
        })
            .catch((err) => res.json(err));
},

//delete ur pals !! oh no !!
removeUrPals({params}, res) {
    User.findOneAndUpdate(
        {_id: params.userId},
        { $pull: 
            {friends: params.friendId}
        },
        {new: true},
    )
    .then((dbUserData) => {
        if(!dbUserData) {
            return res.status(404).json({msg: "No user is associated w/ this id!"});
        }
        res.json(dbUserData);
    })
    .catch((err) => res.json(err));
},
};

module.exports = userController;