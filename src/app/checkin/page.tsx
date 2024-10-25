"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function CheckIn() {
    const [reservationId, setReservationId] = useState('')

    const handleCheckIn = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Check In:', reservationId)
        //check-in logic here
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Check In</CardTitle>
                <CardDescription>Enter your parking space</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleCheckIn} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="checkinId">Reservation ID</Label>
                        <Input
                            id="checkinId"
                            value={reservationId}
                            onChange={(e) => setReservationId(e.target.value)}
                            placeholder="Enter your reservation ID"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">Check In</Button>
                </form>
            </CardContent>
        </Card>
    )
}
