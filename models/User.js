const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: "Username is needed and required",
        },

        email: {
            type: String,
            unique: true,
            required: "Username is needed and required",
            match: ["^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"],
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],

        urPals: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual("urPalsCount").get(function (){
    return this.urPals.length;
});

const User = model("User", userSchema);

module.exports = User;