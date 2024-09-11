/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRoom } from "../../services/apiRooms";

export function useRoom(id) {
	const {
		isLoading,
		data: room,
		error,
	} = useQuery({
		queryKey: ["room", id],
		queryFn: () => getRoom(id),
		// staleTime: 30000,
		// enabled: !!id,
		retry: true,
	});

	return { isLoading, room, error };
}
