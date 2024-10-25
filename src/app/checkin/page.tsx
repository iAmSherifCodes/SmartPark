"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function CheckInOut() {
    const [reservationId, setReservationId] = useState('')

    const handleCheckIn = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Check In:', reservationId)
    }

    const handleCheckOut = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Check Out:', reservationId)
    }

    return (
        <div className="container mx-auto px-4 py-16 flex justify-center mt-10">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Check In/Out</CardTitle>
                    <CardDescription>Manage your parking session</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="checkin">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="checkin">Check In</TabsTrigger>
                            <TabsTrigger value="checkout">Check  Out</TabsTrigger>
                        </TabsList>
                        <TabsContent value="checkin">
                            <form onSubmit={handleCheckIn} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="checkinId">Reservation ID</Label>
                                    <Input
                                        id="checkinId"
                                        value={reservationId}
                                        onChange={(e) => setReservationId(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">Check In</Button>
                            </form>
                        </TabsContent>
                        <TabsContent value="checkout">
                            <form onSubmit={handleCheckOut} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="checkoutId">Reservation ID</Label>
                                    <Input
                                        id="checkoutId"
                                        value={reservationId}
                                        onChange={(e) => setReservationId(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">Proceed to Payment {"->"}</Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>

    )
}
