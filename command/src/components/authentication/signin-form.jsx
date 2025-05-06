import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

export function SigninForm() {
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Sign In</CardTitle>
                <CardDescription>
                    Enter your details to sign in to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    action={async (formData) => {
                        "use server";
                        try {
                            await signIn("credentials", formData);
                        } catch (error) {
                            if (error instanceof AuthError) {
                                console.log(error);
                            }
                            throw error;
                        }
                    }}
                >
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john.doe@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••••••"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Sign In
                        </Button>
                    </div>
                </form>

                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="#" className="underline">
                        Contact Administrator
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
