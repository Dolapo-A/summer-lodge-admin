/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
		mutationFn: ({ bookingId, breakfast, laundry }) =>
			updateBooking(bookingId, {
				status: "checked-in",
				isPaid: true,
				...breakfast,
				...laundry,
			}),

		onSuccess: (data) => {
			toast.success(`Booking #${data.id} checked in successfully`),
				queryClient.invalidateQueries({ active: true }),
				navigate("/");
		},

		onError: () => toast.error("There was an error while checking in"),
	});

	return { checkin, isCheckingIn };
}
