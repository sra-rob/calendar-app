import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { AppBar as MuiAppBar } from "@mui/material";
import { RowContainer } from "@/components/Elements";
import { useAuthContext } from "@/providers/AuthProvider";
import { Button } from "@/components/Elements";
import { useLogout } from "@/features/auth/api/logout";
import { Link } from "react-router-dom";
export const AppBar = () => {
	const { isLoggedIn } = useAuthContext();
	const logoutQuery = useLogout();
	const navigate = useNavigate();
	const handleAuthenticatedUser = () => {
		logoutQuery.mutate();
	}
	const handleUnauthenticatedUser = () => {
		navigate("auth/login");
	}
	return(
		<>
			<MuiAppBar
				css={
					css`
						background: var(--color-accent-400);
					`
				}
			>
				<RowContainer
					justifyContent="space-between"
					p="0.5rem"
				>
					<Link
						css={
							css`
								text-decoration: none;
								color: var(--color-white);
							`
						} 
						to="/"
					>
						<h1>Calendar Site</h1>
					</Link>
					<Button 
						text={isLoggedIn ? "Logout" : "Login"}
						buttonType="primary"
						onClick={isLoggedIn ? handleAuthenticatedUser : handleUnauthenticatedUser}
					/>
				</RowContainer>
			</MuiAppBar>
			<div 
				css={
					css`
						height:5rem; width: 100%;
					`
				}></div>
		</>
	);
}