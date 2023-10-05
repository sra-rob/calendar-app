import { useState } from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { TextField } from "@mui/material";
import { Layout } from "@/features/auth/components/Layout"
import { Form } from "@/components/Form";
import { Button } from "@/components/Elements";
import { useRegister } from "@/features/auth/api/register";
import { useSnackbarDispatchContext } from "@/providers/SnackbarProvider";

export const Register = () => {
	const formData = new FormData();
	const [ form, setForm ] = useState(formData);
	const registerQuery = useRegister();
	const setSnackPack = useSnackbarDispatchContext();
	const handleUsernameChange = (e) => {
		form.set("username", e.target.value);
		setForm(form);
	}
	const handlePasswordChange = (e) => {
		form.set("password", e.target.value) 
		setForm(form);
	}
	const handleRepeatPasswordChange = (e) => {
		form.set("repeatPassword", e.target.value);
		setForm(form);
	}
	const onSubmit = (e) => {
		e.preventDefault();
		const username = form.get("username");
		const password = form.get("password");
		const repeatPassword = form.get("repeatPassword");
		if(password !== repeatPassword) {
			setSnackPack(prev => [ ...prev, { message: "Passwords do not match", key: new Date().getTime(), severity: "error" }]);
			return;
		}
		const user = { username, password };
		registerQuery.mutate(user);
	}
	return(
		<Layout>
			<Form>
				<h1>Register</h1>
				<TextField 
					placeholder="Username"
					required
					onChange={handleUsernameChange}
					minLength={5}
					maxLength={15}
				/>
				<TextField 
					placeholder="Password"
					type="password"
					onChange={handlePasswordChange}
					required
					minLength={8}
					maxLength={15}
				/>
				<TextField 
					placeholder="Repeat password"
					type="password"
					onChange={handleRepeatPasswordChange}
					required
					minLength={8}
					maxLength={15}
				/>
				<Button 
					text="Register"
					buttonType="accent"
					type="submit"
					onClick={onSubmit}
				/>
			</Form>
			<p>Already have an account? <Link
				to="/auth/login"
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
				Login
			</Link></p>
		</Layout>
	)
}