/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledFormRow = styled.div`
	display: grid;
	align-items: center;
	grid-template-rows: 1fr 1.5fr;
	gap: 0.4rem;
	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

const Label = styled.label`
	font-weight: 500;
`;

const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);
`;

function FormColumn({label, error, children}) {
	return (
		<StyledFormRow>
			{label && <Label htmlFor={children.props.id}>{label}</Label>}
			{children}
			{error && <Error>{error}</Error>}
		</StyledFormRow>
	);
}

export default FormColumn;
