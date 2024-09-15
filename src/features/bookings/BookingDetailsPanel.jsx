/* eslint-disable react/prop-types */
import styled from "styled-components";
import { format } from "date-fns";

const PanelContainer = styled.div`
	padding: 1.5rem 2.5rem;
	background-color: var(--color-grey-50);
	border-radius: 7px;
	border: 2px solid var(--color-grey-100);

	width: 300px;
	height: 300px;
	overflow-y: scroll;
	/* background-color: var(--color-grey-100); */
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const BookingItem = styled.div`
	border-radius: 4px;
	background-color: var(--color-grey-100);
	padding: 0.8rem;
`;

const BookingDetailsPanel = ({ selectedDate, bookings }) => {
	if (!selectedDate || !bookings || bookings.length === 0) {
		return <PanelContainer>No bookings selected</PanelContainer>;
	}

	return (
		<PanelContainer>
			<h3>{format(selectedDate, "MMMM d, yyyy")}</h3>
			<p>Number of bookings: <strong> {bookings.length}</strong></p>
			{bookings.map((booking, index) => (
				<BookingItem key={index}>
					<p>
						<strong>Room:</strong> {booking.room}
					</p>
					<p>
						<strong>Guest:</strong> {booking.guest}
					</p>
					<p>
						<strong>Night(s):</strong> {booking.numNights}
					</p>
				</BookingItem>
			))}
		</PanelContainer>
	);
};

export default BookingDetailsPanel;
