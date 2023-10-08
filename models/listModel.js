const mongoose = require("mongoose");
// const enum ListVisibility {
//   PUBLIC = "PUBLIC",
//   PRIVATE = "PRIVATE"
// }


const listSchema = mongoose.Schema(
  {
    name : {
       type : String,
       required : true
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },

    items: [{
      type: mongoose.Schema.Types.ObjectId,
      default : [],
      ref: "game",
    }]
      ,
    visibility : {
      type : String,
      default : "PUBLIC",
      enum : ["PRIVATE","PUBLIC"]
    },
  },
  { timestamps: true }
);

const List = mongoose.model("List", listSchema);



module.exports = List;



