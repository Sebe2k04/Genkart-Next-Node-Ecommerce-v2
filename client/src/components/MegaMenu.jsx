import Link from "next/link";

const MegaMenu = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto">
        <div className="flex justify-around items-center py-4">
          <Link href="/" className="text-xl font-bold">
            Logo
          </Link>
          <div className="relative group">
            <button className="text-white font-semibold py-2 px-4 rounded ">
              Services 
            </button>
            <div className="absolute left-0  bg-white text-gray-600 shadow-lg rounded-md hidden group-hover:block hover:block">
              <div className="container p-4 w-full">
                <div className=" min-w-[140px] text-sm">
                  <ul>
                    <li className="mb-2 hover:text-black">
                      <Link href="#">Web Development</Link>
                    </li>
                    <li className="mb-2 hover:text-black">
                      <Link href="#">App Developement</Link>
                    </li>
                    <li className="mb-2 hover:text-black">
                      <Link href="#">Web Design</Link>
                    </li>
                    <li className="mb-2 hover:text-black">
                      <Link href="#">Digital Marketing</Link>
                    </li>
                    <li className="mb-2 hover:text-black">
                      <Link href="#">All Services</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MegaMenu;
