/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useRooms } from "./useRooms";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

const TableHeader = styled.header`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;

	background-color: var(--color-grey-50);
	border-bottom: 1px solid var(--color-grey-100);
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: 600;
	color: var(--color-grey-600);
	padding: 1.6rem 2.4rem;
`;

function CabinTable() {
	const { isLoading, rooms } = useRooms();
	const [searchParams] = useSearchParams();


	if (isLoading) return <Spinner />;

	if(!rooms.length) return <Empty resourceName='bookings'/>


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
	const sortedCabins = filteredCabins.sort(
		(a, b) => (a[field] - b[field]) * modifier
	);

	return (
		<Menus>
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div></div>
					<div>Room</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>
				<Table.Body
					// data={rooms}
					// data={filteredCabins}
					data={sortedCabins}
					render={(room) => <CabinRow room={room} key={room.id} />}
				/>
			</Table>
		</Menus>
	);
}

export default CabinTable;
