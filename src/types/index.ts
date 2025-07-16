export interface ParkingSpace {
  space_no: string;
  lot_id: string;
  type: 'regular' | 'handicap' | 'electric' | 'compact';
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  is_reserved: boolean;
}

export interface ApiResponseData<T> {
  items: T[];
  count: number;
  cursor?: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: ApiResponseData<T>;
  timestamp: string;
}

export interface ReservationRequest {
  spaceNumber: string;
  checkoutTime: string;
  email: string;
}

export interface PaymentRequest {
  paymentId: string;
}

export interface CheckInRequest {
  reservationId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Reservation {
  id: string;
  spaceId: string;
  userId: string;
  startTime: string;
  endTime: string;
  status: 'active' | 'completed' | 'cancelled';
}