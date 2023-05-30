import mongoose from "mongoose";

import ModelNames from "./names";

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    content: {
      type: Schema.Types.String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

mongoose.model(ModelNames.POST, postSchema);
