import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Product, db, eq, ProductImage } from "astro:db";
import { getSession } from "auth-astro/server";
import { v4 as UUID } from "uuid";

export const updateProduct = defineAction({
  accept: "form",
  input: z.object({
    id: z.string().optional(),
    description: z.string(),
    price: z.number(),
    brand: z.string(),
    slug: z.string(),
    stock: z.number(),
    tags: z.string(),
    name: z.string(),
    type: z.string(),
  }),
  handler: async (form, { locals, request }) => {
    const session = await getSession(request);
    const user = session?.user;
    const { isAdmin } = locals;
    if (!user && !isAdmin) {
      throw new Error("Unauthorized");
    }

    const { id = UUID(), ...rest } = form;
    rest.slug = rest.slug.toLowerCase().replaceAll(" ", "_").trim();

    const product = {
      id: id,
      user: user?.id!,
      ...rest,
    };
        await db.update(Product).set(product).where(eq(Product.id, id))

    return product;
  },
});
