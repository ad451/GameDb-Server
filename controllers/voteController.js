const asyncHandler = require("express-async-handler");
const Reply = require("../models/replymodel");

const upvoteReply = (Model) => {
    return (asyncHandler(async (req, res) => {
        const upvoted = await Model.findById(
            req.params.id
        );
        if (upvoted) {

            const upvotes = upvoted.upvotes;

            let exists = 0;
            upvotes.forEach((User_id, index) => {

                if (req.user._id.toString() == User_id.toString()) {
                    upvotes.splice(index, 1);
                    exists = 1;
                }
            });

            if (!exists) {
                upvotes.push(req.user._id)
            }

            const downvotes = upvoted.downvotes;

            exists = 0;
            downvotes.forEach((User_id, index) => {
                if (req.user._id.toString() == User_id.toString()) {
                    downvotes.splice(index, 1);
                    exists = 1;
                }
            });

            const ItemUpvoted = await upvoted.save();

            if (ItemUpvoted) {
                if (Model == Reply) {
                    res.json({ message: "reply upvoted" });
                }
                else {
                    res.json({ message: "review upvoted" });

                }
            }

        }
        else {
            if (Model == Reply) {
                res.json({ message: "reply not upvoted" });
            }
            else {
                res.json({ message: "review not upvoted" });

            }

        }

    }))
};


const downvoteReply = (Model) => {
    return (asyncHandler(async (req, res) => {
        const downvoted = await Model.findById(
            req.params.id
        );

        if (downvoted) {
            const downvotes = downvoted.downvotes;

            let exists = 0;
            downvotes.forEach((User_id, index) => {
                if (req.user._id.toString() == User_id.toString()) {
                    downvotes.splice(index, 1);
                    exists = 1;
                }
            });

            if (!exists) {
                downvotes.push(req.user._id)
            }

            const upvotes = downvoted.upvotes;

            exists = 0;
            upvotes.forEach((User_id, index) => {
                if (req.user._id.toString() == User_id.toString()) {
                    upvotes.splice(index, 1);
                    exists = 1;
                }
            });
            const Itemdownvoted = await downvoted.save();

            if (Itemdownvoted) {
                if (Model == Reply) {
                    res.json({ message: "reply downvoted" });
                }
                else {
                    res.json({ message: "review downvoted" });

                }
            }
        }
        else {
            if (Model == Reply) {
                res.json({ message: "reply not downvoted" });
            }
            else {
                res.json({ message: "review not downvoted" });

            }

        }

    }))
};

module.exports = {
    upvoteReply,
    downvoteReply
};