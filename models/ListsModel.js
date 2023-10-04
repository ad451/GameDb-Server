const mongoose = require("mongoose");
// const enum ListVisibility {
//   PUBLIC = "PUBLIC",
//   PRIVATE = "PRIVATE"
// }


const ListSchema = mongoose.Schema(
  {

    name : {
       type : String,
       required : true
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },

    ListItems: [{
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

const Lists = mongoose.model("Lists", ListSchema);



module.exports = Lists;



