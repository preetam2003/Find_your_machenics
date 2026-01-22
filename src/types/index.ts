import { Role, ShopStatus, BookingStatus, VehicleType } from '@prisma/client';

export type { Role, ShopStatus, BookingStatus, VehicleType };

export interface UserSession {
  id: string;
  email: string;
  name?: string | null;
  role: Role;
  image?: string | null;
  shopId?: string | null;
  shopStatus?: ShopStatus | null;
}

export interface ShopSearchParams {
  query?: string;
  city?: string;
  vehicleType?: VehicleType;
  latitude?: number;
  longitude?: number;
  radius?: number; // in kilometers
  page?: number;
  limit?: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
