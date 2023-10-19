import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

// Define a schema for input validation
const userSchema = z.object({
  email: z.string().min(1, "El Email es requerido").email("Email Invalido"),
  // password: z
  //   .string()
  //   .min(1, "Se requiere una contraseña")
  //   .min(8, "La contraseña debe tener al menos 8 caracteres"),
  name: z.string(),
  phone: z.string(),
  title: z.string(),
  website: z.string(),
  website2: z.string(),
  website3: z.string(),
  bio: z.string(),
  qr: z.string(),
});

export async function PUT(req: Request) {
  
  try {
    const body = await req.json();
    const { name, email, phone, title, website, website2, website3, bio, qr } =
      userSchema.parse(body);

      const updateUser = await db.profile.update({
        where:{
          email: email,
        },
        data: {
          name: name,
          phone: phone,
          title: title,
          website: website,
          website2: website2,
          website3: website3,
          bio: bio,
          qr: qr,
        }
      })

    return NextResponse.json(
      { user: updateUser, message: "Usuario actualizado exitosamente" },
      { status: 201 }
    );

  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err, success: false });
  }
}
