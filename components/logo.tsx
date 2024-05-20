import Image from "next/image";
import Link from "next/link";


const Logo = () => {
    return (
        <Link href="/">
            <div className="hidden lg:flex gap-x-2">
                <Image src="/logo.svg" width={28} height={28} alt="Logo" />
                <p className="font-bold text-2xl">Finance</p>
            </div>
        </Link>
    );
}

export default Logo;