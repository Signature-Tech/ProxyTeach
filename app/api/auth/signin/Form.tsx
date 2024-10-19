"use client"

import Image from "next/image"
import bg from "@/images/bg.jpg"
import Semc from "@/images/semc_logo.png"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"

export default function Form() {

    const toast = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await signIn('credentials', {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        })

        if (!response?.error) {
            window.location.href = "/"
        }

        else {
            toast.toast({
                title: "Wrond Credentials !",
                description: "Are you sure you have the right credentials ?",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-3 xl:min-h-screen">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="flex-col text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-2 mb-6">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                name="email"
                                type="email"
                                placeholder="example@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2 mb-6">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input name="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src={bg}
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full object-cover fixed z-0"
                />
                <Image src={Semc} alt="Semc Logo" width={"200"} height={"200"} className="relative left-[430px] top-[150px] z-[1]" />
                <h1 className="relative text-[2rem] text-center left-[272px] top-[200px] z-[1]">BAF Shaheen English Medium College</h1>
            </div>
        </div>
    )
}
