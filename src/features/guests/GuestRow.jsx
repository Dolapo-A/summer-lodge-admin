/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateGuestForm from "./CreateGuestForm";
import { useDeleteGuest } from "./useDeleteGuest";
import {
	HiCalendarDays,
	HiPencil,
	HiSquare2Stack,
	HiTrash,
} from "react-icons/hi2";
import { useCreateGuest } from "./useCreateGuest";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useNavigate } from "react-router-dom";
// const TableRow = styled.div`
// 	display: grid;
// 	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
// 	column-gap: 2.4rem;
// 	align-items: center;
// 	padding: 1.4rem 2.4rem;

// 	&:not(:last-child) {
// 		border-bottom: 1px solid var(--color-grey-100);
// 	}
// `;

const Name = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Country = styled.div`
	font-family: "Sono";
	font-weight: 600;
`;

const Nathionalid = styled.div`
	font-family: "Sono";
	font-weight: 500;
	color: var(--color-green-700);
`;

const StyledListReservation = styled.ul`
	background-color: var(--color-grey-0);
`;

function GuestRow({ guest }) {
	const { isDeleting, deleteGuest } = useDeleteGuest();

	const navigate = useNavigate();

	const {
		id: guestId,
		fullName,
		email,
		phoneNumber,
		nationality,
		nationalID,
		gender
	} = guest;

	return (
		<Table.Row>
			<Name>{fullName}</Name>
			<div>{email}</div>
			<div>{phoneNumber}</div>
			<Nathionalid>{gender}</Nathionalid>
			<Country>{nationality}</Country>
			<Nathionalid>{nationalID}</Nathionalid>
			<div>
				<Modal>
					<Menus.Menu>
						<Menus.Toggle id={guestId} />

						<Menus.List id={guestId}>
							<Menus.Button
								icon={<HiCalendarDays />}
								onClick={() => navigate(`/reservations/${guestId}`)}
							>
								Reservation
							</Menus.Button>

							<Modal.Open opens="edit">
								<Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
							</Modal.Open>

							<Modal.Open opens="delete">
								<Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
							</Modal.Open>
						</Menus.List>

						<Modal.Window name="edit">
							<CreateGuestForm cabinToEdit={guest} />
						</Modal.Window>

						<Modal.Window name="delete">
							<ConfirmDelete
								resourceName="cabin"
								disabled={isDeleting}
								onConfirm={() => deleteGuest(guestId)}
							/>
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</div>
		</Table.Row>
	);
}

export default GuestRow;
