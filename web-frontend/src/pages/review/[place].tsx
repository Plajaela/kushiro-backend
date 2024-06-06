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
