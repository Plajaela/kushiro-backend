import Head from "next/head";
import { Plus_Jakarta_Sans } from "next/font/google";
import { BiSolidQuoteAltRight, BiSolidQuoteAltLeft } from "react-icons/bi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState, useCallback, FormEvent, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
const jakarta = Plus_Jakarta_Sans({
	weight: "400",
	subsets: ["latin"],
});
const Verify = () => {
	const router = useRouter();
	const params = useSearchParams();
	const email = params.get("email");
	const ref1 = useRef<HTMLInputElement>(null);
	const ref2 = useRef<HTMLInputElement>(null);
	const ref3 = useRef<HTMLInputElement>(null);
	const ref4 = useRef<HTMLInputElement>(null);
	const ref5 = useRef<HTMLInputElement>(null);
	const ref6 = useRef<HTMLInputElement>(null);
	const [state1, setState1] = useState<undefined | string>(undefined);
	const [state2, setState2] = useState<undefined | string>(undefined);
	const [state3, setState3] = useState<undefined | string>(undefined);
	const [state4, setState4] = useState<undefined | string>(undefined);
	const [state5, setState5] = useState<undefined | string>(undefined);
	const [state6, setState6] = useState<undefined | string>(undefined);

	const submitForm = useCallback(
		async (e: FormEvent<HTMLButtonElement>) => {
			e.preventDefault();
			if (!state1 || !state2 || !state3 || !state4 || !state5 || !state6)
				return;
			const otp = state1 + state2 + state3 + state4 + state5 + state6;
			e.preventDefault();
			if (!router.isReady) return;
			const fetchLogin = await fetch(
				`${process.env.ENDPOINT}/auth/verify?email=${email}&token=${otp}`,
				{
					method: "POST",
				}
			);
			if (fetchLogin.status !== 200) {
				toast.error("Could not verify OTP!");
				return;
			}
			const jsonData = await fetchLogin.json();
			const token = jsonData.data.access_token;
			localStorage.setItem("token", token);
			router.push("/discover");
			toast.success("Logged in!");
		},
		[router, email, state1, state2, state3, state4, state5, state6]
	);
	useEffect(() => {
		if (!router.isReady) return;
		if (email === null) {
			router.replace("/");
			return;
		}
	}, [email, router]);
	return (
		<>
			<Head>
				<title>Verify</title>
			</Head>
			<main
				className={
					jakarta.className +
					" min-h-screen w-auto overflow-scroll flex flex-col bg-[url(/background_1.png)] bg-cover bg-center bg-no-repeat bg-origin-border"
				}
			>
				<section className=" bg-[#FFFFFF] flex flex-grow m-16 rounded-2xl p-16 flex-col bg-opacity-80 align-middle justify-between gap-2">
					<div className="w-full flex flex-row align-middle justify-start">
						<BiSolidQuoteAltLeft size={35} color="white" />
					</div>
					<div className="flex flex-grow flex-col align-middle justify-center bg-[#858585] bg-opacity-15 w-2/3 mx-auto rounded-xl gap-4">
						<h1 className="text-center text-5xl">Verify Code</h1>
						<p className="text-center">
							Please enter the code we sent to the email:
						</p>
						<span className="italic text-center">{email}</span>
						<div className="flex flex-row align-middle justify-evenly">
							<input
								type="tel"
								className="w-20 text-center text-2xl p-5 rounded-xl bg-[#D9D9D9]"
								maxLength={1}
								ref={ref1}
								autoFocus
								onChange={(e) => {
									setState1(e.target.value);
								}}
							/>
							<input
								type="tel"
								className="w-20 text-center text-2xl p-5 rounded-xl bg-[#D9D9D9]"
								maxLength={1}
								ref={ref2}
								onChange={(e) => {
									setState2(e.target.value);
								}}
							/>
							<input
								type="tel"
								className="w-20 text-center text-2xl p-5 rounded-xl bg-[#D9D9D9]"
								maxLength={1}
								ref={ref3}
								onChange={(e) => {
									setState3(e.target.value);
								}}
							/>
							<input
								type="tel"
								className="w-20 text-center text-2xl p-5 rounded-xl bg-[#D9D9D9]"
								maxLength={1}
								ref={ref4}
								onChange={(e) => {
									setState4(e.target.value);
								}}
							/>
							<input
								type="tel"
								className="w-20 text-center text-2xl p-5 rounded-xl bg-[#D9D9D9]"
								maxLength={1}
								ref={ref5}
								onChange={(e) => {
									setState5(e.target.value);
								}}
							/>
							<input
								type="tel"
								className="w-20 text-center text-2xl p-5 rounded-xl bg-[#D9D9D9]"
								maxLength={1}
								ref={ref6}
								onChange={(e) => {
									setState6(e.target.value);
								}}
							/>
						</div>
						<p className="text-sm text-center">Didn&apos;t receive an OTP?</p>
						<span className="text-sm text-center hover:cursor-pointer w-1/2 mx-auto italic">
							Resend Code
						</span>
						<button
							className="bg-[#858585] text-white w-48 mx-auto  px-5 py-2 rounded-xl "
							onClick={submitForm}
						>
							<span className="my-auto h-min align-baseline shadow-xl">
								Let&apos;s Explore!
							</span>
						</button>
					</div>

					<div className="w-full flex flex-row align-middle justify-end">
						<BiSolidQuoteAltRight size={35} color="white" />
					</div>
				</section>
			</main>
		</>
	);
};

export default Verify;
