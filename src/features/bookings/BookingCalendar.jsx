/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import styled from "styled-components";
import { format, isWithinInterval, differenceInDays } from "date-fns";
import Spinner from "../../ui/Spinner";
import { useAllBookings } from "./useAllBookings";
import BookingDetailsPanel from "./BookingDetailsPanel";
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
	border-radius: 7px;
`;

const StyledDayPicker = styled(DayPicker)`
	border-radius: 7px;
	display: flex;
	justify-content: center;
	width: 100%;
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
	// backgroundColor: "var(--color-silver-100)",
	// color: "black",
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

	const bookingsByDate = bookings
		? bookings.reduce((acc, booking) => {
				const { startDate, endDate, rooms, guests, bookedBy } = booking;
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

	const dateRangeCount =
		dateRange.from && dateRange.to
			? differenceInDays(dateRange.to, dateRange.from) + 1
			: 0;

	return (
		<CalendarContainer>
			<StyledDayPicker
				mode="range"
				onDayClick={handleDaySelect}
				selected={dateRange}
				onSelect={handleRangeSelect}
				modifiers={{
					booked: (date) =>
						bookingsByDate[format(date, "yyyy-MM-dd")]?.length > 0,
				}}
				modifiersStyles={{
					booked: { backgroundColor: "var(--color-silver-100)" },
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

			{/* clear button */}
			{dateRange.from && dateRange.to ? (
				<Button
					disabled={!dateRange.from || !dateRange.to}
					onClick={() => handleRangeSelect({ from: null, to: null })}
				>
					clear
				</Button>
			) : null}
			<Menus>
				<Modal>
					<Modal.Open opens="reserve">
						<Button
							disabled={!dateRange.from || !dateRange.to}
							style={{ gridColumn: "-2/-1" }}
						>
							{dateRangeCount === 0
								? "Select Date Range to generate report"
								: `Generate Report ${dateRangeCount} day(s)`}
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
