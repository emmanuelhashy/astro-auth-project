import { defineAction} from 'astro:actions';
import { z } from "astro:schema";
import { db, User } from 'astro:db';
import bcrypt from "bcryptjs";

export const registerUser = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
  }),
  handler: async ({ name, email, password }) => {
    const user = {
      name,
      email,
      password: bcrypt.hashSync(password),
      role: "user",
    }
    await db.insert(User).values([user]);
    return { ok: true };
  },
});
