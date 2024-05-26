
"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Plus } from "lucide-react";

import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { Payment, columns } from "./columns";
import { DataTable } from "@/components/data-table";

const mockData: Payment[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "728ed52a",
        amount: 100,
        status: "pending",
        email: "a@example.com",
    },
    // ...
]

export const AccountPage = () => {
    const { onOpen } = useNewAccount();
    const data = mockData;
    return (
        <div className="-m-24 max-w-screen-2xl mx-auto">
            <Card className="border-none drop-shadow-sm ">
                <CardHeader className="">
                    <CardTitle className="lg:flex lg:justify-between">
                        <p className="mb-4 text-xl line-clamp-1">Accounts page</p>
                        <Button
                            className="gap-x-2 w-full lg:size-min"
                            onClick={onOpen}
                        >
                            <Plus className="size-4" />
                            Add new
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={data}
                        filterKey="email"
                        onDelete={() => { }}
                    />
                </CardContent>
            </Card>
        </div>
    )
}


export default AccountPage;