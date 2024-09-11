/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiCalendarDays, HiPencil, HiTrash } from "react-icons/hi2";
import CreateGuestForm from "../guests/CreateGuestForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import ReservationForm from "./ReservationForm";
import Reservation from "./Reservation";
import { useRoom } from "../cabins/useRoom";
import Spinner from "../../ui/Spinner";

const StyledRoomCard = styled.div`
	background-color: var(--color-grey-0);
	border: 2px solid var(--color-grey-200);
	border-radius: 7px;
	display: flex;
	overflow: hidden;

	img {
		height: 200px;
		width: 150px;
		object-fit: cover;
	}

	div {
		display: flex;
		flex-direction: column;
	}

	p {
		font-size: 1.6rem;
	}
`;

const CardContent = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`;

const CardFooter = styled.div`
	border-top: 2px solid var(--color-grey-200);
	padding: 1.2rem;
`;

const RoomInfo = styled.div`
	padding: 1.2rem 1.2rem 0 1.2rem;
	h3 {
		font-size: 2rem;
		margin-bottom: 1.2rem;
	}

	h4{
		font-size: 1.6rem;
		margin-bottom: 1rem;
		font-weight: 100;
		text-decoration: line-through;
		color: var(--color-grey-500);
	}

	p {
		font-size: 1.6rem;
		margin-bottom: 1rem;
	}
`;



const PriceInfo = styled.div`
	align-items: baseline;
	gap: 0.5rem;
	display: flex;
	justify-content: end;

	h2 {
		font-size: 2.4rem;
		font-weight: 100;
	}

	span {
		display: flex;
		gap: 0.5rem;
		align-items: baseline;
	}
`;

function RoomCard({ room: initialRoomData }) {
	const {
		id: roomId,
		name,
		maxCapacity,
		regularPrice,
		discount,
		description,
		image,
	} = initialRoomData;
	return (
		<StyledRoomCard>
			<img src={image} alt={name} />
			<CardContent>
				<RoomInfo>
					<h3>Room {name}</h3>
					{/* <p>Room Id {roomId}</p> */}
					<p>For up to {maxCapacity} guests</p>
					<PriceInfo>
						<span>
							{discount > 0 ? (
								<>
									<h2>{formatCurrency(regularPrice-discount)} </h2>
									<h4>{formatCurrency(regularPrice)}</h4>
								</>
							) : (
								<h2>{formatCurrency(regularPrice)}</h2>
							)}
							<p> / night</p>
						</span>
					</PriceInfo>
				</RoomInfo>
				<CardFooter>
					<Menus>
						<Modal>
							<Modal.Open opens="reserve">
								<Button>Reservation</Button>
							</Modal.Open>
							<Modal.Window name="reserve">
								<ReservationContent roomId={roomId} key={roomId} />
							</Modal.Window>
						</Modal>
					</Menus>
				</CardFooter>
			</CardContent>
		</StyledRoomCard>
	);
}

function ReservationContent({ roomId }) {
	const { isLoading, room, error } = useRoom(roomId);

	if (isLoading) return <Spinner />;
	if (error) return <div>Error: {error.message}</div>;
	if (!room) return <div>No room data available.</div>;

	return <Reservation room={room} />;
}

export default RoomCard;
