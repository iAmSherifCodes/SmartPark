import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Car, CreditCard, LogIn, LogOut, UserPlus } from "lucide-react"

export default function Page() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Welcome to SmartPark</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Make a Reservation</CardTitle>
                        <CardDescription>Book your parking space in advance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/reserve">
                            <Button className="w-full">
                                <CalendarDays className="mr-2 h-4 w-4" /> Reserve Now
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Available Spaces</CardTitle>
                        <CardDescription>Check current parking availability</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/availability">
                            <Button className="w-full">
                                <Car className="mr-2 h-4 w-4" /> View Spaces
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>Manage your account</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-2">
                        <Link href="/signup">
                            <Button variant="outline" className="w-full">
                                <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                            </Button>
                        </Link>
                        <Link href="/signin">
                            <Button variant="outline" className="w-full">
                                <LogIn className="mr-2 h-4 w-4" /> Sign In
                            </Button>
                        </Link>
                        <Button variant="outline" className="w-full">
                            <LogOut className="mr-2 h-4 w-4" /> Sign Out
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Check In/Out</CardTitle>
                        <CardDescription>Manage your parking session</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-2">
                        <Link href="/checkin">
                            <Button className="w-full">Check In</Button>
                        </Link>
                        <Link href="/checkout">
                            <Button className="w-full">Check Out</Button>
                        </Link>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Payment</CardTitle>
                        <CardDescription>Proceed to payment for your parking</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/payment">
                            <Button className="w-full">
                                <CreditCard className="mr-2 h-4 w-4" /> Pay Now
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
