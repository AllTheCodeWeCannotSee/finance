import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import Logo from "@/components/logo";
import Navigation from "@/components/navigation";
import { Loader2 } from "lucide-react";
import { WelcomeMsg } from "./welcome-msg";

const Header = () => {
    return (
        <div className="text-white bg-gradient-to-b from-blue-700 to-blue-500 pt-8 pb-36  px-4 lg:px-14 ">
            <div className=" flex items-center justify-between  mb-14">
                <div className="flex items-center lg:gap-x-16 ">
                    <Logo />
                    <Navigation />
                </div>
                <ClerkLoaded>
                    <UserButton />
                </ClerkLoaded>
                <ClerkLoading>
                    <Loader2 className="animate-spin" />
                </ClerkLoading>

            </div>
            <WelcomeMsg />
        </div>

    );
}

export default Header;