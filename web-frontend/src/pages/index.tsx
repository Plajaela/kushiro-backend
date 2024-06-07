import { Petrona } from "next/font/google";
import Link from "next/link";
import Head from "next/head";
import { FaArrowRightLong } from "react-icons/fa6";
const petrona = Petrona({
	weight: "400",
	subsets: ["latin"],
});
export default function Home() {
	return (
		<>
			<Head>
				<title>Kushiro - Hokkaido</title>
			</Head>
			<main
				className={
					petrona.className +
					" min-h-screen w-full flex flex-col text-center bg-[url(/background.png)] bg-cover bg-top bg-no-repeat bg-origin-border"
				}
			>
				<header className="flex flex-row align-middle justify-between  h-28 px-20 pt-5">
					<h1 className="text-center h-min my-auto text-white text-3xl">
						<Link href={"/"}>DREAMY KUSHIRO</Link>
					</h1>
					<div className="flex flex-row align-middle justify-between gap-10 my-auto text-2xl text-white">
						<Link href={"/signin"}>Signin</Link>
						<Link href={"/signup"}>Signup</Link>
					</div>
				</header>
				<section
					className="flex flex-col align-middle justify-center text-white gap-20"
					style={{
						height: "calc(100vh - 7rem)",
					}}
				>
					<h1 className="text-[10rem]">KUSHIRO</h1>
					<Link
						href={"/discover"}
						className="border border-white w-48 p-2 mx-auto text-3xl flex flex-row align-middle justify-center gap-5"
					>
						Explore
						<FaArrowRightLong size={25} className="my-auto" />
					</Link>
				</section>
			</main>
		</>
	);
}
