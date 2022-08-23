const {Thought, User} = require("../models");

//I *desperately* wanted to call this mind control, but I don't know if that gives off the vibe I want for this social media website. That would be a website for like.... supervillians.


//gathers all thoughts
const thoughtControl = {
getAllThought(req, res){
    Thought.find({})
    .populate({
        path: "reactions",
        select: "-__v",
    })
    .select("-__v")
    .sort({_id: -1})
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err)=> {
        console.log(err);
        res.sendStatus(400);
    })
},

//gathers one thought by id
getThoughtById({params}, res) {
    Thought.findOne({_id: params.id})
        .populate({
            path: "reactions",
            select: "-__v",
        })
        .select("-__v")
        .then((dbThoughtData)=> {
            if (!dbThoughtData) {
                return res.status(404).json({msg: "No thought is associated with this id!"});
            }
            res.json(dbThoughtData);
        })
        .catch((err)=> {
            console.log(err);
            res.sendStatus(400);
        });
    },

//create thought
createThought ({params, body}, res) {
    Thought.create(body)
    .then(({_id})=> {
        return User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: _id }},
            { new: true }
        );
    })
        .then ((dbUserData)=> {
            if (!dbUserData) {
                return res
                    .status(404)
                    .json({msg: "Thought created, but! There is no user with this id!! Whoops, try again."})
            }
                res.json({mes: "Thought created!"});
        })
        .catch((err) => res.json(err));
    },

//update thoughts by personal ids
updateThought ({params, body}, res) {
    Thought.findOneAndUpdate({_id: params.id}, body, {
        new: true,
        runValidators: true,
    })
        .then(dbThoughtData) => {
            if(!dbThoughtData) {
                res.status(404).json({msg: "No id is associated with this thought!"});
                    return;
            }
            res.json(dbThoughtData)
        })
            .catch((err) => res.json(err));
    },

//deletable thoughts
deleteThought({params}, res) {
    Thought.findOneandDelete({ _id: params.id })
        .then((dbThoughtData) =>{
            if (!dbThoughtData) {
                return res.status(404).json({msg: "No thought is associated with this id!"});
            }

//remove thought id
        return User.findOneAndUpdate(
            {thoughts: params.id},
            {$push: {thoughts: params.id}},
            {new: true}
        );
    })
            .then((dbUserData)=> {
                if (!dbUserData) {
                    return (res)
                        .status(404)
                        .json ({msg: "Mission accomplished! Thought is created, but there's no user associated w/ this thought"});
                    }
                    res.json({msg: "thought deleted!!"});
                })
                .catch((err) => res.json(err));
            },

//add reaction to params
addReaction({params, body}, res) {
    Thought.findOneAndUpdate(
        {_id:params.thoughtId},
        {$addToSet: {reactions: body} },
        {new: true},
        {runValidators: true}
    )
        .then((dbThoughtData) => {
            if(!dbThoughtData){
                res.status(404).json({msg: "No thought is associated with this id!"});
                    return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
},

//delete reaction
deleteReaction({params}, res) {
    Thought.findOneAndUpdate(
        {_id:params.thoughtId},
        {$pull: {reactions: {reactionId: params.reactionId} } },
        {new: true}
        )
        .then ((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err));
    }
};

module.exports = thoughtControl;

