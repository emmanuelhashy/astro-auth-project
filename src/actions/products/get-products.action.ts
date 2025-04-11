import type { ProductWithImages } from "@/interfaces";
import { defineAction } from "astro:actions";
import { db, sql } from "astro:db";

export const getProducts = defineAction({
  accept: "json",
  handler: async () => {

    const productsQuery = sql`
        select a.*,
        ( select GROUP_CONCAT(image,',') from 
	        ( select * from ProductImage where productId = a.id)
        ) as images
        from Product a;
    `;

    const { rows } = await db.run(productsQuery);

    const products = rows.map((product) => {
      return {
        ...product,
        images: product.images ? product.images : "no-image.png",
      };
    }) as unknown as ProductWithImages[];

    return {
      products: products,
    };
  },
});
