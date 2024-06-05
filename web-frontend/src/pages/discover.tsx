import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Plus_Jakarta_Sans } from "next/font/google";
import { HiOutlineHome } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
const jakarta = Plus_Jakarta_Sans({
	weight: "variable",
	subsets: ["latin"],
});
const Discover = () => {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Discover</title>
			</Head>
			<main
				className={
					jakarta.className +
					" flex flex-row align-middle justify-between w-full h-screen"
				}
			>
				<div id="IMAGES" className=" h-[94vh] p-10 w-[55vw] ">
					<Image
						alt="image1"
						src={"/discover/image1.png"}
						width={400}
						height={200}
						className="absolute top-0 bottom-0 z-30 m-auto"
					/>
					<Image
						alt="image1"
						src={"/discover/image2.png"}
						width={250}
						height={100}
						className="absolute top-0 bottom-0 left-1/4 z-20 m-auto"
					/>
					<Image
						alt="image1"
						src={"/discover/image3.png"}
						width={250}
						height={100}
						className="absolute top-0 bottom-0 left-1/3 z-10 m-auto"
					/>
				</div>
				<div className="w-[40vw] p-10 flex flex-col align-middle justify-center ">
					<h1 className="text-8xl font-extralight text-left text-[#4F4E4E]">
						Discover
					</h1>
					<h2 className="text-7xl font-light text-right text-[#4F4E4E] mb-20">
						Kushiro
					</h2>
					<p className="text-2xl text-wrap text-justify break-before-left indent-10 text-[#393939] mb-10">
						Kushiro, situated on Hokkaido&apos;s eastern coast, boasts stunning
						wetlands and nature reserves.
					</p>
					<p className="text-2xl text-wrap text-justify break-before-left indent-10 text-[#393939] mb-10">
						With a mix of modern amenities and traditional charm, it offers
						fresh seafood delights and insights into Ainu culture. Experience
						Japan&apos;s northern beauty and serene atmosphere in Kushiro.
					</p>
					<Link
						href={"/places"}
						className="ml-auto bg-[#D9D9D9] px-5 py-2 rounded-xl underline"
					>
						Get Started
					</Link>
				</div>
			</main>
			<footer className="h-14 flex flex-row align-middle justify-between px-10 bg-[#2D4033]">
				<HiOutlineHome
					size={30}
					className="my-auto hover:cursor-pointer"
					color="white"
					onClick={() => router.push("/")}
				/>
				<CgProfile
					size={30}
					className="my-auto hover:cursor-pointer"
					color="white"
					onClick={() => router.push("/profile")}
				/>
			</footer>
		</>
	);
};
export default Discover;
