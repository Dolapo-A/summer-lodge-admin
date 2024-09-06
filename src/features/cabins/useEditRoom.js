import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditRoom } from "../../services/apiRooms";

export function useEditRoom() {
	const queryClient = useQueryClient();

	const { mutate: editRoom, isLoading: isEditing } = useMutation({
		mutationFn: ({ newRoomData, id }) => createEditRoom(newRoomData, id),

		onSuccess: () => {
			toast.success("Room successfully edited");
			queryClient.invalidateQueries({ queryKey: ["rooms"] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { editRoom, isEditing };
}
