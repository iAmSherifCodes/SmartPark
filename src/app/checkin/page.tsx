"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { api, ApiError } from '@/lib/api'
import { LogIn, QrCode, MapPin, Clock, CheckCircle, AlertCircle, Car } from 'lucide-react'

export default function CheckIn() {
    const [reservationId, setReservationId] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [checkedInSpace, setCheckedInSpace] = useState<string | null>(null)

    const handleCheckIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const response = await api.checkIn(reservationId)
            setSuccess(true)
            setCheckedInSpace(reservationId) // In real app, this would come from API response
            
            // Reset form after success
            setTimeout(() => {
                setReservationId('')
                setSuccess(false)
                setCheckedInSpace(null)
            }, 5000)
            
        } catch (err) {
            console.error('Check-in error:', err)
            setError(err instanceof ApiError ? err.message : 'Failed to check in. Please verify your reservation ID.')
        } finally {
            setLoading(false)
        }
    }

    const generateMockQR = () => {
        // In a real app, this would generate an actual QR code
        return `QR-${reservationId}-${Date.now()}`
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <LogIn className="h-8 w-8 text-primary" />
                    <h1 className="text-4xl font-bold">Check In to Your Space</h1>
                </div>
                <p className="text-xl text-muted-foreground">
                    Start your parking session by checking in with your reservation
                </p>
            </div>

            {/* Success Alert */}
            {success && (
                <Alert variant="success" className="border-green-500">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                        Successfully checked in to space {checkedInSpace}! Your parking session has started.
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Check-in Form */}
                <Card className="shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl flex items-center justify-center gap-2">
                            <Car className="h-6 w-6" />
                            Manual Check-in
                        </CardTitle>
                        <CardDescription>
                            Enter your reservation details to check in
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleCheckIn} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="checkinId" className="text-base font-semibold flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    Reservation ID
                                </Label>
                                <Input
                                    id="checkinId"
                                    value={reservationId}
                                    onChange={(e) => setReservationId(e.target.value.toUpperCase())}
                                    placeholder="e.g., RES-A1-123456"
                                    className="text-lg"
                                    required
                                />
                                <p className="text-sm text-muted-foreground">
                                    Enter the reservation ID from your booking confirmation
                                </p>
                            </div>

                            {reservationId && (
                                <Card className="bg-muted/50">
                                    <CardContent className="pt-6">
                                        <h3 className="font-semibold mb-3">Check-in Details</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>Reservation ID:</span>
                                                <span className="font-medium">{reservationId}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Check-in Time:</span>
                                                <span className="font-medium">{new Date().toLocaleTimeString()}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            <Button 
                                type="submit" 
                                className="w-full text-lg py-6" 
                                disabled={loading || !reservationId}
                                size="lg"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                        Checking In...
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="h-4 w-4 mr-2" />
                                        Check In Now
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* QR Code Check-in */}
                <Card className="shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl flex items-center justify-center gap-2">
                            <QrCode className="h-6 w-6" />
                            QR Code Check-in
                        </CardTitle>
                        <CardDescription>
                            Scan the QR code at your parking space
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div className="mx-auto w-48 h-48 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                            <div className="text-center">
                                <QrCode className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">
                                    QR Scanner
                                </p>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Feature coming soon
                                </p>
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            <Badge variant="outline" className="text-sm">
                                <Clock className="h-3 w-3 mr-1" />
                                Instant Check-in
                            </Badge>
                            <p className="text-sm text-muted-foreground">
                                Simply scan the QR code displayed at your reserved parking space for instant check-in
                            </p>
                        </div>

                        <Button variant="outline" className="w-full" disabled>
                            <QrCode className="h-4 w-4 mr-2" />
                            Open QR Scanner
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Instructions */}
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3 text-blue-900 dark:text-blue-100">
                        Check-in Instructions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
                        <div>
                            <h4 className="font-medium mb-2">Manual Check-in:</h4>
                            <ul className="space-y-1">
                                <li>• Enter your reservation ID</li>
                                <li>• Verify the details</li>
                                <li>• Click "Check In Now"</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">QR Code Check-in:</h4>
                            <ul className="space-y-1">
                                <li>• Locate your reserved space</li>
                                <li>• Scan the QR code</li>
                                <li>• Automatic check-in</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
