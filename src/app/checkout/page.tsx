"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function CheckOut() {
    const [reservationId, setReservationId] = useState('');
    console.log({ "spaceNumber": reservationId });

    const handleCheckOut = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Check Out:', { "spaceNumber": reservationId })
        fetch('https://p0l7fhk64d.execute-api.us-east-1.amazonaws.com/test-a/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "spaceNumber": reservationId })
        }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));

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
                    {/* <Link href="/payment"> */}
                        <Button type="submit" className="w-full">Proceed to Payment {"->"}</Button>
                    {/* </Link> */}
                </form>
            </CardContent>
        </Card>
    )
}
