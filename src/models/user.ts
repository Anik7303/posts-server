import mongoose from "mongoose";

import ModelNames from "./names";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    image: {
      type: Schema.Types.String,
      default: "default.png",
    },
  },
  { timestamps: true }
);

mongoose.model(ModelNames.USER, userSchema);
