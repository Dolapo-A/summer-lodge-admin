/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import styled from "styled-components";
import { useBooking } from "./useBooking";
import { format, isWithinInterval } from "date-fns";
import Spinner from "../../ui/Spinner";
import { useAllBookings } from "./useAllBookings";
import BookingDetailsPanel from "./BookingDetailsPanel";
import Row from "../../ui/Row";
import DateRangeReportModal from "./DateRangeReport";
import Button from "../../ui/Button";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";

const CalendarContainer = styled.div`
	grid-column: 1/-3;
	display: grid;
	grid-template-columns: 1fr 1fr;
	justify-content: center;
	align-items: center;
	padding: 1.2rem 1.6rem;
	gap: 1.6rem;
	border: 2px solid var(--color-grey-100);
	background-color: var(--color-grey-0);
	/* padding: 2rem 2rem; */
	border-radius: 7px;
`;

const StyledDayPicker = styled(DayPicker)`
	border-radius: 7px;
	display: flex;
	justify-content: center;
`;

const GenerateReportButton = styled.button`
	background-color: var(--color-brand-600);
	color: white;
	border: none;
	padding: 0.8rem 1.2rem;
	border-radius: 4px;
	cursor: pointer;
	font-weight: bold;

	&:hover {
		background-color: var(--color-brand-700);
	}

	&:disabled {
		background-color: var(--color-grey-400);
		cursor: not-allowed;
	}
`;

// Styles as provided
const monthCaptionStyle = {
	paddingBottom: "0.5em",
};
const dayNumberStyle = {
	fontSize: "1.4rem",
};
const selectedDay = {
	padding: "2rem",
};
const navChevron = {
	fill: "red",
};
const navButtonStyle = {
	border: "2px solid red",
	padding: "10rem",
	borderRadius: "5px",
	cursor: "pointer",
};
const dayButton = {
	padding: "1.5rem",
};
const rangeMiddle = {
	backgroundColor: "green !important",
	padding: "1.5rem",
};

function BookingCalendar() {
	const { bookings, isLoading, error } = useAllBookings();
	const [selectedDate, setSelectedDate] = useState(null);
	const [dateRange, setDateRange] = useState({ from: null, to: null });
	const [isReportModalOpen, setIsReportModalOpen] = useState(false);

	const bookingsByDate = bookings
		? bookings.reduce((acc, booking) => {
				const { startDate, endDate, rooms, guests } = booking;
				const start = new Date(startDate);
				const end = new Date(endDate);

				for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
					const formattedDate = format(date, "yyyy-MM-dd");
					if (!acc[formattedDate]) acc[formattedDate] = [];
					acc[formattedDate].push({
						room: rooms.name,
						guest: guests.fullName,
						numNights: booking.numNights,
						status: booking.status,
					});
				}

				return acc;
		  }, {})
		: {};

	const handleDaySelect = (day) => {
		setSelectedDate(day);
	};

	const handleRangeSelect = (range) => {
		setDateRange(range || { from: null, to: null });
	};

	const generateReport = () => {
		if (dateRange.from && dateRange.to) {
			setIsReportModalOpen(true);
		}
	};

	if (isLoading) return <Spinner />;

	if (error) {
		return <div>Error loading bookings: {error.message}</div>;
	}

	if (!bookings || bookings.length === 0) {
		return <div>No bookings available</div>;
	}

	const selectedBookings = selectedDate
		? bookingsByDate[format(selectedDate, "yyyy-MM-dd")] || []
		: [];

	const reportBookings =
		dateRange.from && dateRange.to
			? bookings.filter((booking) =>
					isWithinInterval(new Date(booking.startDate), {
						start: dateRange.from,
						end: dateRange.to,
					})
			  )
			: [];

	return (
		<CalendarContainer>
			<StyledDayPicker
				mode="range"
				onDayClick={handleDaySelect}
				// selected={selectedDate}
				selected={dateRange}
				onSelect={handleRangeSelect}
				modifiers={{
					booked: (date) =>
						bookingsByDate[format(date, "yyyy-MM-dd")]?.length > 0,
				}}
				modifiersStyles={{
					booked: { backgroundColor: "var(--color-blue-100)" },
				}}
				styles={{
					month_caption: monthCaptionStyle,
					day: dayNumberStyle,
					day_button: dayButton,
					selected: selectedDay,
					button_next: navButtonStyle,
					button_previous: navButtonStyle,
					range_start: dayButton,
					range_middle: rangeMiddle,
					chevron: navChevron,
				}}
			/>
			<BookingDetailsPanel
				selectedDate={selectedDate}
				bookings={selectedBookings}
			/>
			<Menus>
				<Modal>
					<Modal.Open opens="reserve">
						<Button disabled={!dateRange.from || !dateRange.to}>
							Generate Report
						</Button>
					</Modal.Open>
					<Modal.Window name="reserve">
						<DateRangeReportModal
							startDate={dateRange.from}
							endDate={dateRange.to}
							bookings={reportBookings}
						/>
					</Modal.Window>
				</Modal>
			</Menus>
		</CalendarContainer>
	);
}

export default BookingCalendar;
