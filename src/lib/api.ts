
import useSWR from 'swr';
import { useUserStore } from '@/store/userStore';
import type { ApiResponse, User, Order, Room, News, Cuisine, OrderData } from './types';

// A generic fetcher that can handle auth tokens
const fetcher = async <T>([url, token]: [string, string | null]): Promise<T> => {
  const res = await fetch(url, {
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'An error occurred while fetching the data.');
  }
  return res.json() as Promise<T>;
};

const API_URL = 'https://hotel-booking-backend-1-e9n9.onrender.com/api/v1';

// --- SWR Hooks for data fetching ---

export function useUser() {
  const { token } = useUserStore.getState();
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<User>>(token ? [`${API_URL}/user/`, token] : null, fetcher);
  return { user: data?.result, error, isLoading, mutate };
}

export function useOrderById(id: string) {
  const { token } = useUserStore.getState();
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Order>>(token && id ? [`${API_URL}/orders/${id}`, token] : null, fetcher);
  return { order: data?.result, error, isLoading, mutate };
}

export function useOrders() {
  const { token } = useUserStore.getState();
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Order[]>>(token ? [`${API_URL}/orders/`, token] : null, fetcher);
  return { orders: data?.data || [], error, isLoading, mutate };
}

export function useRooms() {
  const { data, error, isLoading } = useSWR<ApiResponse<Room[]>>([`${API_URL}/rooms`, null], fetcher);
  return {
    rooms: data?.result || [],
    isLoading,
    isError: error,
  };
}

export function useRoomById(id: string) {
  const { data, error, isLoading } = useSWR<ApiResponse<Room>>(id ? [`${API_URL}/rooms/${id}`, null] : null, fetcher);
  return {
    room: data?.result,
    isLoading,
    isError: error,
  };
}

export function useNews() {
  const { data, error, isLoading } = useSWR<ApiResponse<News[]>>([`${API_URL}/home/news/`, null], fetcher);
  return {
    news: data?.result || [],
    isLoading,
    isError: error,
  };
}

export function useCuisine() {
  const { data, error, isLoading } = useSWR<ApiResponse<Cuisine[]>>([`${API_URL}/home/culinary/`, null], fetcher);
  return {
    cuisine: data?.result || [],
    isLoading,
    isError: error,
  };
}

// --- API Calls for mutations ---

export const signupUser = async (userData: Partial<User>) => {
  const res = await fetch(`${API_URL}/user/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Signup failed');
  }
  return res.json() as Promise<ApiResponse<User>>;
};

export const loginUser = async (credentials: Pick<User, 'email' | 'password'>) => {
  const res = await fetch(`${API_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Login failed');
  }
  return res.json() as Promise<ApiResponse<User>>;
};

export const updateUser = async (userData: Partial<User>) => {
    const { token } = useUserStore.getState();
    const res = await fetch(`${API_URL}/user/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Update failed');
    }
    return res.json();
};

export const getOrders = async () => {
    const { token } = useUserStore.getState();
    const res = await fetch(`${API_URL}/orders/`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        throw new Error('Failed to fetch orders');
        console.log('Failed to fetch orders'); 
    }
    return res.json() as Promise<ApiResponse<Order[]>>;
};

export const createOrder = async (orderData: OrderData) => {
    const { token } = useUserStore.getState();
    const res = await fetch(`${API_URL}/orders/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Order creation failed');
    }
    return res.json() as Promise<ApiResponse<Order>>;
};

export const forgotPassword = async (email: string) => {
    const res = await fetch(`${API_URL}/user/forgot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Request failed');
    }
    return res.json();
};

export const cancelOrder = async (orderId: string) => {
    const { token } = useUserStore.getState();
    const res = await fetch(`${API_URL}/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Cancellation failed');
    }
    return res.json();
};
