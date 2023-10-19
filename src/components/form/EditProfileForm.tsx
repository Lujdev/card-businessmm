"use client";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useState } from "react";

export default function EditProfileForm({ profile }: { profile: any }) {
  const router = useRouter();

  const [profileUpdate, guardarProfile] = useState({
    email: profile.email,
    name: profile.name,
    phone: profile.phone,
    title: profile.title,
    website: profile.website,
    website2: profile.website2,
    website3: profile.website3,
    bio: profile.bio,
    qr: profile.qr
  });


  //Extraer usuario
  const { email, name, phone, title, website, website2, website3, bio, qr } =
    profileUpdate;

    //Generar QR
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://localhost:3000/profile/${profile.slug}`
  profile.qr = url;

  const onChange = (e: any) => {
    guardarProfile({
      ...profileUpdate,
      [e.target.name]: e.target.value,
    });
  };

  //Enviar la actualización
  const onSubmit = async (e: any) => {
    e.preventDefault();

    const response = await fetch("api/editprofile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        name: name,
        bio: bio ?? "",
        phone: phone ?? "",
        title: title ?? "",
        website: website ?? "",
        website2: website2 ?? "",
        website3: website3 ?? "",
        qr: profile.qr ?? "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=htts://www.megamassive.net"
      }),
    });

    console.log(response);

    if (response.ok) {
      alert("Te has actualizado con exito");
      router.push("/");
    } else {
      console.log("Error al mandar el json");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Actualizar Tarjeta
        </h2>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nombre
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={name}
                onChange={onChange}
                placeholder="Introducir tu nombre"
                disabled
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={email}
                onChange={onChange}
                placeholder="helpdesk@megamassive.net"
                disabled
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Telefono
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={phone}
                onChange={onChange}
                placeholder="+58"
                required
              />
            </div>
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Cargo
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={title}
                onChange={onChange}
                placeholder="CEO"
                required
              />
            </div>
            <div>
              <label
                htmlFor="website"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Pagina Web #1
              </label>
              <input
                type="text"
                name="website"
                id="website"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={website}
                onChange={onChange}
                placeholder="www.megamassive.net"
              />
            </div>
            <div>
              <label
                htmlFor="website1"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Pagina Web #2
              </label>
              <input
                type="text"
                name="website2"
                id="website2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={website2}
                onChange={onChange}
                placeholder="www.megamassive.net"
              />
            </div>
            <div>
              <label
                htmlFor="website3"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Pagina Web #3
              </label>
              <input
                type="text"
                name="website3"
                id="website3"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={website3}
                onChange={onChange}
                placeholder="www.megamassive.net"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="bio"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Biografía
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={8}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Escribe tu descripción aquí"
                value={bio}
                onChange={onChange}
              ></textarea>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Actualizar perfil
            </button>
            <Link href={"/"}>
            <button
              type="button"
              className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              <svg
                className="w-5 h-5 mr-1 -ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Regresar
            </button>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
