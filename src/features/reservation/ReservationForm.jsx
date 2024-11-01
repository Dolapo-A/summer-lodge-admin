/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import { useReservation } from "./ReservationContext";
import styled from "styled-components";
import Button from "../../ui/Button";
import { differenceInDays } from "date-fns";
import { useGuest } from "../guests/useGuest";
import { useCreateBooking } from "./useCreateReservation";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../bookings/useBooking";
import { useUser } from "../authentication/useUser";

const Container = styled.div`
	transform: scale(1);
`;

const Form = styled.form`
	background-color: var(--color-primary-900);
	padding: 1.5rem 2.5rem;
	font-size: 1.4rem;
	display: flex;
	gap: 1.25rem;
	flex-direction: column;
	border-radius: 7px;
`;

const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const Select = styled.select`
	font-size: 1.4rem;
	padding: 0.8rem 1.2rem;
	border: 1px solid
		${(props) =>
			props.type === "white"
				? "var(--color-grey-100)"
				: "var(--color-grey-300)"};
	border-radius: var(--border-radius-sm);
	background-color: var(--color-grey-0);
	font-weight: 500;
	box-shadow: var(--shadow-sm);
`;

const Option = styled.option`
	padding: 0.75rem 1.25rem;
	background-color: var(--color-grey-0);
	/* color: var(--color-primary-800); */
	width: 100%;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
	border-radius: 7px;
`;

const TextArea = styled.textarea`
	padding: 0.75rem 1.25rem;
	background-color: var(--color-grey-0);
	/* color: var(--color-primary-800); */
	width: 100%;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
	border-radius: 7px;
	resize: vertical;
`;

const FormFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 1.5rem;
`;

const DateSelectionMessage = styled.p`
	font-size: 1.2rem;
`;

function ReservationForm({ room }) {
	const { id, maxCapacity, regularPrice, discount } = room;
	const { guest } = useGuest();
	const { createBooking, isCreating } = useCreateBooking();
	const { range, resetRange } = useReservation();
	const { register, handleSubmit, reset } = useForm();
	const { id: guestId } = guest;
	const {
		user: {
			email,
			user_metadata: { fullName: currentStaffFullName },
		},
	} = useUser();

	const startDate = range?.from;
	const endDate = range?.to;
	const numNights = differenceInDays(endDate, startDate);
	const roomPrice = numNights * (regularPrice - discount);

	const navigate = useNavigate();

	function onSubmit(formData) {
		const bookingData = {
			guestId,
			startDate,
			endDate,
			numNights,
			roomPrice,
			roomId: id,
			numGuests: Number(formData.numGuests),
			observations: formData.observations,
			extrasPrice: 0,
			totalPrice: roomPrice,
			isPaid: false,
			hasBreakfast: false,
			status: "unconfirmed",
			bookedBy: currentStaffFullName,
		};

		createBooking(bookingData, {
			onSuccess: (data) => {
				console.log(data);
				resetRange();
				reset();
				navigate(`/bookings/`);
			},
		});
	}

	function onError(errors) {
		console.log(errors);
	}

	return (
		<Container>
			<Form onSubmit={handleSubmit(onSubmit, onError)}>
				<FormGroup>
					<label htmlFor="numGuests">How many guests?</label>
					<Select
						name="numGuests"
						id="numGuests"
						{...register("numGuests", { required: "This field is required" })}
						required
					>
						<Option value="" key="">
							Select number of guests...
						</Option>
						{Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
							<Option value={x} key={x}>
								{x} {x === 1 ? "guest" : "guests"}
							</Option>
						))}
					</Select>
				</FormGroup>

				<FormGroup>
					<label htmlFor="observations">
						Anything we should know about your stay?
					</label>
					<TextArea
						name="observations"
						id="observations"
						placeholder="Any pets, allergies, special requirements, etc.?"
						{...register("observations")}
					/>
				</FormGroup>

				<FormFooter>
					{!(startDate && endDate) ? (
						<DateSelectionMessage>
							Start by selecting dates
						</DateSelectionMessage>
					) : (
						<Button disabled={isCreating}>Reserve now</Button>
					)}
				</FormFooter>
			</Form>
		</Container>
	);
}

export default ReservationForm;
