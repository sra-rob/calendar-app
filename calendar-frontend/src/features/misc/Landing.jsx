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
	const technologyHeaderStyle = css`
		color: var(--color-accent-700);
		margin-bottom: 0.25rem;
	`
	const sectionHeader = css`
		color: var(--color-primary-700);
		font-size: 1.6rem;
	`
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
						gap: 1rem;
						margin: 0 auto;
						overflow: hidden;
						padding-bottom: 2rem;
						padding-inline: 2rem;
					`
				}
			>
				<Box
					css={
						css`
							display: flex;
							flex-direction: column;
							color: var(--color-primary-700);
							gap: 0.25rem;
							@media(min-width: 800px) {
								flex-direction: row;
							}
						`
					}
				>
					<h1
						css={
							css`
								color: var(--color-primary-700);
								width: 100%;
							`
						}
					>
					Calendar Site
				</h1>
					<Button 
						text="Get started" 
						buttonType="primary"
						onClick={isLoggedIn ? handleAuthenticatedUser : handleUnauthenticatedUser}
						width="100%"
					/>
				</Box>
				{/* <RowContainer
					justifyContent="space-between"
				>
					<h1
						css={
							css`
								color: var(--color-primary-700);
							`
						}
					>
					Calendar Site
				</h1>
					<Button 
						text="Get started" 
						buttonType="primary"
						onClick={isLoggedIn ? handleAuthenticatedUser : handleUnauthenticatedUser}
					/>
				</RowContainer> */}
				<h2
					css={sectionHeader}
				>
					Technology
				</h2>
				<Box>
					<h3
						css={technologyHeaderStyle}
					>
						Backend
					</h3>
					<p>Spring Web, Spring Security, Spring Data JPA, Spring Data Redis, Spring Session, MySQL</p>
				</Box>
				<Box>
					<h3
						css={technologyHeaderStyle}
					>
						Frontend
					</h3>
					<p>React, Reacty Query, Emotion, Material UI, CSS</p>
				</Box>
				<Box>
					<h3
						css={technologyHeaderStyle}
					>
						Deployment
					</h3>
					<p>Google Compute Engine, Github, Github Actions, Docker, Docker Hub</p>
				</Box>
				<h2
					css={sectionHeader}
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
					<u>The Calendar Site is <b>mobile friendly</b> event tracking web application</u> that utilizes several interesting technologies.
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
					The backend was created using <b>Spring Web</b>. To handle the web application's authentication and authorization I am using <b>Spring Security</b> and <b>Spring Session</b>. For session management I am using <b>Spring Data Redis</b>. My database of choice is <b>MySQL</b>, and I am using <b>Spring Data JPA</b> to reduce the complexity of building the data access layers.
				</p>
				<p
					css={
						css`
							word-break:word-break;
							line-height: 1.5;
						`
					}
				>
					Finally, for version control, I am using <b>Github</b>. <b>Github Actions</b> inserts my secrets and builds and dockerizes my Spring application. Likewise it builds and dockerizes my React application. After building my containers, Github Actions pushes my containers to <b>Dockerhub</b>, where the containers are later be pulled onto my <b>Google Compute Engine</b> virtual machine and ran. 
				</p>
				<Box>
					<RowContainer>
						<Button 
							text="Get started" 
							buttonType="primary"
							onClick={isLoggedIn ? handleAuthenticatedUser : handleUnauthenticatedUser}
						/>
						<Link 
							href="https://github.com/sra-rob/calendar-app"
							text="Github"
							buttonType="primary"
						/>
					</RowContainer>
				</Box>
			</Paper>
		</Box>
	);
}