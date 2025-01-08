import { FilterQuery, Model } from "mongoose";
import { handleDefaultErr } from "./handleDefaultErr";

export const documentExists = async <T>(
  model: Model<T>,
  filter: FilterQuery<T>
): Promise<boolean> => {
  try {
    const document = await model.findOne(filter).exec();
    return document !== null;
  } catch (err) {
    handleDefaultErr(err);
    return false;
  }
};


