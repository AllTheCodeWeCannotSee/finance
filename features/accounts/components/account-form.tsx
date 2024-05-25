"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAccountSchema } from "@/db/schema";


import { useCreateAccounts } from "../api/use-create-accounts";
import { useNewAccount } from "../hooks/use-new-account";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";




const formSchema = insertAccountSchema.pick({ name: true });

type FormValues = z.input<typeof formSchema>;


export const AccountForm = () => {
    const { isOpen, onClose } = useNewAccount();
    const mutation = useCreateAccounts();

    const handleSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    }

    const disabled = mutation.isPending;


    const form = useForm<FormValues>({
        defaultValues: {},
        resolver: zodResolver(formSchema),
    })



    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 pt-4"
            >
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={disabled}
                                    placeholder="e.g. Cash, Bank, Credit Card"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className="w-full" disabled={disabled}>
                    Create Account
                </Button>


            </form>
        </Form>
    )
}