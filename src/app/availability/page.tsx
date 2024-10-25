import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import Link from "next/link";

const spaces = [
    { id: 'A1', status: 'available' },
    { id: 'A2', status: 'occupied' },
    { id: 'B1', status: 'available' },
    { id: 'B2', status: 'reserved' },
    { id: 'C1', status: 'available' },
    { id: 'C2', status: 'maintenance' },
]

export default function ParkingAvailability() {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-8">Available Parking Spaces</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {spaces.map((space) => (
                    <Card key={space.id} className={space.status === 'available' ? 'border-green-500' : ''}>
                        <CardHeader>
                            <CardTitle>Space {space.id}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="capitalize mb-4">{space.status}</p>
                            {space.status === 'available' && (
                                <Link href="/reserve">
                                    <Button>Reserve</Button>
                                </Link>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
