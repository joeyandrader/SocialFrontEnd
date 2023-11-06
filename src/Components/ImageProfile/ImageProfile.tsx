import { User, UserInfo } from "../../models/usuario/Usuario.interface"


interface ProfileImageProps {
    imageUrl?: string,
    width?: string,
    height?: string,
    user?: UserInfo | null
}

const ImageProfile = ({ imageUrl, user, width, height }: ProfileImageProps) => {

    const InitialName = (name?: UserInfo | null) => {
        if (name) {
            const firstName: any | null = user?.firstName[0][0].toUpperCase()
            const lastName: any | null = user?.lastName[0][0].toUpperCase()
            var initialName = firstName + lastName
            return initialName;
        }
    }

    return (
        <>
            {imageUrl && imageUrl != "" ? (
                <img className={`bg-gray-700 rounded-full w-${height} h-${width}`} src={`https://localhost:7292/public/img/${imageUrl}`} alt="" />
            ) : (
                <>
                    <span className={`bg-gray-700 rounded-full w-${height} h-${width} flex items-center justify-center text-white font-semibold`}>{InitialName(user)}</span>
                </>
            )}

        </>
    )
}

export default ImageProfile