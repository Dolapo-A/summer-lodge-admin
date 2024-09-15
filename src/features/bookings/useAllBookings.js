import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";

export function useAllBookings() {
    const {
        isLoading,
        data: bookings,
        error,
    } = useQuery({
        queryKey: ["bookings"],
        queryFn: getAllBookings,
        retry: false
    });

    return { isLoading, error, bookings };
}