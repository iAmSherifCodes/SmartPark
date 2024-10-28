import Link from 'next/link'
import Image from "next/image";
import { Button } from '@/components/ui/button'
import { ModeToggle } from "@/components/mode-toggle"

export default function Home() {
    return (
        <main className="flex mt-40 flex-col items-center justify-center ">
            <div className="absolute top-4 right-4">
                <ModeToggle />
            </div>

            <Image
                className="dark:invert mb-8"
                src="/images/vercel.svg"
                alt="Next.js logo"
                width={130}
                height={30}
                priority
            />
            <h1 className="text-4xl font-bold mb-8 text-center">Welcome to SmartPark</h1>

            <div className="flex flex-col items-center space-y-3 w-60 size-11">
                <Link href="/availability">
                    <Button className="w-full max-w-xs">View Available Spaces {"->"}</Button>
                </Link>
                <div className= "flex gap-4">
                    <Link href="/signin">
                        <Button variant="outline" className="w-full max-w-xs">Sign In</Button>
                    </Link>
                    <Link href="/signup">
                        <Button variant="outline" className="w-full max-w-xs">Sign Up</Button>
                    </Link>
                </div>

            </div>
        </main>
    )
}
