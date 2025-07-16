import { ApiResponse, ParkingSpace, ReservationRequest, PaymentRequest } from '@/types';

// const API_BASE_URL = 'https://kfxzkm0nzl.execute-api.us-east-1.amazonaws.com/webhook';
const API_BASE_URL = 'https://ml8xqtn1ef.execute-api.us-east-1.amazonaws.com/refactored';
class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    console.log(`Making API request to: ${url}`);
    const response = await fetch(url, config);

    console.log(`Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      // Try to get error details from response body
      let errorMessage = `API request failed: ${response.status} ${response.statusText}`;
      try {
        const errorBody = await response.text();
        if (errorBody) {
          console.error('Error response body:', errorBody);
          errorMessage += ` - ${errorBody}`;
        }
      } catch (e) {
        console.error('Could not read error response body');
      }

      throw new ApiError(errorMessage, response.status);
    }

    const data = await response.json();
    console.log('API response data:', data);
    return data;
  } catch (error) {
    console.error('API request error:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(`Network error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export const api = {
  // Get available parking spaces
  getAvailableSpaces: async (limit = 10, cursor?: string): Promise<ApiResponse<ParkingSpace>> => {
    const params = new URLSearchParams({ limit: limit.toString() });
    if (cursor) params.append('cursor', cursor);

    return apiRequest<ApiResponse<ParkingSpace>>(`/available-spaces?${params}`);
  },

  // Make a reservation
  makeReservation: async (data: ReservationRequest): Promise<any> => {
    return apiRequest('/reserve', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Process payment
  processPayment: async (data: PaymentRequest): Promise<any> => {
    return apiRequest('/pay', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Check in
  checkIn: async (reservationId: string): Promise<any> => {
    return apiRequest('/checkin', {
      method: 'POST',
      body: JSON.stringify({ reservationId }),
    });
  },

  // Check out
  checkOut: async (reservationId: string): Promise<any> => {
    return apiRequest('/checkout', {
      method: 'POST',
      body: JSON.stringify({ reservationId }),
    });
  },
};

export { ApiError };