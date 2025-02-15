"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Payment() {
    const [paymentId, setPaymentId] = useState('')
    console.log('Payment:', { paymentId })
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Payment:', { paymentId })
        fetch('https://kfxzkm0nzl.execute-api.us-east-1.amazonaws.com/webhook/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentId }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Payment response:', data)
            })
            .catch((error) => {
                console.error('Payment error:', error)
            })
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Payment</CardTitle>
                <CardDescription>Complete your parking payment</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="paymentId">Payment ID</Label>
                        <Input
                            id="paymentId"
                            placeholder="1234 5678 9012 3456"
                            value={paymentId}
                            onChange={(e) => setPaymentId(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">Pay Now</Button>
                </form>
            </CardContent>
        </Card>
    )
}
