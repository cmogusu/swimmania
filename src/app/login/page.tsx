export default async function Login() {
	return (
		<div>
			<h1>Sign in</h1>
			<form>
				<input type="name" name="username" placeholder="username" />
				<input type="password" name="password" placeholder="password" />
				<input type="submit" />
			</form>
		</div>
	);
}
