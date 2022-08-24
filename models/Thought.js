const {Schema, model, Types} = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const reactionSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },

    reactionBody: {
        type: String,
        required: true,
        maxlength: 290,
    },

    username: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (timeStamp) => dateFormat(timeStamp),
    }
})

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: "Thought is required here!!",
            minlength: 1,
            maxlength: 290,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (timeStamp) => dateFormat(timeStamp),
        },

        username: {
            type: String,
            required: true,
        },

        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual("reactionCount").get(function (){
    return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
