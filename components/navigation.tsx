"use client"
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useMedia } from "react-use";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";


const routes = [
    {
        title: "Overview",
        href: "/"
    },
    {
        title: "Transactions",
        href: "/transactions"
    },
    {
        title: "Accounts",
        href: "/accounts"
    },
    {
        title: "Categories",
        href: "/categories"
    },
    {
        title: "Settings",
        href: "/settings"
    }

]

type NavItemProps = {
    title: string;
    href: string;
}

const NavItem = ({ title, href }: NavItemProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Button
            asChild
            variant="outline"
            size="sm"
            className={cn("bg-inherit border-none hover:bg-white/20 hover:text-white focus:bg-white/30 transition", isActive && "bg-white/20")}
            onClick={() => router.push(href)}
        >
            <p>{title}</p>
        </Button>
    );
}


const Navigation = () => {
    const isMobile = useMedia("(max-width: 1024px)", false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const onClick = (href: string) => {
        router.push(href);
        setIsOpen(false);
    }
    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button

                        variant="outline"
                        size="sm"
                        className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
                    >
                        <Menu className="size-4 " />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="flex flex-col gap-y-2">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={route.href === pathname ? "secondary" : "ghost"}
                                onClick={() => onClick(route.href)}
                                className="w-full justify-start"
                            >
                                {route.title}
                            </Button>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        )
    }
    return (
        <div className="hidden lg:flex items-center gap-x-2">
            {routes.map((route) => (
                <NavItem
                    key={route.href}
                    title={route.title}
                    href={route.href}
                />
            ))}

        </div>
    );
}

export default Navigation;