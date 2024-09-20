/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { getBookings } from "../../services/apiBookings";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useRooms } from "../cabins/useRooms";
import BookingCalendar from "../bookings/BookingCalendar";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

function DashboardLayout() {
	const { bookings, isLoading: isLoading1 } = useRecentBookings();
	const {
		isLoading: isLoading2,
		confirmedStays,
		numDays,
	} = useRecentStays();
	const { rooms, isLoading: isLoading3 } = useRooms();

	if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

	console.log(bookings);

	return (
		<>
			<StyledDashboardLayout>
				<Stats
					bookings={bookings}
					confirmedStays={confirmedStays}
					numDays={numDays}
					roomCount={rooms.length}
				/>
				<TodayActivity/>
				<BookingCalendar />
				<DurationChart confirmedStays={confirmedStays} />
				<SalesChart bookings={bookings} numDays={numDays} />
			</StyledDashboardLayout>
		</>
	);
}

export default DashboardLayout;
