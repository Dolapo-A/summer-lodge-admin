/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getRoom, getRooms } from "../../services/apiRooms";
import { useParams } from "react-router-dom";

export function useRooms() {
	const {
		isLoading,
		data: rooms,
		error,
	} = useQuery({
		queryKey: ["rooms"],
		queryFn: getRooms,
	});

	return { isLoading, rooms };
}