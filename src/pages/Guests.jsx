/* eslint-disable no-unused-vars */
import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import AddCabin from "../features/cabins/AddCabin";
import GuestTableOperations from "../features/guests/GuestTableOperations";
import GuestTable from "../features/guests/GuestTable";
import AddGuest from "../features/guests/AddGuest";

function Guests() {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All guests</Heading>
				<GuestTableOperations onSearch={setSearchQuery} />
			</Row>

			<Row>
				<GuestTable searchQuery={searchQuery} />
				<AddGuest />
			</Row>
		</>
	);
}

export default Guests;
