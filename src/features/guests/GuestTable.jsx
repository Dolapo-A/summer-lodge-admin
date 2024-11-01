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

const StyledFooter = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const TotalGuest = styled.span`
	margin-left: 0.5rem;
	font-weight: bold;
	font-size: 1.6rem;
`;

function GuestTable({ searchQuery }) {
	const { isLoading, guests } = useGuests();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;

	if (!guests.length) return <Empty resourceName="guests" />;

	// 1) FILTER
	const filterValue = searchParams.get("gender") || "all";

	// 2) SEARCH FILTER
	let filteredGuests = guests.filter((guest) =>
		guest.fullName.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// gender filter
	if (filterValue !== "all") {
		filteredGuests = filteredGuests.filter(
			(guest) => guest.gender === filterValue
		);
	}

	// 3) SORT
	const sortBy = searchParams.get("sortBy") || "name-asc";
	const [field, direction] = sortBy.split("-");
	const modifier = direction === "asc" ? 1 : -1;
	const sortedGuests = filteredGuests.sort((a, b) => {
		if (field === "name") {
			return a.fullName.localeCompare(b.fullName) * modifier;
		}
	});

	return (
		<Menus>
			<Table columns="1.8fr 1.8fr 1.8fr 1.5fr 1.5fr 1fr 0.4fr">
				<Table.Header>
					<div>name</div>
					<div>email</div>
					<div>phone number</div>
					<div>gender</div>
					<div>nationality</div>
					<div>national id</div>
					<div></div>
				</Table.Header>
				<Table.Body
					data={sortedGuests}
					render={(guest) => <GuestRow guest={guest} key={guest.id} />}
				/>
				<Table.Footer>
					<StyledFooter>
						<p>
							<TotalGuest>
								{sortedGuests.length} guest
								{sortedGuests.length > 1 ? "s" : ""}
							</TotalGuest>
						</p>
					</StyledFooter>
				</Table.Footer>
			</Table>
		</Menus>
	);
}

export default GuestTable;
