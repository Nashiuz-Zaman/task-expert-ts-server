import bcrypt from "bcrypt";
import { handleDefaultErr } from "./handleDefaultErr";

export const compareHashed = async (
  plainText: string,
  hashed: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(plainText, hashed);
  } catch (error) {
    handleDefaultErr(error);
    return false;
  }
};
