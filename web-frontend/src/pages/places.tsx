import Head from "next/head";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import { MdArrowRightAlt } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/router";

const jakarta = Plus_Jakarta_Sans({
	weight: "200",
	subsets: ["latin"],
});
const Places = () => {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Places</title>
			</Head>
			<main
				className={
					jakarta.className + " min-h-screen flex flex-col align-middle p-10"
				}
			>
				<h1 className="text-7xl text-center text-[#4F4E4E] text-opacity-85 mb-10">
					POPULAR PLACES
				</h1>
				<div className="grid grid-cols-4 grid-rows-1 gap-10">
					<div className="flex flex-col align-middle justify-center gap-5 h-full ">
						<div className="relative h-[500px]">
							<Image
								src={"/locations/akan.png"}
								alt="Lake Akan"
								fill
								className="mx-auto"
							/>
						</div>
						<h1 className="text-2xl">Lake Akan</h1>
						<p className="h-[10rem] text-justify text-wrap">
							Lake Akan in Kushiro is a mesmerizing caldera lake in Hokkaido,
							Japan, famous for its crystal-clear waters, hot springs, and
							unique marimo algae.
						</p>
						<Link
							href={"/location/akan"}
							className="flex flex-row align-middle justify-center gap-2 ml-auto"
						>
							<span>Explore More</span>
							<MdArrowRightAlt size={30} className="my-auto" />
						</Link>
					</div>
					<div className="flex flex-col align-middle justify-center gap-5 h-full ">
						<div className="relative h-[500px]">
							<Image
								src={"/locations/marsh.png"}
								alt="Kushiro Marshland"
								fill
								className="mx-auto"
							/>
						</div>
						<h1 className="text-2xl">Kushiro Marshland</h1>
						<p className="h-[10rem] text-justify text-wrap">
							Kushiro Marshland in Hokkaido is Japan&apos;s largest wetland,
							home to diverse wildlife and offering stunning scenery with
							accessible boardwalks for visitors.
						</p>
						<Link
							href={"/location/marsh"}
							className="flex flex-row align-middle justify-center gap-2 ml-auto"
						>
							<span>Explore More</span>
							<MdArrowRightAlt size={30} className="my-auto" />
						</Link>
					</div>
					<div className="flex flex-col align-middle justify-center gap-5 h-full ">
						<div className="relative h-[500px]">
							<Image
								src={"/locations/mashu.png"}
								alt="Lake Mashu"
								fill
								className="mx-auto"
							/>
						</div>
						<h1 className="text-2xl">Lake Mashu</h1>
						<p className="h-[10rem] text-justify text-wrap">
							Lake Mashuu in Kushiro, Hokkaido, is a crystal-clear caldera lake
							known for its misty beauty and scenic views from observation
							points in Akan-Mashu National Park.
						</p>
						<Link
							href={"/location/mashu"}
							className="flex flex-row align-middle justify-center gap-2 ml-auto"
						>
							<span>Explore More</span>
							<MdArrowRightAlt size={30} className="my-auto" />
						</Link>
					</div>
					<div className="flex flex-col align-middle justify-center gap-5 h-full ">
						<div className="relative h-[500px]">
							<Image
								src={"/locations/io.png"}
								alt="Mount IO"
								fill
								className="mx-auto"
							/>
						</div>
						<h1 className="text-2xl">Mount IO</h1>
						<p className="h-[10rem] text-justify text-wrap">
							Mount Io is an active volcano located in Akan Mashu National Park
							in Hokkaido, Japan, known for its sulfuric emissions and rugged
							beauty.
						</p>
						<Link
							href={"/location/io"}
							className="flex flex-row align-middle justify-center gap-2 ml-auto"
						>
							<span>Explore More</span>
							<MdArrowRightAlt size={30} className="my-auto" />
						</Link>
					</div>
				</div>
			</main>
			<footer className="h-[3rem] flex flex-row align-middle justify-between px-10 bg-[#2D4033]">
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
export default Places;
