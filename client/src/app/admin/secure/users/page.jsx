"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";

import { axiosInstance } from "@/utils/axiosConfig";
import { useGlobalContext } from "@/context/GlobalProvider";

import Pagination from "@/components/Pagination";
import Loader from "@/components/Loader";

export default function Page() {
  const [PaginatedValue, SetPaginatedValue] = useState(1);

  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);
  const { pagination, setPagination } = useGlobalContext();
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    if (PaginatedValue == pagination.totalPages) {
    } else {
      setPagination({ ...pagination, totalPages: PaginatedValue });
    }
  }, [PaginatedValue]);

  const memoizedData = useMemo(() => {
    const fetchUsers = async () => {
      const query = new URLSearchParams({
        page: pagination.currentPage,
      }).toString();
      try {
        const res = await axiosInstance.get(`/user/all?${query}`);
        // console.log(res.data);

        setUsers(res.data.users);
        SetPaginatedValue(res.data.totalPages);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching Product");
        console.error(error);
      }
    };
    return async () => {
      setLoading(true);
      await fetchUsers();
    };
  }, [pagination]);
  useEffect(() => {
    memoizedData();
  }, [memoizedData]);
  return (
    <div className="lg:px-10 px-8 py-8 lg:pt-8 pt-24">
      <div className="lg:flex justify-between items-center ">
        <div className="flex gap-2 items-center">
          <Link href={"/admin/secure/home"}>
            <IoIosArrowBack />
          </Link>

          <h1 className="text-xl font-semibold">All Users</h1>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="py-10">
          {users && (
            <div className="w-full overflow-x-scroll pb-20">
              <table className="table-auto w-full">
                <thead>
                  <tr className="py-5 bg-gray-200 w-full ">
                    <th className="lg:px-8 px-5 py-5 ">Image</th>
                    <th className="lg:px-8 px-5 py-5 ">Name</th>
                    <th className="lg:px-8 px-5 py-5 ">Cart count</th>
                    <th className="lg:px-8 px-5 py-5 ">Email</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={users._id}>
                      <td className="px-5 text-center py-3 flex justify-center">
                        <img
                          src={user.profileImage}
                          alt={user.name}
                          className="max-w-[100px] max-h-[100px] aspect-square object-cover rounded-md"
                        />
                      </td>
                      <td className="px-5 text-center py-3">{user.name}</td>
                      <td className="px-5 text-center py-3">
                        {user.cart.length}
                      </td>
                      <td className="px-5 text-center py-3">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      <div className="flex justify-center py-5">
        <Pagination />
      </div>
    </div>
  );
}
