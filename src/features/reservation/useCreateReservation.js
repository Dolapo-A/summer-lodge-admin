import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBooking as apicreateBooking } from "../../services/apiBookings";

export function useCreateBooking() {
	const queryClient = useQueryClient();

	const { mutate: createBooking, isLoading: isCreating } = useMutation({
		mutationFn: apicreateBooking,
		onSuccess: () => {
			toast.success("Room booked successfully ");
			queryClient.invalidateQueries({ queryKey: ["rooms"] });
			// reset();
		},
		onError: (err) => toast.error(err.message),
    });
    
    return {createBooking, isCreating}
}
