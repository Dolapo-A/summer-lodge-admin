/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

function CheckinBooking() {
	const [confirmPaid, setConfirmPaid] = useState(false);
	const [addBreakfast, setAddBreakfast] = useState(false);
	const [addLaundry, setAddLaundry] = useState(false);
	const { booking, isLoading } = useBooking();
	const { settings, isLoading: isLoadingSettings } = useSettings();

	useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

	const moveBack = useMoveBack();
	const { checkin, isCheckingIn } = useCheckin();

	if (isLoading || isLoadingSettings) return <Spinner />;

	const {
		id: bookingId,
		guests,
		totalPrice,
		numGuests,
		hasBreakfast,
		hasLaundry,
		numNights,
	} = booking;

	const optionalBreakfastPrice =
		settings.breakfastPrice * numNights * numGuests;
	const optionalLaundryPrice = settings.laundryPrice;

	function handleCheckin() {
		if (!confirmPaid) return;

		const breakfastData = addBreakfast
			? {
					hasBreakfast: true,
					extrasPrice: optionalBreakfastPrice,
					totalPrice: totalPrice + optionalBreakfastPrice,
			  }
			: {};

		const laundryData = addLaundry
			? {
					hasLaundry: true,
					extrasPrice: (breakfastData.extrasPrice || 0) + optionalLaundryPrice,
					totalPrice:
						(breakfastData.totalPrice || totalPrice) + optionalLaundryPrice,
			  }
			: {};

		checkin({
			bookingId,
			breakfast: breakfastData,
			laundry: laundryData,
		});

		console.log(addLaundry);
	}

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			{!hasBreakfast && (
				<Box>
					<Checkbox
						checked={addBreakfast}
						onChange={() => {
							setAddBreakfast((add) => !add);
							setConfirmPaid(false);
						}}
						id="Breakfast"
					>
						Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
					</Checkbox>
				</Box>
			)}

			{!hasLaundry && (
				<Box>
					<Checkbox
						checked={addLaundry}
						onChange={() => {
							setAddLaundry((add) => !add);
							setConfirmPaid(false);
						}}
						id="Laundry"
					>
						Want to add Laundry for {formatCurrency(optionalLaundryPrice)}?
					</Checkbox>
				</Box>
			)}

			<Box>
				<Checkbox
					checked={confirmPaid}
					onChange={() => setConfirmPaid((confirm) => !confirm)}
					disabled={confirmPaid || isCheckingIn}
					id="comfirm"
				>
					I confirm that {guests.fullName} has paid the total amount of{" "}
					{(() => {
						const basePrice = totalPrice;
						const breakfastPrice = addBreakfast ? optionalBreakfastPrice : 0;
						const laundryPrice = addLaundry ? optionalLaundryPrice : 0;
						const totalWithExtras = basePrice + breakfastPrice + laundryPrice;

						if (!addBreakfast && !addLaundry) {
							return formatCurrency(basePrice);
						}

						const parts = [formatCurrency(basePrice)];
						if (addBreakfast) parts.push(formatCurrency(breakfastPrice));
						if (addLaundry) parts.push(formatCurrency(laundryPrice));

						return `${formatCurrency(totalWithExtras)} (${parts.join(" + ")})`;
					})()}
					.
				</Checkbox>
			</Box>

			<ButtonGroup>
				<Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
					Check in booking #{bookingId}
				</Button>
				<Button variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default CheckinBooking;
