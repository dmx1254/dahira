const mongoose = require("mongoose");

const TalibeSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    dahiraname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    profile: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TalibeModel =
  mongoose.models.talibe || mongoose.model("talibe", TalibeSchema);

export default TalibeModel;
