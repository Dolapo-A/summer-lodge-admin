import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditGuest } from "../../services/apiGuests";

export function useCreateGuest() {
	const queryClient = useQueryClient();

	const { mutate: createGuest, isLoading: isCreating } = useMutation({
		mutationFn: createEditGuest,
		onSuccess: () => {
			toast.success("New room successfully created");
			queryClient.invalidateQueries({ queryKey: ["rooms"] });
			// reset();
		},
		onError: (err) => toast.error(err.message),
    });
    
    return {createGuest, isCreating}
}
