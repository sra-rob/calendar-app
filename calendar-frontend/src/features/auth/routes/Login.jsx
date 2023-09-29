import { useRef, useCallback } from "react";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { Layout } from "@/features/auth/components/Layout";
import { Form } from "@/components/Form";
import { Button } from "@/components/Elements";
import { useLogin } from "@/features/auth/api/login";

export const Login = () => {
	const formData = new FormData();
	const formRef = useRef(formData);
	const form = formRef.current;
	const loginQuery = useLogin();
	const onSubmit = useCallback((e) => {
		e.preventDefault();
		const username = form.get("username");
		const password = form.get("password");
		loginQuery.mutate({ username, password });
	}, [ form, loginQuery ])
	const usernameOnChange = (e) => {
		form.set("username", e.target.value);
	}
	const passwordOnChange = (e) => {
		form.set("password", e.target.value);
	}
	return(
		<Layout>
			<Form onSubmit={onSubmit}>
				<h1>Login</h1>
					<TextField 
						placeholder="Username"
						onChange={usernameOnChange}
						required
					/>
					<TextField 
						placeholder="Password"
						onChange={passwordOnChange}
						type="password"
						required
					/>
					<Button 
						text="Login"
						buttonType="accent"
						type="submit"
					/>
			</Form>
			<p>
				Don't have an account? <Link 
						to="/auth/register"
						css={
							css`
								text-decoration: none;
								color: var(--color-secondary-400);
								&:clicked {
									color: var(--color-seconadary-400);
								}
							`
						}
					>
						Register
					</Link>
			</p>
		</Layout>
	)
}