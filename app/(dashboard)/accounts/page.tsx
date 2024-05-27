
"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Loader2, Plus } from "lucide-react";

import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete-accounts";



export const AccountPage = () => {
    const { onOpen } = useNewAccount();
    const accountsQuery = useGetAccounts();
    const deleteAccounts = useBulkDeleteAccounts();
    const accounts = accountsQuery.data || [];

    const isDiabled = accountsQuery.isLoading || deleteAccounts.isPending;

    if (accountsQuery.isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader>
                        <Skeleton className="h-8 w-48" />
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full flex items-center justify-center">
                            <Loader2 className="size-6 text-slate-300 animate-spin" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

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
                        data={accounts}
                        filterKey="name"
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id);
                            deleteAccounts.mutate({ ids });
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    )
}


export default AccountPage;