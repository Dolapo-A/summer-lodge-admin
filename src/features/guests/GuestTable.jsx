/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import { useGuests } from "./useGuests";
import GuestRow from "./GuestRow";

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

function GuestTable({ searchQuery }) {
	const { isLoading, guests } = useGuests();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;

	if (!guests.length) return <Empty resourceName="bookings" />;

	// 3) SEARCH FILTER
	const filteredGuests = guests.filter((guest) =>
		guest.fullName.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// 1) FILTER
	const filterValue = searchParams.get("discount") || "all";

	let filteredCabins;
	if (filterValue === "all") filteredCabins = guests;
	if (filterValue === "no-discount")
		filteredCabins = guests.filter((cabin) => cabin.discount === 0);
	if (filterValue === "with-discount")
		filteredCabins = guests.filter((cabin) => cabin.discount > 0);

	// 2) SORT
	const sortBy = searchParams.get("sortBy") || "startDate-asc";
	const [field, direction] = sortBy.split("-");
	const modifier = direction === "asc" ? 1 : -1;
	const sortedCabins = filteredCabins.sort(
		(a, b) => (a[field] - b[field]) * modifier
	);

	return (
		<Menus>
			<Table columns="2fr 1.8fr 1.8fr 1fr 1fr 1fr">
				<Table.Header>
					<div>Name</div>
					<div>email</div>
					<div>phone number</div>
					<div>nationality</div>
					<div>National ID</div>
					<div></div>
				</Table.Header>
				<Table.Body
					// data={guests}
					// data={filteredCabins}
					data={filteredGuests}
					render={(guest) => <GuestRow guest={guest} key={guest.id} />}
				/>
			</Table>
		</Menus>
	);
}

export default GuestTable;
