"use client";
import Loader from "@/components/Loader";
import { useGlobalContext } from "@/context/GlobalProvider";
import { axiosInstance } from "@/utils/axiosConfig";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const { userData, setUserData } = useGlobalContext();
  const [imageSrc, setImageSrc] = useState(null);


  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first file
    setImage(file)
    if (file) {
      // console.log(file, "infile");

      const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the image
      setImageSrc(imageUrl); // Set the image source
    }
  };

  console.log(userData);

  const handleSubmit = async (e) => {

    const formData = new FormData();

    formData.append("name", name);
    formData.append("image", image);
    e.preventDefault();
    try {
      const res = await axiosInstance.put("/user/me",formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // console.log(res.data);
      toast.success("Updated Successfully");
      router.push("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Unable to update Data");
    }
  };
  return (
    <div className="lg:px-20 px-8 py-5">
      <div className="">
        <h1>Edit Profile</h1>
      </div>
      {userData ? (
        <div className="">
          {/* <div className="pt-5">
            <h1 className="text-center">Image</h1>
          </div> */}
          <div className="flex justify-center py-5 ">
            {/* <Image src={userData.profileImage} width='1000' height='1000' className="max-w-[300px] rounded-md" alt='' /> */}
            <img
              src={imageSrc ? imageSrc : userData.profileImage}
              alt=""
              className="max-w-[300px] rounded-md"
            />
          </div>
          <div className="flex justify-center">
            <form onSubmit={handleSubmit} action="" className="grid gap-5">
              <div className="grid gap-3">
                <label className=" text-sm font-medium text-gray-700">
                  Change Image
                </label>

                <input
                  type="file"
                  name="image"
                  id="image"
                  required
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file:bg-gray-50 file:px-5 file:py-2 file:rounded-md file:border file:border-gray-200 lg:file:mr-10 file:mr-5"
                />
              </div>
              <div className="grid gap-3">
                <label className=" text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="text"
                  readOnly
                  value={userData.email}
                  disabled
                  className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600 sm:text-sm"
                />
              </div>
              <div className="grid gap-3">
                <label className=" text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  required
                  defaultValue={userData.name}
                  onChange={(e) => setName(e.target.value)}
                  className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600 sm:text-sm"
                />
              </div>

              <div className="grid gap-3 pt-5">
                <input
                  type="submit"
                  required
                  value={"Apply changes"}
                  className=" w-full px-3 py-2 border border-gray-300 bg-black text-white rounded-md sm:text-sm"
                />
              </div>
            </form>
          </div>
        </div>
      ) : <Loader/>}
    </div>
  );
}
