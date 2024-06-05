import Head from "next/head";
import { Plus_Jakarta_Sans } from "next/font/google";
import { HiOutlineMailOpen } from "react-icons/hi";
import { CiLock } from "react-icons/ci";
import { BiSolidQuoteAltRight, BiSolidQuoteAltLeft } from "react-icons/bi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState, useCallback, FormEvent } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
const jakarta = Plus_Jakarta_Sans({
	weight: "400",
	subsets: ["latin"],
});
const Signin = () => {
	const router = useRouter();
	const [revealPassword, setReveal] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submitForm = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (!router.isReady) return;
			const fetchLogin = await fetch(`${process.env.ENDPOINT}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			});
			if (fetchLogin.status !== 200) {
				toast.error("Could not login!");
				return;
			}
			const jsonData = await fetchLogin.json();
			const token = jsonData.data.access_token;
			localStorage.setItem("token", token);
			router.push("/discover");
			toast.success("Logged in!");
		},
		[email, password, router]
	);

	return (
		<>
			<Head>
				<title>Signin</title>
			</Head>
			<main
				className={
					jakarta.className +
					" min-h-screen w-auto overflow-scroll flex flex-col bg-[url(/background_1.png)] bg-cover bg-center bg-no-repeat bg-origin-border"
				}
			>
				<section className=" bg-[#FFFFFF] flex flex-grow m-16 rounded-2xl p-16 flex-col bg-opacity-70 shadow-xl align-middle justify-between gap-2">
					<div className="w-full flex flex-row align-middle justify-start">
						<BiSolidQuoteAltLeft size={35} color="white" />
					</div>
					<div className="flex flex-grow flex-row px-10 gap-20">
						<div className="w-1/2 flex flex-col align-middle justify-center gap-2">
							<h1 className="text-[#575757] text-7xl text-center">WELCOME!</h1>
							<h2 className="text-[#534F4F] text-lg text-center font-light">
								Let&apos;s explore Kushiro together
							</h2>
						</div>
						<div className="w-1/2 bg-[#ABABAB] bg-opacity-20 rounded-2xl flex flex-col align-middle justify-center p-10">
							<h2 className="text-center text-5xl font-light">Sign in</h2>
							<form className="flex flex-col px-5" onSubmit={submitForm}>
								<label htmlFor="email" className="text-white">
									Email
								</label>
								<span className="flex flex-row bg-white gap-2 p-2 rounded-full mb-5">
									<HiOutlineMailOpen size={30} className="m-auto" />
									<input
										type="email"
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="border-none focus:outline-none flex flex-grow"
									/>
								</span>
								<label htmlFor="password" className="text-white">
									Password
								</label>
								<span className="flex flex-row bg-white gap-2 p-2 rounded-full mb-10 flex-grow">
									<CiLock size={30} className="m-auto" />
									<input
										type={revealPassword ? "text" : "password"}
										name="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="border-none focus:outline-none flex flex-grow"
									/>
									{revealPassword ? (
										<IoEyeOutline
											size={30}
											className="m-auto hover:cursor-pointer"
											onClick={() => setReveal(false)}
										/>
									) : (
										<IoEyeOffOutline
											size={30}
											className="m-auto hover:cursor-pointer"
											onClick={() => {
												setReveal(true);
											}}
										/>
									)}
								</span>
								<input
									type="submit"
									className=" bg-[#9C9C9C] text-xl text-white font-bold p-2 rounded-full hover:cursor-pointer"
								/>
							</form>
						</div>
					</div>
					<div className="w-full flex flex-row align-middle justify-between">
						<Link
							href={"/"}
							className="bg-[#AFAFAF] text-white w-44 flex flex-row align-middle justify-center gap-2 rounded-xl shadow-xl"
						>
							<FaArrowLeftLong size={20} className="my-auto" />
							<span className="h-min my-auto text-lg">BACK</span>
						</Link>
						<BiSolidQuoteAltRight size={35} color="white" />
					</div>
				</section>
			</main>
		</>
	);
};

export default Signin;
