"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import Link from "next/link";
import { useEffect, useState } from "react";
import { api, ApiError } from '@/lib/api';
import { ParkingSpace } from '@/types';
import { Car, MapPin, Clock, Zap, RefreshCw, AlertCircle } from 'lucide-react';

export default function ParkingAvailability() {
    const [spaces, setSpaces] = useState<ParkingSpace[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [cursor, setCursor] = useState<string | null>(null);

    const fetchSpaces = async (showRefreshing = false) => {
        try {
            if (showRefreshing) setRefreshing(true);
            setError(null);

            const response = await api.getAvailableSpaces(12, cursor || undefined);
            setSpaces(response.data.items || []);

            if (response.data.cursor) {
                setCursor(response.data.cursor);
                if (typeof window !== 'undefined') {
                    localStorage.setItem("cursor", response.data.cursor);
                }
            }
        } catch (err) {
            console.error('Error fetching spaces:', err);
            setError(err instanceof ApiError ? err.message : 'Failed to load parking spaces');

            // Fallback to mock data for demo
            setSpaces([
                { space_no: 'A1', lot_id: 'lot1', type: 'regular', status: 'available', is_reserved: false },
                { space_no: 'A2', lot_id: 'lot1', type: 'regular', status: 'occupied', is_reserved: true },
                { space_no: 'B1', lot_id: 'lot1', type: 'handicap', status: 'available', is_reserved: false },
                { space_no: 'B2', lot_id: 'lot1', type: 'electric', status: 'available', is_reserved: false },
                { space_no: 'C1', lot_id: 'lot1', type: 'regular', status: 'maintenance', is_reserved: false },
                { space_no: 'C2', lot_id: 'lot1', type: 'compact', status: 'available', is_reserved: false },
            ]);
        } finally {
            setLoading(false);
            if (showRefreshing) setRefreshing(false);
        }
    };

    useEffect(() => {
        // Get cursor from localStorage on mount
        if (typeof window !== 'undefined') {
            const savedCursor = localStorage.getItem("cursor");
            if (savedCursor) setCursor(savedCursor);
        }
        fetchSpaces();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'available': return 'success';
            case 'occupied': return 'destructive';
            case 'reserved': return 'warning';
            case 'maintenance': return 'secondary';
            default: return 'default';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'electric': return <Zap className="h-4 w-4" />;
            case 'handicap': return <MapPin className="h-4 w-4" />;
            default: return <Car className="h-4 w-4" />;
        }
    };

    const availableSpaces = spaces.filter(space => space.status === 'available');
    const occupiedSpaces = spaces.filter(space => space.status === 'occupied' || space.status === 'reserved');

    if (loading) {
        return (
            <div className="space-y-8">
                <div className="text-center">
                    <Skeleton className="h-12 w-64 mx-auto mb-4" />
                    <Skeleton className="h-6 w-96 mx-auto" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Card key={i} className="p-6">
                            <Skeleton className="h-6 w-16 mb-4" />
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-10 w-full" />
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Car className="h-8 w-8 text-primary" />
                    <h1 className="text-4xl font-bold">Available Parking Spaces</h1>
                </div>
                <p className="text-xl text-muted-foreground mb-6">
                    Find and reserve your perfect parking spot in real-time
                </p>

                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                    <div className="bg-green-50 dark:bg-green-950 px-4 py-2 rounded-full">
                        <span className="text-green-700 dark:text-green-300 font-semibold">
                            {availableSpaces.length} Available
                        </span>
                    </div>
                    <div className="bg-red-50 dark:bg-red-950 px-4 py-2 rounded-full">
                        <span className="text-red-700 dark:text-red-300 font-semibold">
                            {occupiedSpaces.length} Occupied
                        </span>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950 px-4 py-2 rounded-full">
                        <span className="text-blue-700 dark:text-blue-300 font-semibold">
                            {spaces.length} Total Spaces
                        </span>
                    </div>
                </div>

                <Button
                    onClick={() => fetchSpaces(true)}
                    disabled={refreshing}
                    variant="outline"
                    className="mb-6"
                >
                    <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                    {refreshing ? 'Refreshing...' : 'Refresh Spaces'}
                </Button>
            </div>

            {/* Error Alert */}
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        {error} - Showing demo data for now.
                    </AlertDescription>
                </Alert>
            )}

            {/* Parking Spaces Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {spaces.map((space) => (
                    <Card
                        key={space.space_no}
                        className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${space.status === 'available'
                            ? 'border-green-500 bg-green-50/50 dark:bg-green-950/20'
                            : space.status === 'occupied' || space.status === 'reserved'
                                ? 'border-red-500 bg-red-50/50 dark:bg-red-950/20'
                                : 'border-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20'
                            }`}
                    >
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                    {getTypeIcon(space.type)}
                                    {space.space_no}
                                </CardTitle>
                                <Badge variant={getStatusColor(space.status)} className="capitalize">
                                    {space.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span className="capitalize">{space.type} Space</span>
                            </div>

                            {space.status === 'available' && (
                                <Link href={`/reserve?space=${space.space_no}`} className="block">
                                    <Button className="w-full" size="lg">
                                        <Clock className="h-4 w-4 mr-2" />
                                        Reserve Now
                                    </Button>
                                </Link>
                            )}

                            {space.status === 'occupied' && (
                                <Button disabled className="w-full" variant="secondary">
                                    Currently Occupied
                                </Button>
                            )}

                            {space.status === 'reserved' && (
                                <Button disabled className="w-full" variant="secondary">
                                    Reserved
                                </Button>
                            )}

                            {space.status === 'maintenance' && (
                                <Button disabled className="w-full" variant="outline">
                                    Under Maintenance
                                </Button>
                            )}
                        </CardContent>

                        {/* Status indicator */}
                        <div className={`absolute top-0 right-0 w-0 h-0 border-l-[20px] border-b-[20px] border-l-transparent ${space.status === 'available'
                            ? 'border-b-green-500'
                            : space.status === 'occupied' || space.status === 'reserved'
                                ? 'border-b-red-500'
                                : 'border-b-yellow-500'
                            }`} />
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {spaces.length === 0 && !loading && (
                <div className="text-center py-12">
                    <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No parking spaces found</h3>
                    <p className="text-muted-foreground mb-4">
                        There are currently no parking spaces available.
                    </p>
                    <Button onClick={() => fetchSpaces(true)}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Try Again
                    </Button>
                </div>
            )}
        </div>
    );
}