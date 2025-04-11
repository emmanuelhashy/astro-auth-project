import { db, Role, User, Product, ProductImage } from "astro:db";
import { v4 as UUID } from "uuid";
import bcrypt from "bcryptjs";
import { seedVehicles } from "./seed-data";

// https://astro.build/db/seed
export default async function seed() {
  const roles = [
    { id: "admin", name: "Administrator" },
    { id: "user", name: "User" },
  ];

  const paulPlay = {
    id: "001-002-PAUL",
    name: "Paul Play",
    email: "paul@gmail.com",
    password: bcrypt.hashSync("password"),
    role: "admin",
  };
  const peterParker = {
    id: "001-002-PETER",
    name: "Peter Parker",
    email: "peter@gmail.com",
    password: bcrypt.hashSync("password"),
    role: "user",
  };

  await db.insert(Role).values(roles);
  await db.insert(User).values([paulPlay, peterParker]);

  const queries: any = [];

  seedVehicles.forEach((p) => {
    const product = {
      id: UUID(),
      description: p.description,
      price: p.price,
      brand: p.brand,
      slug: p.slug,
      stock: p.stock,
      tags: p.tags.join(","),
      name: p.name,
      type: p.type,
      user: paulPlay.id,
    };

    queries.push(db.insert(Product).values(product));

    p.images.forEach((img) => {
      const image = {
        id: UUID(),
        image: img,
        productId: product.id,
      };
      queries.push(db.insert(ProductImage).values(image));
    });
  });

  db.batch(queries);
}
