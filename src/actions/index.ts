import { registerUser } from "./auth";
import {
  updateProduct,
  getProductBySlug,
  getProducts,
} from "./products";

export const server = {
  registerUser,

  getProducts,
  getProductBySlug,
  updateProduct,
};
