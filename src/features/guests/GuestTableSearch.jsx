/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";

const Styledinput = styled.input`
	border: 1px solid var(--color-grey-300);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-sm);
	padding: 1.2rem 1.6rem;
	box-shadow: var(--shadow-sm);
`;

function GuestTableSearch({ onSearch }) {
	const [searchQuery, setSearchQuery] = useState("");

	function handleSearch(event) {
		setSearchQuery(event.target.value);
		onSearch(event.target.value);
	}

	return (
		<>
			<Styledinput
				type="text"
				value={searchQuery}
				onChange={handleSearch}
				placeholder="Search guests..."
			/>
		</>
	);
}

export default GuestTableSearch;
