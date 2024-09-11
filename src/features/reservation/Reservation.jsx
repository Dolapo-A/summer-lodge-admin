/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getBookedDatesByRoomId } from "../../services/apiBookings";
import { getSettings } from "../../services/apiSettings";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import Spinner from "../../ui/Spinner";
import { ReservationProvider } from "./ReservationContext";
import { useSettings } from "../settings/useSettings";

function Reservation({ room }) {
	const {
		id: roomId,
		name,
		maxCapacity,
		regularPrice,
		discount,
		description,
		image,
	} = room;
	const { settings, isLoading: isLoadingSettings, error } = useSettings();
	const [bookedDates, setBookedDates] = useState([]);
	const [isLoadingBookedDates, setIsLoadingBookedDates] = useState(true);

	useEffect(() => {
		async function fetchData() {
			if (room && room.id) {
				try {
					const bookedDatesData = await getBookedDatesByRoomId(room.id);
					setBookedDates(bookedDatesData);
				} catch (error) {
					console.error("Error fetching reservation data:", error);
				} finally {
					setIsLoadingBookedDates(false);
				}
			}
		}
		fetchData();
	}, [room]);

	if (isLoadingSettings || isLoadingBookedDates) {
		return <Spinner />;
	}

	// Ensure settings is defined before rendering
	if (!settings) {
		return <p>Unable to load settings data.</p>;
	}

	return (
		<ReservationProvider>
			<p>Room {name}</p>
			<DateSelector settings={settings} bookedDates={bookedDates} room={room} />
			<ReservationForm />
		</ReservationProvider>
	);
}

export default Reservation;
