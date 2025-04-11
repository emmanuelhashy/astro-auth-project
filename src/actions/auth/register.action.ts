import { defineAction, z } from 'astro:actions';
import { db, User } from 'astro:db';
import { signIn } from 'auth-astro/client';
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
    const isCreated = await db.insert(User).values([user]);
    if (!isCreated) {
      const resp = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (resp) {
        return resp;
      }
    };
    return { ok: true };
  },
});
