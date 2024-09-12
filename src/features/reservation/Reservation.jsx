/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useBookedDates } from "./useBookedDates";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { ReservationProvider } from "./ReservationContext";
import styled from "styled-components";

const Column = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	border-radius: 7px;
	border: 2px solid var(--color-grey-200);
`;

function Reservation({ room, settings }) {
	const { id: roomId, name } = room;
	const { bookedDates: alreadyBookedDates, isLoading } = useBookedDates(roomId);

	return (
		<ReservationProvider>
			<p>Room {name}</p>
			<Column>
				<DateSelector
					settings={settings}
					bookedDates={alreadyBookedDates}
					room={room}
				/>
				<ReservationForm room={room} />
			</Column>
		</ReservationProvider>
	);
}

export default Reservation;
