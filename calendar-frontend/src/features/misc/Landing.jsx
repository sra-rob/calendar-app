import { useNavigate } from "react-router-dom";
import { Box, Paper } from "@mui/material";
import { css } from "@emotion/react";
import { RowContainer } from "@/components/Elements";
import { Button } from "@/components/Elements";
import { Link } from "@/components/Elements/Button";
import { useAuthContext } from "@/providers/AuthProvider";
export const Landing = () => {
	const { isLoggedIn } = useAuthContext();
	const navigate = useNavigate();
	const handleAuthenticatedUser = () => {
		navigate("/app/events");
	}
	const handleUnauthenticatedUser = () => {
		navigate("/auth/login");
	}
	return(
		<Box
			css={
				css`
					min-height: 100vh;
					margin-bottom: 2rem;
				`
			}
		>
			<Paper
				elevation={4}
				css={
					css`
						width: 90%;
						max-width: 600px;
						padding: 1rem;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						gap: 1rem;
						margin: 0 auto;
						overflow: hidden;
						padding-bottom: 2rem;
						padding-inline: 2rem;
						ul {
							list-style: none;
							padding: 0;
						}
						li {
							margin-top: 0.5rem;
						}
					`
				}
			>
				<h1
					css={
						css`
							color: var(--color-primary-700);
						`
					}
				>
					Bowowee
				</h1>
				<h2
					css={
						css`
							color: var(--color-primary-700);
						`
					}
				>Technology</h2>
				<RowContainer
					alignItems="flex-start"
					justifyContent="flex-start"
					g="3rem"
				>
					<Box>
						<h3
							css={
								css`
									color: var(--color-accent-700);
								`
							}
						>
							Backend
						</h3>
						<ul>
							<li>Spring Web</li>
							<li>Spring Security</li>
							<li>Hibernate</li>
							<li>Spring Data JPA</li>
							<li>Spring Data Redis</li>
							<li>Spring Session</li>
							<li>MySQL</li>
						</ul>
					</Box>
					<Box>
						<h3
							css={
								css`
									color: var(--color-accent-700);
								`
							}
						>Frontend</h3>
						<ul>
							<li>React</li>
							<li>React Query</li>
							<li>Emotion</li>
							<li>Material UI</li>
							<li>CSS</li>
						</ul>
					</Box>
				</RowContainer>
				<h2
					css={
						css`
							color: var(--color-primary-700);
						`
					}
				>
					Overview
				</h2>
				<p
					css={
						css`
							word-break:word-break;
							line-height: 1.5;
						`
					}
				>
					<u>Bowowee is <b>mobile friendly</b> event tracking web application</u> that utilizes several interesting technologies.
				</p>
				<p
					css={
						css`
							word-break:word-break;
							line-height: 1.5;
						`
					}
				>
					On the frontend I am using the <b>React</b> library to build the user interface. To seperate client and server state I am using <b>React Query</b> to manage and cache server side data. For component styling I am are using <b>Material UI</b>, <b>Emotion</b>, and global styles written in <b>plain old css</b> to assign sensible default styles.
				</p>
				<p
					css={
						css`
							word-break:word-break;
							line-height: 1.5;
						`
					}
				>
					The backend is a <b>REST API</b> created using <b>Spring Web</b>. To handle the web application's authentication and authorization I am using <b>Spring Security</b> and <b>Spring Session</b>. For session management I am using <b>Spring Data Redis</b>. My database of choice is <b>MySQL</b>. <b>Hibernate</b> is the ORM, and I am using <b>Spring Data JPA</b> to reduce the complexity of building the data access layers.
				</p>
				<Box>
					<RowContainer
						justifyContent="space-between"
					>
						<Button 
							text="Get started" 
							buttonType="primary"
							onClick={isLoggedIn ? handleAuthenticatedUser : handleUnauthenticatedUser}
						/>
						<Link 
							href="https://google.com"
							text="Github"
							buttonType="primary"
						/>
					</RowContainer>
				</Box>
			</Paper>
		</Box>
	);
}