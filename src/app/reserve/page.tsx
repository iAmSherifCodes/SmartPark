"use client"

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { api, ApiError } from '@/lib/api'
import { Calendar, Clock, MapPin, Car, CheckCircle, AlertCircle } from 'lucide-react'

export default function Reservations() {
    const searchParams = useSearchParams()
    const preselectedSpace = searchParams.get('space')

    const [spaceId, setSpaceId] = useState(preselectedSpace || '')
    const [endTime, setEndTime] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Set minimum datetime to current time
    useEffect(() => {
        const now = new Date()
        now.setMinutes(now.getMinutes() + 30) // Minimum 30 minutes from now
        const minDateTime = now.toISOString().slice(0, 16)

        if (!endTime) {
            const defaultEnd = new Date(now.getTime() + 2 * 60 * 60 * 1000) // 2 hours from now
            setEndTime(defaultEnd.toISOString().slice(0, 16))
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const reservationData = {
                spaceNumber: spaceId,
                checkoutTime: endTime,
                email: email
            }

            console.log("DATA>>>>", reservationData)

            await api.makeReservation(reservationData)
            setSuccess(true)

            // Reset form after success
            setTimeout(() => {
                setSpaceId('')
                setEndTime('')
                setEmail('')
                setSuccess(false)
            }, 3000)

        } catch (err) {
            console.error('Reservation error:', err)
            setError(err instanceof ApiError ? err.message : 'Failed to make reservation. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const getMinDateTime = () => {
        const now = new Date()
        now.setMinutes(now.getMinutes() + 15) // Minimum 15 minutes from now
        return now.toISOString().slice(0, 16)
    }

    const getMaxDateTime = () => {
        const maxDate = new Date()
        maxDate.setDate(maxDate.getDate() + 7) // Maximum 7 days from now
        return maxDate.toISOString().slice(0, 16)
    }

    const formatDateTime = (dateTimeString: string) => {
        if (!dateTimeString) return ''
        const date = new Date(dateTimeString)
        return date.toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    }

    const calculateDuration = () => {
        if (!endTime) return ''
        const now = new Date()
        const end = new Date(endTime)
        const diffMs = end.getTime() - now.getTime()
        const diffHours = Math.round(diffMs / (1000 * 60 * 60) * 10) / 10
        return diffHours > 0 ? `${diffHours} hours` : ''
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Calendar className="h-8 w-8 text-primary" />
                    <h1 className="text-4xl font-bold">Reserve Parking Space</h1>
                </div>
                <p className="text-xl text-muted-foreground">
                    Secure your parking spot in advance
                </p>
            </div>

            {/* Success Alert */}
            {success && (
                <Alert variant="success" className="border-green-500">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                        Reservation successful! Your parking space has been reserved.
                    </AlertDescription>
                </Alert>
            )}

            {/* Error Alert */}
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <Card className="shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl flex items-center justify-center gap-2">
                        <Car className="h-6 w-6" />
                        Reservation Details
                    </CardTitle>
                    <CardDescription>
                        Fill in the details below to reserve your parking space
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Space Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="spaceId" className="text-base font-semibold flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Parking Space
                            </Label>
                            <Input
                                id="spaceId"
                                placeholder="e.g., A1, B5, C12"
                                value={spaceId}
                                onChange={(e) => setSpaceId(e.target.value.toUpperCase())}
                                className="text-lg"
                                required
                            />
                            <p className="text-sm text-muted-foreground">
                                Enter the parking space number you want to reserve
                            </p>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-base font-semibold flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="your.email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="text-lg"
                                required
                            />
                            <p className="text-sm text-muted-foreground">
                                We'll send your reservation confirmation to this email
                            </p>
                        </div>

                        {/* End Time Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="endTime" className="text-base font-semibold flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Checkout Time
                            </Label>
                            <Input
                                id="endTime"
                                type="datetime-local"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                min={getMinDateTime()}
                                max={getMaxDateTime()}
                                className="text-lg"
                                required
                            />
                            {endTime && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <Badge variant="outline" className="text-sm">
                                        {formatDateTime(endTime)}
                                    </Badge>
                                    {calculateDuration() && (
                                        <Badge variant="secondary" className="text-sm">
                                            Duration: {calculateDuration()}
                                        </Badge>
                                    )}
                                </div>
                            )}
                            <p className="text-sm text-muted-foreground">
                                Select when you plan to leave the parking space (up to 7 days from now)
                            </p>
                        </div>

                        {/* Reservation Summary */}
                        {spaceId && endTime && email && (
                            <Card className="bg-muted/50">
                                <CardContent className="pt-6">
                                    <h3 className="font-semibold mb-3">Reservation Summary</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Space:</span>
                                            <span className="font-medium">{spaceId}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Email:</span>
                                            <span className="font-medium">{email}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Checkout Time:</span>
                                            <span className="font-medium">{formatDateTime(endTime)}</span>
                                        </div>
                                        {calculateDuration() && (
                                            <div className="flex justify-between">
                                                <span>Duration:</span>
                                                <span className="font-medium">{calculateDuration()}</span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <Button
                            type="submit"
                            className="w-full text-lg py-6"
                            disabled={loading || !spaceId || !endTime || !email}
                            size="lg"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                    Making Reservation...
                                </>
                            ) : (
                                <>
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Reserve Parking Space
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Help Text */}
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
                        Reservation Tips
                    </h3>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                        <li>• Reservations can be made up to 7 days in advance</li>
                        <li>• Minimum reservation time is 15 minutes from now</li>
                        <li>• You'll receive a confirmation once your reservation is processed</li>
                        <li>• Make sure to arrive within 15 minutes of your reservation time</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}
