import Header from "@/components/header";


type DashboardLayoutProps = {
    children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="h-full">
            <Header />
            <div className="px-3 lg:px-14">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
