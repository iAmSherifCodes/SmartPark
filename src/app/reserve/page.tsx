"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Reservations() {
    const [spaceId, setSpaceId] = useState('')
    const [endTime, setEndTime] = useState('')
    console.log(spaceId, endTime);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle reservation logic here
        console.log('Reservation:', { "spaceNumber": spaceId, "reserveTime": endTime })
        fetch('https://kfxzkm0nzl.execute-api.us-east-1.amazonaws.com/webhook/reserve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "spaceNumber": spaceId, "reserveTime": endTime })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }

    return (
        <div className="container mx-auto px-4 py-16 flex justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Make a Reservation</CardTitle>
                    <CardDescription>Reserve your parking space</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="spaceId">Parking Space</Label>
                            <Input
                                id="spaceId"
                                placeholder="A1"
                                value={spaceId}
                                onChange={(e) => setSpaceId(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endTime">End Time</Label>
                            <Input
                                id="endTime"
                                type="datetime-local"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">Make Reservation</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
