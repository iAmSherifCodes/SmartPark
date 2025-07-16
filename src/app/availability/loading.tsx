import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Car } from 'lucide-react'

export default function Loading() {
    return (
        <div className="space-y-8">
            {/* Header Loading */}
            <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Car className="h-8 w-8 text-primary animate-pulse-slow" />
                    <Skeleton className="h-12 w-80" />
                </div>
                <Skeleton className="h-6 w-96 mx-auto mb-6" />
                
                {/* Stats Loading */}
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                    <Skeleton className="h-10 w-32 rounded-full" />
                    <Skeleton className="h-10 w-28 rounded-full" />
                    <Skeleton className="h-10 w-36 rounded-full" />
                </div>

                <Skeleton className="h-10 w-40 mx-auto" />
            </div>

            {/* Parking Spaces Grid Loading */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Card key={i} className="relative overflow-hidden animate-pulse">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4" />
                                    <Skeleton className="h-8 w-12" />
                                </div>
                                <Skeleton className="h-6 w-20 rounded-full" />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <Skeleton className="h-12 w-full rounded-md" />
                        </CardContent>
                        
                        {/* Status indicator */}
                        <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-b-[20px] border-l-transparent border-b-muted" />
                    </Card>
                ))}
            </div>
        </div>
    )
}