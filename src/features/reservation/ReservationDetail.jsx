/* eslint-disable no-unused-vars */

import styled from "styled-components";

import Row from "../../ui/Row";

import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";

import { useGuest } from "../guests/useGuest";
import GuestDataHeader from "./GuestDataHeader";
import RoomSelection from "./RoomSelection";
import { useRooms } from "../cabins/useRooms";
import { useSettings } from "../settings/useSettings";
import { useSearchParams } from "react-router-dom";
import CabinTableOperations from "../cabins/CabinTableOperations";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function ReservationDetail() {
	const { guest, isLoading: isLoadingGuest } = useGuest();
	const { rooms, isLoading: isLoadingRooms } = useRooms();
	const { settings } = useSettings();
	const moveBack = useMoveBack();

	const [searchParams] = useSearchParams();

	// 1) FILTER
	const filterValue = searchParams.get("discount") || "all";

	let filteredCabins;
	if (filterValue === "all") filteredCabins = rooms;
	if (filterValue === "no-discount")
		filteredCabins = rooms.filter((cabin) => cabin.discount === 0);
	if (filterValue === "with-discount")
		filteredCabins = rooms.filter((cabin) => cabin.discount > 0);

	// 2) SORT
	const sortBy = searchParams.get("sortBy") || "startDate-asc";
	const [field, direction] = sortBy.split("-");
	const modifier = direction === "asc" ? 1 : -1;
	const sortedRooms = filteredCabins?.sort(
		(a, b) => (a[field] - b[field]) * modifier
	);

	if (isLoadingGuest) return <Spinner />;

	if (!guest) {
		return <div>Guest not found.</div>;
	}

	if (isLoadingRooms) return <Spinner />;

	return (
		<>
			<Row type="horizontal">
				<GuestDataHeader guest={guest} key={guest.id} />
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>
			<p>
				<CabinTableOperations />
			</p>
			<RoomSelection settings={settings} rooms={sortedRooms} />
		</>
	);
}

export default ReservationDetail;
