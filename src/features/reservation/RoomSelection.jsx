/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import RoomCard from "./RoomCard";

const FilterButtons = styled.div`
	display: flex;
	gap: 1rem;
	margin-bottom: 2rem;
`;

const RoomGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 2.5rem;
`;

function RoomSelection({ rooms }) {
	console.log("Rooms in RoomSelection:", rooms); // Add this line for debugging

	if (!rooms || rooms.length === 0) {
		return <div>No rooms available.</div>;
	}

	return (
		<RoomGrid>
			{rooms.map((room) => (
				<RoomCard room={room} key={room.id} />
			))}
		</RoomGrid>
	);
}

export default RoomSelection;
