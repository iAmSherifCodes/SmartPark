import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  CalendarDays, 
  Car, 
  CreditCard, 
  LogIn, 
  LogOut, 
  UserPlus, 
  Clock,
  MapPin,
  TrendingUp,
  Activity,
  DollarSign,
  Timer
} from "lucide-react"

export default function Dashboard() {
    // Mock data - in real app, this would come from API
    const stats = {
        totalReservations: 12,
        activeReservations: 1,
        totalSpent: 145.50,
        hoursParked: 28.5
    }

    const recentActivity = [
        { id: 1, action: "Reserved space A12", time: "2 hours ago", status: "active" },
        { id: 2, action: "Completed parking at B5", time: "1 day ago", status: "completed" },
        { id: 3, action: "Payment processed", time: "1 day ago", status: "completed" },
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to Your <span className="text-primary">SmartPark</span> Dashboard
                </h1>
                <p className="text-xl text-muted-foreground">
                    Manage your parking reservations and track your activity
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                    Total Reservations
                                </p>
                                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                                    {stats.totalReservations}
                                </p>
                            </div>
                            <CalendarDays className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                                    Active Now
                                </p>
                                <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                                    {stats.activeReservations}
                                </p>
                            </div>
                            <Activity className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                                    Total Spent
                                </p>
                                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                                    ${stats.totalSpent}
                                </p>
                            </div>
                            <DollarSign className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                                    Hours Parked
                                </p>
                                <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                                    {stats.hoursParked}
                                </p>
                            </div>
                            <Timer className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="text-center pb-4">
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <CalendarDays className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">Make a Reservation</CardTitle>
                        <CardDescription>Book your parking space in advance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/reserve">
                            <Button className="w-full" size="lg">
                                <CalendarDays className="mr-2 h-4 w-4" /> 
                                Reserve Now
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="text-center pb-4">
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <Car className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">Available Spaces</CardTitle>
                        <CardDescription>Check current parking availability</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/availability">
                            <Button className="w-full" size="lg">
                                <Car className="mr-2 h-4 w-4" /> 
                                View Spaces
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="text-center pb-4">
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <CreditCard className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">Payment</CardTitle>
                        <CardDescription>Proceed to payment for your parking</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/payment">
                            <Button className="w-full" size="lg">
                                <CreditCard className="mr-2 h-4 w-4" /> 
                                Pay Now
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <Card className="border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            Recent Activity
                        </CardTitle>
                        <CardDescription>Your latest parking activities</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${
                                        activity.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                                    }`} />
                                    <div>
                                        <p className="font-medium">{activity.action}</p>
                                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                                    </div>
                                </div>
                                <Badge variant={activity.status === 'active' ? 'default' : 'secondary'}>
                                    {activity.status}
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Quick Actions
                        </CardTitle>
                        <CardDescription>Frequently used features</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-3">
                            <Link href="/checkin">
                                <Button variant="outline" className="w-full justify-start" size="lg">
                                    <LogIn className="mr-2 h-4 w-4" />
                                    Check In to Space
                                </Button>
                            </Link>
                            <Link href="/checkout">
                                <Button variant="outline" className="w-full justify-start" size="lg">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Check Out
                                </Button>
                            </Link>
                            <div className="border-t pt-3 mt-4">
                                <p className="text-sm font-medium mb-3">Account Management</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <Link href="/signin">
                                        <Button variant="ghost" size="sm" className="w-full">
                                            <LogIn className="mr-2 h-3 w-3" />
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href="/signup">
                                        <Button variant="ghost" size="sm" className="w-full">
                                            <UserPlus className="mr-2 h-3 w-3" />
                                            Sign Up
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
