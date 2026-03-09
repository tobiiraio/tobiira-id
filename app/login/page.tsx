"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Request OTP for:", email);

    // Later:
    // await fetch("/api/v1/auth/request-otp", { ... })
  };

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <Card className="w-full shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Log in to Tobiira</CardTitle>
            <CardDescription>
              Enter your email and we&apos;ll send you a one-time code.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-medium text-foreground underline underline-offset-4">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}