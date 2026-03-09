import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <Card className="w-full shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Tobiira</CardTitle>
            <CardDescription>
              Access your properties, stays, and teams across the Tobiira
              platform.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/signup">Create account</Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/login">Log in</Link>
            </Button>

            <p className="pt-4 text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} Tobiira
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}