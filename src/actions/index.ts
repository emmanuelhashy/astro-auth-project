import { logout, registerUser } from "./auth";
import {
  updateProduct,
  getProductBySlug,
  getProducts,
} from "./products";

export const server = {
  logout,
  registerUser,

  getProducts,
  getProductBySlug,
  updateProduct,
};
