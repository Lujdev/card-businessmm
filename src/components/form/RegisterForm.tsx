"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {

    const router = useRouter();

  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
    passwordconfirm: "",
    name: "",
    lastname: ""
  });

  //Extraer usuario
  const { email, password, passwordconfirm, name, lastname } = usuario;

  let fullname: string, slug: string;

  const onChange = (e: any) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  //Validar que no hayan campos vacios

  const onSubmit = async (e: any) => {
    e.preventDefault();

    //Validar que no existan campos vacios
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      passwordconfirm.trim() === "" ||
      name.trim() === "" ||
      lastname.trim() === ""
    ) {
      alert("Todos los campos son obligatorios!!");
      return null;
    }

    //Password minimo de 8 caracteres, 1 letra mayuscula y 1 letra miniscula
    const isStrongPassword = (p: any) =>
      p.search(/^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$)).{8,20}$/) != -1;
    if (!isStrongPassword(password)) {
      alert(
        "La contraseña debe tener 8 caracteres minimo"
      );
      return null;
    }

    //Los 2 password coinciden
    if(password !== passwordconfirm){
        alert("Las contraseñas ingresadas no coinciden");
        return null;
    }

    //concatenar el nombre y creación del slug

    if(name && lastname != ""){
      fullname = `${name} ${lastname}`
      slug = `${name}-${lastname}`
      slug = slug.toLowerCase();

      console.log(fullname, slug);
    }

   const response = await fetch('api/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: email,
        password: password,
        name: fullname,
        slug: slug
    })
   });

   if(response.ok){
    alert("Te has registrado con exito");
    router.push('/')
   }else{
    console.log("Error al mandar el json");
   }


  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
            width={200}
            height={200}
          />
          Megamassive C.A
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Crear Cuenta
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={onSubmit}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nombre
                </label>
                <input
                  type="input"
                  name="name"
                  id="name"
                  value={name}
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Jose"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Apellido
                </label>
                <input
                  type="input"
                  name="lastname"
                  id="lastname"
                  value={lastname}
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Martinez"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Tu correo
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={onChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  name="passwordconfirm"
                  id="passwordconfirm"
                  value={passwordconfirm}
                  onChange={onChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-light text-gray-500 dark:text-gray-300">
                    Acepto los{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      terminos y condiciones
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="bg-cyan-400 w-full text-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Crear Cuenta
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Ya tienes una cuenta?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Acceder aquí
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
