/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";

const Styledinput = styled.input`
	padding: 0.5rem 1.5rem;
	border: 1px solid var(--color-indigo-700);
	border-radius: 5px;
	color: var(--color-grey-900);
	background-color: var(--color-grey-100);
`;

function GuestTableOperations({ onSearch }) {
	const [searchQuery, setSearchQuery] = useState("");

	function handleSearch(event) {
		setSearchQuery(event.target.value);
		onSearch(event.target.value);
	}

	return (
		<Styledinput
			type="text"
			value={searchQuery}
			onChange={handleSearch}
			placeholder="Search guests..."
		/>
	);
}

export default GuestTableOperations;
