/* eslint-disable no-unused-vars */
import { eachDayOfInterval } from "date-fns";
import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function createBooking(bookingData) {
	// const newBooking = {
	// 	...bookingData,
	// 	guestId: guestId,
	// 	numGuests: Number(formData.get("numGuests")),
	// 	observations: formData.get("observations").slice(0, 1000),
	// 	extrasPrice: 0,
	// 	totalPrice: bookingData.roomPrice,
	// 	isPaid: false,
	// 	hasBreakfast: false,
	// 	status: "unconfirmed",
	// };

	const { data, error } = await supabase.from("bookings").insert([bookingData]);

	if (error) throw new Error("Booking could not be created");

	return data;
}

export async function getBookings({ filter, sortBy, page }) {
	let query = supabase
		.from("bookings")
		.select(
			"id, created_at,startDate,endDate,numNights,numGuests,status,totalPrice, rooms(name), guests(fullName,email,phoneNumber)",
			{ count: "exact" }
		);

	// FILTER
	if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

	// SORT
	if (sortBy)
		query = query.order(sortBy.field, {
			ascending: sortBy.direction === "asc",
		});

	if (page) {
		const from = (page - 1) * PAGE_SIZE;
		const to = from + PAGE_SIZE - 1;
		query = query.range(from, to);
	}

	const { data, error, count } = await query;

	if (error) {
		console.error(error);
		throw new Error("Could not load bookings");
	}

	return { data, count };
}

export async function getBooking(id) {
	const { data, error } = await supabase
		.from("bookings")
		.select("*, rooms(*), guests(*)")
		.eq("id", id)
		.single();

	if (error) {
		console.error(error);
		throw new Error("Booking not found");
	}

	return data;
}

export async function getAllBookings() {
    const { data, error } = await supabase
        .from("bookings")
        .select("*, rooms(*), guests(*)")
        .order('startDate', { ascending: true });

    if (error) {
        console.error(error);
        throw new Error("Could not fetch bookings");
    }

    return data;
}

// New
export async function getBookedDatesByRoomId(roomId) {
	let today = new Date();
	today.setUTCHours(0, 0, 0, 0);
	today = today.toISOString();

	// Getting all bookings
	const { data, error } = await supabase
		.from("bookings")
		.select("*")
		.eq("roomId", roomId)
		.or(`startDate.gte.${today},and(status.eq.checked-in,endDate.gte.${today})`)
		.not("status", "eq", "checked-out");

	if (error) {
		console.error(error);
		throw new Error("Bookings could not be loaded");
	}

	// Converting to actual dates to be displayed in the date picker
	const bookedDates = data
		.map((booking) => {
			const start = new Date(booking.startDate);
			const end = new Date(booking.endDate);

			const effectiveStart = start < today ? today : start;
			return eachDayOfInterval({
				start: effectiveStart,
				end: end,
			});
		})
		.flat();

	return bookedDates;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date: ISO string
export async function getBookingsAfterDate(date) {
	const { data, error } = await supabase
		.from("bookings")
		.select("created_at, totalPrice, extrasPrice")
		.gte("created_at", date)
		.lte("created_at", getToday({ end: true }));

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}

	return data;
}

// Returns all STAYS that were created after the given date
export async function getStaysAfterDate(date) {
	const { data, error } = await supabase
		.from("bookings")
		// .select('*')
		.select("*, guests(fullName)")
		.gte("startDate", date)
		.lte("startDate", getToday());

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}

	return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
	const { data, error } = await supabase
		.from("bookings")
		.select("*, guests(fullName, nationality, countryFlag)")
		.or(
			`and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
		)
		.order("created_at");

	// Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
	// (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
	// (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}
	return data;
}

export async function updateBooking(id, obj) {
	const { data, error } = await supabase
		.from("bookings")
		.update(obj)
		.eq("id", id)
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error("Booking could not be updated");
	}
	return data;
}

export async function deleteBooking(id) {
	// REMEMBER RLS POLICIES
	const { data, error } = await supabase.from("bookings").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Booking could not be deleted");
	}
	return data;
}
