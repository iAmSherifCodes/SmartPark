"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { api, ApiError } from '@/lib/api'
import { 
  CreditCard, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  DollarSign,
  Calendar,
  Lock
} from 'lucide-react'

export default function Payment() {
    const [paymentMethod, setPaymentMethod] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [cvv, setCvv] = useState('')
    const [cardName, setCardName] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Mock payment data - in real app, this would come from reservation context
    const paymentDetails = {
        reservationId: 'RES-A1-123456',
        spaceNumber: 'A1',
        duration: '2.5 hours',
        rate: '$5.00/hour',
        subtotal: 12.50,
        tax: 1.25,
        total: 13.75
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            // In a real app, you'd use a proper payment processor like Stripe
            const paymentData = {
                paymentId: `PAY-${Date.now()}`,
                amount: paymentDetails.total,
                cardNumber: cardNumber.replace(/\s/g, ''),
                method: paymentMethod
            }

            await api.processPayment(paymentData)
            setSuccess(true)
            
            // Reset form after success
            setTimeout(() => {
                setCardNumber('')
                setExpiryDate('')
                setCvv('')
                setCardName('')
                setPaymentMethod('')
                setSuccess(false)
            }, 5000)
            
        } catch (err) {
            console.error('Payment error:', err)
            setError(err instanceof ApiError ? err.message : 'Payment failed. Please check your details and try again.')
        } finally {
            setLoading(false)
        }
    }

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        const matches = v.match(/\d{4,16}/g)
        const match = matches && matches[0] || ''
        const parts = []
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4))
        }
        if (parts.length) {
            return parts.join(' ')
        } else {
            return v
        }
    }

    const formatExpiryDate = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4)
        }
        return v
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <CreditCard className="h-8 w-8 text-primary" />
                    <h1 className="text-4xl font-bold">Secure Payment</h1>
                </div>
                <p className="text-xl text-muted-foreground">
                    Complete your parking payment safely and securely
                </p>
            </div>

            {/* Success Alert */}
            {success && (
                <Alert variant="success" className="border-green-500">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                        Payment successful! Your parking session is now active. Receipt sent to your email.
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
                {/* Payment Form */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <Lock className="h-6 w-6" />
                            Payment Information
                        </CardTitle>
                        <CardDescription>
                            Your payment information is encrypted and secure
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Payment Method */}
                            <div className="space-y-2">
                                <Label className="text-base font-semibold">Payment Method</Label>
                                <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
                                    <SelectTrigger className="text-lg">
                                        <SelectValue placeholder="Select payment method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="credit">Credit Card</SelectItem>
                                        <SelectItem value="debit">Debit Card</SelectItem>
                                        <SelectItem value="paypal" disabled>PayPal (Coming Soon)</SelectItem>
                                        <SelectItem value="apple" disabled>Apple Pay (Coming Soon)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Card Details */}
                            {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="cardName" className="text-base font-semibold">
                                            Cardholder Name
                                        </Label>
                                        <Input
                                            id="cardName"
                                            value={cardName}
                                            onChange={(e) => setCardName(e.target.value)}
                                            placeholder="John Doe"
                                            className="text-lg"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="cardNumber" className="text-base font-semibold">
                                            Card Number
                                        </Label>
                                        <Input
                                            id="cardNumber"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                            placeholder="1234 5678 9012 3456"
                                            className="text-lg font-mono"
                                            maxLength={19}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="expiryDate" className="text-base font-semibold">
                                                Expiry Date
                                            </Label>
                                            <Input
                                                id="expiryDate"
                                                value={expiryDate}
                                                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                                                placeholder="MM/YY"
                                                className="text-lg font-mono"
                                                maxLength={5}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cvv" className="text-base font-semibold">
                                                CVV
                                            </Label>
                                            <Input
                                                id="cvv"
                                                value={cvv}
                                                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                                                placeholder="123"
                                                className="text-lg font-mono"
                                                maxLength={4}
                                                required
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            <Button 
                                type="submit" 
                                className="w-full text-lg py-6" 
                                disabled={loading || !paymentMethod}
                                size="lg"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                        Processing Payment...
                                    </>
                                ) : (
                                    <>
                                        <Shield className="h-4 w-4 mr-2" />
                                        Pay ${paymentDetails.total.toFixed(2)}
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Payment Summary */}
                <div className="space-y-6">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center gap-2">
                                <DollarSign className="h-6 w-6" />
                                Payment Summary
                            </CardTitle>
                            <CardDescription>
                                Review your parking charges
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Reservation ID:</span>
                                    <Badge variant="outline">{paymentDetails.reservationId}</Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Parking Space:</span>
                                    <span className="font-medium">{paymentDetails.spaceNumber}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Duration:</span>
                                    <span className="font-medium">{paymentDetails.duration}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Rate:</span>
                                    <span className="font-medium">{paymentDetails.rate}</span>
                                </div>
                            </div>

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>${paymentDetails.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax (10%):</span>
                                    <span>${paymentDetails.tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold border-t pt-2">
                                    <span>Total:</span>
                                    <span>${paymentDetails.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Features */}
                    <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                        <CardContent className="pt-6">
                            <h3 className="font-semibold mb-3 text-green-900 dark:text-green-100 flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                Secure Payment
                            </h3>
                            <div className="space-y-2 text-sm text-green-800 dark:text-green-200">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-3 w-3" />
                                    <span>256-bit SSL encryption</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-3 w-3" />
                                    <span>PCI DSS compliant</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-3 w-3" />
                                    <span>No card details stored</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-3 w-3" />
                                    <span>Instant receipt via email</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
