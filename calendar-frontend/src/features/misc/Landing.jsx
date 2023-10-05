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
					g="1rem"
				>
					<Box>
						<h3
							css={
								css`
									color: var(--color-accent-700);
									text-align: center;
								`
							}
						>
							Backend
						</h3>
						<ul
							css={
								css`
									text-align: center;
								`
							}
						>
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
									text-align: center;
								`
							}
						>Frontend</h3>
						<ul
							css={
								css`
									text-align: center;
								`
							}
						>
							<li>React</li>
							<li>React Query</li>
							<li>Emotion</li>
							<li>Material UI</li>
							<li>CSS</li>
						</ul>
					</Box>
					<Box>
						<h3
							css={
								css`
									color: var(--color-accent-700);
									text-align: center;
								`
							}
						>
							Deployment
						</h3>
						<ul
							css={
								css`
									text-align: center;
								`
							}
						>
							<li>Google Compute Engine</li>
							<li>Github Actions</li>
							<li>Docker</li>
							<li>Docker Hub</li>
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
					The backend is a <b>REST API<sub>1</sub></b> created using <b>Spring Web</b>. To handle the web application's authentication and authorization I am using <b>Spring Security</b> and <b>Spring Session</b>. For session management I am using <b>Spring Data Redis</b>. My database of choice is <b>MySQL</b>. <b>Hibernate</b> is the ORM, and I am using <b>Spring Data JPA</b> to reduce the complexity of building the data access layers.
				</p>
				<p
					css={
						css`
							word-break:word-break;
							line-height: 1.5;
						`
					}
				>
					Finally, for version control, I am using <b>Github</b>. After I push to my main branch<b><sub>2</sub></b>, <b>Github Actions</b> inserts my secrets and builds and dockerizes my Spring application. Likewise it builds and dockerizes my React application. After building my containers, Github Actions pushes my containers to <b>Dockerhub</b>, where the containers are later be pulled onto my <b>Google Compute Engine</b> virtual machine and ran. 
				</p>
				<p
					css={
						css`
							align-self: start;
							font-size: 0.65rem;
						`
					}
				>
					1. Sessions can be considered a violation of REST principals. Though I'm of the opinion that as long as an API has the <a href="https://stackoverflow.com/a/6068298">properties of a pure function</a> it can still be considered RESTful.
					<br />
					<br />
					2. Don't push to your main branch.
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