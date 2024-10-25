"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function CheckOut() {
    const [reservationId, setReservationId] = useState('')

    const handleCheckOut = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Check Out:', reservationId)
        //check-out logic here
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Check Out</CardTitle>
                <CardDescription>Exit your parking space</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleCheckOut} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="checkoutId">Reservation ID</Label>
                        <Input
                            id="checkoutId"
                            value={reservationId}
                            onChange={(e) => setReservationId(e.target.value)}
                            placeholder="Enter your reservation ID"
                            required
                        />
                    </div>
                    <Link href="/payment">
                        <Button type="submit" className="w-full">Proceed to Payment {"->"}</Button>
                    </Link>
                </form>
            </CardContent>
        </Card>
    )
}
