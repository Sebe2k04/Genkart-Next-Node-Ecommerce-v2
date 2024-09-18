import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="lg:px-20 px-8 py-10">
      <div className="">
        <h1 className="font-semibold text-xl">All Categories</h1>
      </div>
      <div className="pt-10 grid gap-10 lg:grid-cols-2">
        <div className="">
          <Image
            src="/casuals.jpg"
            width="1000"
            height="1000"
            alt="casuals"
            className="rounded-xl lg:max-w-[400px] m-auto"
          />
        </div>
        <div className="">
          <h1 className="font-semibold text-xl ">Casual shirts</h1>
          <h2 className="text-sm text-justify pt-">
            Casual shirts are a versatile wardrobe essential, offering a perfect
            balance between comfort and style. Typically made from breathable
            fabrics like cotton or linen, they come in a wide range of colors,
            patterns, and fits, making them ideal for various occasions. Whether
            it's a laid-back outing or a semi-formal event, casual shirts can be
            easily dressed up with chinos or dressed down with jeans. Their
            relaxed design, featuring button-down fronts and collar variations,
            provides a smart yet effortless look, making them a go-to choice for
            modern, everyday wear.
          </h2>
          <div className="pt-5">
            <Link
              href={"/categories/casuals"}
              className="bg-black py-1 px-5 w-fit text-white hover:font-semibold duration-200 rounded-xl"
            >
              Explore
            </Link>
          </div>{" "}
        </div>
      </div>
      <div className="pt-10 grid gap-10 lg:grid-cols-2 ">
        <div className="lg:order-2 order-1">
          <Image
            src="/tshirt.jpg"
            width="1000"
            height="1000"
            alt="tshirt"
            className="rounded-xl lg:max-w-[400px] m-auto"
          />
        </div>
        <div className="lg:order-1 order-2">
          <h1 className="font-semibold text-xl ">Tshirts</h1>
          <h2 className="text-sm text-justify pt-">
            Casual shirts are a versatile wardrobe essential, offering a perfect
            balance between comfort and style. Typically made from breathable
            fabrics like cotton or linen, they come in a wide range of colors,
            patterns, and fits, making them ideal for various occasions. Whether
            it's a laid-back outing or a semi-formal event, casual shirts can be
            easily dressed up with chinos or dressed down with jeans. Their
            relaxed design, featuring button-down fronts and collar variations,
            provides a smart yet effortless look, making them a go-to choice for
            modern, everyday wear.
          </h2>
          <div className="pt-5">
            <Link
              href={"/categories/tshirts"}
              className="bg-black py-1 px-5 w-fit text-white hover:font-semibold duration-200 rounded-xl"
            >
              Explore
            </Link>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
