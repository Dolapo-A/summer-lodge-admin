/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled, { createGlobalStyle, css } from "styled-components";
import { format } from "date-fns";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";

const GlobalPrintStyles = createGlobalStyle`
  @media print {
    body * {
      visibility: hidden;
    }
    .print-content, .print-content * {
      visibility: visible;
    }
    .print-content {
      width: 100%;
    }
  }
`;

const PrintContent = styled.div`
	@media print {
		width: 100%;
		background-color: white;
		color: #000;
	}
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.5rem 0 1rem 0;

	@media print {
		flex-direction: column;
		align-items: flex-start;
	}
`;

const TotalRevenue = styled.span`
	margin-left: 0.5rem;
	font-weight: bold;
	font-size: 1.6rem;
`;

const StyledFooter = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const PrintHiddenButton = styled.div`
	@media print {
		display: none;
	}
`;

const DateRangeReportModal = ({ startDate, endDate, bookings }) => {
	const handlePrint = () => {
		window.print();
	};
	const downloadReport = () => {
		window.download();
	};

	const totalRevenue = bookings.reduce(
		(sum, booking) => sum + booking.totalPrice,
		0
	);

	return (
		<>
			<GlobalPrintStyles />
			<PrintContent className="print-content">
				<Header>
					<Heading as="h2">
						Activities from {format(startDate, "MMMM dd, yyyy")} to{" "}
						{format(endDate, "MMMM dd, yyyy")}
					</Heading>
					<PrintHiddenButton>
						<Button onClick={handlePrint}>
							<span>🖨️</span> Print
						</Button>
					</PrintHiddenButton>
				</Header>

				<Menus>
					<Table columns="1fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr">
						<Table.Header>
							<div>Date Created</div>
							<div>Duration</div>
							<div>Guest</div>
							<div>Room</div>
							<div>Nights</div>
							<div>Guests</div>
							<div>Status</div>
							<div>Room Price (GHC)</div>
							<div>Extras (GHC)</div>
							<div>Total Price (GHC)</div>
							<div>Break fast</div>
							<div>Laundry</div>
						</Table.Header>
						<Table.Body
							data={bookings}
							render={(booking) => (
								<Table.Row key={booking.id}>
									<div>
										{format(new Date(booking.created_at), "MMM dd, yyyy")}
									</div>
									<div>
										{format(new Date(booking.startDate), "MMM dd, yyyy")}{" "}
										&mdash; {format(new Date(booking.endDate), "MMM dd, yyyy")}
									</div>
									<div>{booking.guests.fullName}</div>
									<div>{booking.rooms.name}</div>
									<div>{booking.numNights}</div>
									<div>{booking.numGuests}</div>
									<div>{booking.status}</div>
									<div>{booking.roomPrice}</div>
									<div>{booking.extrasPrice}</div>
									<div>{booking.totalPrice}</div>
									<div>{booking.hasBreakfast ? "Yes" : "No"}</div>
									<div>{booking.hasLaundry ? "Yes" : "No"}</div>
								</Table.Row>
							)}
						/>
						<Table.Footer>
							<StyledFooter>
								<p>
									Total Revenue from {format(startDate, "MMM dd, yyyy")} to{" "}
									{format(endDate, "MMM dd, yyyy")}:{" "}
									<TotalRevenue>{formatCurrency(totalRevenue)}</TotalRevenue>
								</p>
								<div>
									<p>
										Total Bookings:{" "}
										<TotalRevenue>{bookings.length}</TotalRevenue>
									</p>
								</div>
							</StyledFooter>
						</Table.Footer>
					</Table>
				</Menus>
			</PrintContent>
		</>
	);
};

export default DateRangeReportModal;
