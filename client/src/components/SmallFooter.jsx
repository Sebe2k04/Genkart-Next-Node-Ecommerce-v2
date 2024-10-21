import Link from 'next/link'
import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const SmallFooter = () => {
  return (
    <div>
      <div className="flex justify-center capitalize py-10 text-gray-400">
        <div className="">
          <h1 className="text-center">
            A product by{" "}
            <span>
              <Link
                href={"https://sebe2k04.vercel.app/"}
                about="_blank"
                className="px-1 text-black "
              >
                {" "}
                Sebe{" "}
              </Link>
            </span>{" "}
            | GenRio
          </h1>
          <div className="flex justify-center gap-5 text-black text-2xl pt-5">
            <Link href={"https://www.linkedin.com/in/sebe2k04/"}>
              <FaLinkedin />
            </Link>
            <Link href={"https://github.com/Sebe2k04"}>
              <FaGithub />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SmallFooter
