/* eslint-disable no-unused-vars */
import { useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import GuestTableSearch from "../features/guests/GuestTableSearch";
import GuestTable from "../features/guests/GuestTable";
import AddGuest from "../features/guests/AddGuest";
import GuestTableOperations from "../features/guests/GuestTableOperations";

function Guests() {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All guests</Heading>
				<GuestTableSearch onSearch={setSearchQuery} />
			</Row>

			<Row type="vertical">
				<Row type="horizontal">
					<AddGuest />
					<GuestTableOperations />
				</Row>
				<GuestTable searchQuery={searchQuery} />
			</Row>
		</>
	);
}

export default Guests;
