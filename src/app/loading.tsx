import { Car } from 'lucide-react'

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                    <Car className="relative h-16 w-16 text-primary animate-bounce mx-auto" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Loading SmartPark</h2>
                    <p className="text-muted-foreground">Please wait while we prepare your parking experience...</p>
                </div>
                <div className="flex justify-center">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}