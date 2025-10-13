
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const API_URL = 'https://hotel-booking-backend-1-e9n9.onrender.com/api/v1';

export function useRooms() {
  const { data, error, isLoading } = useSWR(`${API_URL}/rooms`, fetcher);
  return {
    rooms: data?.result || [],
    isLoading,
    isError: error,
  };
}

export function useNews() {
  const { data, error, isLoading } = useSWR(`${API_URL}/home/news/`, fetcher);
  return {
    news: data?.result || [],
    isLoading,
    isError: error,
  };
}

export function useCuisine() {
  const { data, error, isLoading } = useSWR(`${API_URL}/home/culinary/`, fetcher);
  return {
    cuisine: data?.result || [],
    isLoading,
    isError: error,
  };
}
