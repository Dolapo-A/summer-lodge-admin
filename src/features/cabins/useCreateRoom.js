import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditRoom } from "../../services/apiRooms";
import toast from "react-hot-toast";

export function useCreateRoom() {
	const queryClient = useQueryClient();

	const { mutate: createRoom, isLoading: isCreating } = useMutation({
		mutationFn: createEditRoom,
		onSuccess: () => {
			toast.success("New room successfully created");
			queryClient.invalidateQueries({ queryKey: ["rooms"] });
			// reset();
		},
		onError: (err) => toast.error(err.message),
    });
    
    return {createRoom, isCreating}
}
