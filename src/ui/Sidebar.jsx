/* eslint-disable no-unused-vars */
import styled from "styled-components";
// import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";

const StyledAside = styled.aside`
	background-color: var(--color-grey-0);
	padding: 4rem;
	border-right: 1px solid var(--color-grey-100);
	grid-row: 1/-1;
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
`;

const StyledLogo = styled.div`
	
`


function Sidebar() {
	return (
		<StyledAside>
			{/* <Logo /> */}
			<MainNav />

			{/* <Uploader /> */}
		</StyledAside>
	);
}

export default Sidebar;
