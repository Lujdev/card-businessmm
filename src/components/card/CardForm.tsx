"use client";

import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import QRCode from 'qrcode'
import { useState } from "react";

export default function CardForm({ profile }: { profile: any }) {
  
  const [src, setSrc] = useState<string>('');
  const route = useRouter();

  const generate =  () => {

    const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://localhost:3000/profile/${profile.slug}`
    setSrc(url);

  }


  return (
    <>
      {/* Tarjeta */}
      <div className="   flex flex-wrap items-center justify-center">
        <div className="container max-w-lg bg-white rounded  shadow-lg transform duration-200 easy-in-out m-12">
          <div className="h-2/4 sm:h-64 overflow-hidden">
            <Image
              className="w-full rounded-t"
              src={
                "https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              }
              alt="Photo by aldi sigun on Unsplash"
              height={512}
              width={384}
            />
          </div>
          <div className="flex justify-start px-5 -mt-12 mb-5">
            <span className="block relative h-32 w-32">
              <Image
                alt="Photo by aldi sigun on Unsplash"
                src={
                  profile?.imgSrc ??
                  "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                }
                className="mx-auto object-cover rounded-full h-24 w-24 bg-white p-1"
                height={96}
                width={96}
              />
            </span>
          </div>
          <div className="">
            <div className="px-7 mb-8">
              <h2 className="text-3xl font-bold text-sky-800 dark:text-gray-300">
                {profile.name}
              </h2>
              <p className="text-gray-400 mt-2 dark:text-gray-400">
                {profile?.title ?? "Introduzca un cargo"}
              </p>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-align: justify;">
                {profile?.bio ?? "Inserte una Biografia"}
              </p>
              <div className="justify-center px-4 py-2 cursor-pointer bg-sky-900 max-w-min mx-auto mt-8 rounded-lg text-gray-300 hover:bg-sky-800 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-200">
                {profile.email}
              </div>
              <div className="justify-center px-[85px] py-2 cursor-pointer max-w-sm mx-auto mt-8">
                <Image src={profile?.qr ?? "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=www.megamassive.net"} alt={"qr"} width={200} height={200} />
              </div>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-8">
                <a
                  href={`//${profile?.website}` ?? "#"}
                  target="_blank"
                  className="text-sky-900 hover:text-sky-700 p-1 sm:p-2 inline-flex items-center dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                  >
                    {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                  </svg>
                </a>
                <a
                  href={`//${profile?.website2}` ?? "#"}
                  className="text-sky-900 hover:text-sky-700 p-1 sm:p-2 inline-flex items-center dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 640 512"
                  >
                    {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                    <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
                  </svg>
                </a>
              </div>
              <div className="grid grid-cols-6 grid-rows-1 gap-12">
                <div>
                  <Link href={`/profile/${profile.slug}`}>
                    <button
                      type="button"
                      className="justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Publicar
                    </button>
                  </Link>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div>
                  <Link href="/editprofile">
                    <button
                      type="button"
                      className="justify-center text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800"
                    >
                      Editar
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </>
  );
}
