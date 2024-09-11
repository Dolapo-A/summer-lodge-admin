/* eslint-disable no-unused-vars */

import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate, useParams } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useGuest } from "../guests/useGuest";
import GuestDataHeader from "./GuestDataHeader";
import RoomSelection from "./RoomSelection";
import { useRooms } from "../cabins/useRooms";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function ReservationDetail() {
	const { guest, isLoading: isLoadingGuest } = useGuest();
	const { rooms, isLoading: isLoadingRooms } = useRooms();
	const moveBack = useMoveBack();

	if (isLoadingGuest) return <Spinner />;

	if (!guest) {
		return <div>Guest not found.</div>;
	}

	if (isLoadingRooms) return <Spinner />;

	return (
		<>
			<Row type="horizontal">
				<GuestDataHeader guest={guest} key={guest.id} />
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>
			<RoomSelection rooms={rooms} />
		</>
	);
}

export default ReservationDetail;
