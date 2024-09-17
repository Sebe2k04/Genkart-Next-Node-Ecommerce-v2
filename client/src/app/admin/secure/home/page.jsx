import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="lg:px-20 px-8 py-10 min-h-[100vh]  flex items-center">
      <div className="grid lg:grid-cols-2 h-full w-full ">
        <div className="h-full ">
          <Image
            src="/admin.jpg"
            width="1000"
            height="1000"
            alt=""
            className="lg:max-w-[400px]  m-auto"
          />
        </div>
        <div className="py-10">
            <h1 className="text-3xl font-semibold">Welcome Mr.Sebe</h1>
            <h3 className="pt-5">We are awaiting for you !!</h3>
            <h5>Go and provide the details needed for the website . hurry up!!</h5>
            <div className="pt-5">
                <Link href={"/admin/secure/products"} className="text-white font-semibold bg-black py-2 px-5 rounded-md">Go to Products Page</Link>
            </div>
        </div>
      </div>
    </div>
  );
}
