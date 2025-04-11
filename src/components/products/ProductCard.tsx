import type { ProductWithImages } from "@/interfaces";
import { Formatter } from "@/utils";
import { useState } from "react";

interface Props {
  product: ProductWithImages;
}

export const ProductCard = ({ product }: Props) => {
  const images = product.images.split(",").map((img) => {
    return img.startsWith("http")
      ? img
      : `${import.meta.env.PUBLIC_URL}/images/vehicles/${img}`;
  });

  const [currentImage, setCurrentImage] = useState(images[0]);

  return (
    <a href={`/products/${product.slug}`}>
      <img
        src={currentImage}
        alt={product.name}
        className="h-[350px] w-[300px] object-cover"
        onMouseEnter={() => setCurrentImage(images[1] ?? images[0])}
        onMouseLeave={() => setCurrentImage(images[0])}
      />
      <div className="space-y-1">
        <h4>{product.name}</h4>
        <p className="font-medium">
          Charges: <span className="font-bold">{Formatter.currency(product.price)}</span> per day
        </p>
        <p className="font-medium">
          Brand:<span>{product.brand}</span>
        </p>
        <div>
          {(Array.isArray(product.tags)
            ? product.tags
            : product.tags.split(",")
          ).map((tag) => (
            <span className="bg-black text-white text-sm py-1.5 px-2 capitalize rounded-md mr-2">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};
