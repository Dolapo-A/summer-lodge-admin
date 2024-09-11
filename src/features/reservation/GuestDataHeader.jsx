/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useGuests } from "../guests/useGuests";
import Heading from "../../ui/Heading";
import { useParams } from "react-router-dom";
import { useMoveBack } from "../../hooks/useMoveBack";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function GuestDataHeader({ guest }) {
	const { fullName } = guest;

	return (
		<>
			<HeadingGroup>
				<Heading as="h1">Make reservation for {fullName}</Heading>
			</HeadingGroup>
		</>
	);
}

export default GuestDataHeader;
