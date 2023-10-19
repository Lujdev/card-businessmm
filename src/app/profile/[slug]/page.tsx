import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import "../../../styles/card.css";

export default async function ProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const prisma = new PrismaClient();

  const profile = await prisma.profile.findFirst({
    where: { slug: params.slug },
  });
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="front side">
            <h1 className="logo">{profile?.name}</h1>
          </div>

          <div className="back side width-100">
            <span className="name">
              <h3>{profile?.name}</h3> <br /> <span>{profile?.title ?? ""}</span>
            </span>

            <div className="info width-50">
              <p>
                <span className="property">Email: </span>{profile?.email ?? ""}
              </p>
              <p>
                <span className="property">Twitter: </span>{profile?.website ?? ""}
              </p>
              <p>
                <span className="property">Telefono: </span>{profile?.phone ?? ""}
              </p>
              <p>
                <span className="property">Website: </span>{profile?.website2 ?? ""}
              </p>
            </div>
            <div className="width-50 cont-qa">
              <Image
                width={200}
                height={200}
                alt="codigoQR"
                src={profile?.qr ?? "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=www.megamassive.net"}
                className="img-qr"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
