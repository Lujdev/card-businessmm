import { type NextApiRequest, NextApiResponse } from "next";
import { ImageResponse } from '@vercel/og';

const og = async (req: NextApiRequest, res: NextApiResponse) => {
    //Get query params from request url

    const url = new URL(req.url!, 'http://localhost:3000')
    const username = url.searchParams.get('slug');

    if (!username) return res.status(400).json({ error: "el nombre de usuario es requerido"})

    return new ImageResponse(
    (
        <div tw="w-[200px] h-[200px] relative text-red-500 flex flex-col items-center justify-center">
            <p>{username}</p>
        <img tw="absolute bottom-4 right-4"
        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://localhost:3000/profile/${username}`} />
        </div>
    ),
    {
        width: 200, height: 200
    }
    )
}

export const config = {
    runtime: 'experimental-edge'
}

export default og;