import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteGuest as deleteGuestApi} from "../../services/apiGuests";

export function useDeleteGuest() {
    
const queryClient = useQueryClient();

const { isLoading: isDeleting, mutate: deleteGuest } = useMutation({
    mutationFn: deleteGuestApi,
    onSuccess: () => {
        toast.success("Guest deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (err) => toast.error(err.message),
});

    return {isDeleting, deleteGuest}
}
