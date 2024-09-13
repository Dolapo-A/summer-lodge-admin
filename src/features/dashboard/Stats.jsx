/* eslint-disable no-unused-vars */

import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
	HiOutlineArrowDownOnSquare,
	HiOutlineBanknotes,
	HiOutlineBriefcase,
	HiOutlineChartBarSquare,
} from "react-icons/hi2";

/* eslint-disable react/prop-types */
function Stats({ bookings, confirmedStays, numDays, roomCount }) {
	// 1. NO OF BOOKINGS
	const numBookings = bookings.length;

	const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

	const checkedin = confirmedStays.length;

	const occupation = confirmedStays.reduce(
		(acc, cur) => acc + cur.numNights,
		0
	)/(numDays*roomCount)
	return (
		<>
			<Stat
				title="Bookings"
				color="blue"
				icon={<HiOutlineBriefcase />}
				value={numBookings}
			/>
			<Stat
				title="Sales"
				color="green"
				icon={<HiOutlineBanknotes />}
				value={formatCurrency(sales)}
			/>
			<Stat
				title="Check ins"
				color="indigo"
				icon={<HiOutlineArrowDownOnSquare />}
				value={checkedin}
			/>
			<Stat
				title="Occupancy rate"
				color="yellow"
				icon={<HiOutlineChartBarSquare />}
				value={Math.round(occupation*100) +'%'}
			/>
		</>
	);
}

export default Stats;
