import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteRoom as deleteRoomApi} from "../../services/apiRooms";

export function useDeleteCabin() {
    
const queryClient = useQueryClient();

const { isLoading: isDeleting, mutate: deleteRoom } = useMutation({
    mutationFn: deleteRoomApi,
    onSuccess: () => {
        toast.success("Room deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (err) => toast.error(err.message),
});

    return {isDeleting, deleteRoom}
}
