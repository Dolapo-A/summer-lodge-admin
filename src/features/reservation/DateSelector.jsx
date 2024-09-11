/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
	differenceInDays,
	isPast,
	isSameDay,
	isWithinInterval,
	startOfDay,
} from "date-fns";
import Button from "../../ui/Button";
import { useReservation } from "./ReservationContext";
import { formatCurrency } from "../../utils/helpers";

const StyledDateSelector = styled.div`
	display: flex;
	flex-direction: column;
`;

const StyledDayPicker = styled(DayPicker)`
	padding: 1.5rem 2.5rem;
	border: 2px solid var(--color-grey-200);
	border-top-right-radius: 7px;
	border-top-left-radius: 7px;
`;

const PriceBar = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 2rem;
	background-color: var(--color-brand-700);
	border-top: none;

	border-bottom-right-radius: 7px;
	border-bottom-left-radius: 7px;
	/* background-color: var(--color-grey-0); */
	color: var(--color-brand-50);
	height: 60px;
`;

const PriceInfo = styled.div`
	display: flex;
	align-items: baseline;
	gap: 1.5rem;

	h3 {
		font-size: 2rem;
	}

	h4 {
		font-size: 1.2rem;
		font-weight: 100;
		text-decoration: line-through;
		color: #9ca3af;
	}

	h2 {
		font-size: 1.6rem;
		font-weight: 100;
		align-self: baseline;
	}

	p {
		font-size: 1.2rem;
	}
`;

const Price = styled.p`
	display: flex;
	gap: 0.5rem;
	align-items: baseline;
`;

const NightsMultiplier = styled.p`
	padding: 0.5rem 0.75rem;
	background-color: var(--color-brand-500);
	font-size: 1.5rem;
`;

// Styles for components of DayPicker Calender
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

const { navButtonNext, navButtonPrev } = {
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

function isAlreadyBooked(range, datesArr) {
	return (
		range?.from &&
		range?.to &&
		datesArr.some((date) =>
			isWithinInterval(date, { start: range.from, end: range.to })
		)
	);
}

function DateSelector({ settings, room, bookedDates }) {
	const { minBookingLength, maxBookingLength } = settings;

	const { range, setRange, resetRange } = useReservation();

	const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

	const { regularPrice, discount } = room;
	const numNights =
		range?.from && range?.to
			? Math.max(1, differenceInDays(displayRange.to, displayRange.from))
			: 1;
	const cabinPrice = numNights * (regularPrice - discount);

	const isDisabledDate = (curDate) => {
		const today = startOfDay(new Date());
		return (
			(isPast(curDate) && !isSameDay(curDate, today)) ||
			bookedDates.some((date) => isSameDay(date, curDate))
		);
	};

	console.log(numNights);
	return (
		<StyledDateSelector>
			<StyledDayPicker
				mode="range"
				onSelect={setRange}
				selected={displayRange}
				min={minBookingLength + 1}
				max={maxBookingLength}
				fromMonth={new Date()}
				fromDate={new Date()}
				toYear={new Date().getFullYear() + 5}
				captionLayout="dropdown"
				numberOfMonths={2}
				disabled={isDisabledDate}
				// hideNavigation
				styles={{
					month_caption: monthCaptionStyle,
					day: dayNumberStyle,
					day_button: dayButton,
					selected: selectedDay,
					button_next: navButtonNext,
					button_previous: navButtonPrev,
					range_start: dayButton,
					range_middle: rangeMiddle,
					chevron: navChevron,
				}}
			/>

			<PriceBar>
				<PriceInfo>
					<Price>
						{discount > 0 ? (
							<>
								<h2>{formatCurrency(regularPrice - discount)}</h2>
								<h4>{formatCurrency(regularPrice)}</h4>
							</>
						) : (
							<h2>{formatCurrency(regularPrice)}</h2>
						)}
						<span>/night</span>
					</Price>
					{numNights > 1 ? (
						<>
							<NightsMultiplier>
								<span>&times;</span> <span>{numNights}</span>
							</NightsMultiplier>
							<h2>
								<span>
									<span>Total</span> <span>{formatCurrency(cabinPrice)}</span>
								</span>
							</h2>
						</>
					) : null}
				</PriceInfo>

				{(range?.from || range?.to) && (
					<Button
						style={{
							color: "#18212f",
							backgroundColor: "var(--color-brand-50)",
						}}
						onClick={resetRange}
					>
						Clear
					</Button>
				)}
			</PriceBar>
		</StyledDateSelector>
	);
}

export default DateSelector;
