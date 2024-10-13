const mongoose = require("mongoose");

const CotisationSchema = new mongoose.Schema(
  {
    type: Object,
    default: {},
  },
  {
    timestamps: true,
  }
);

const CotisationModel =
  mongoose.models.cotisation || mongoose.model("cotisation", CotisationSchema);

export default CotisationModel;
