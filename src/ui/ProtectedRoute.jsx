/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

function ProtectedRoute({ children }) {
	const navigate = useNavigate();
	// 1. Load the authenticated user
	const { isAuthenticted, isLoading } = useUser();

	// 2. If the user is not authenticated, redirect the user to the login page
	useEffect(
		function () {
			if (!isAuthenticted && !isLoading) navigate("/login");
		},
		[isAuthenticted, isLoading, navigate]
	);

	// 3. While loading, show a loading spinner
	if (isLoading)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	// 4. If the user is authenticated, render the app

	if (isAuthenticted) return children;
}

export default ProtectedRoute;
