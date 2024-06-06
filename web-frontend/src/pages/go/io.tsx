import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { Plus_Jakarta_Sans } from "next/font/google";
import { HiOutlineHome } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";
import { FaArrowLeftLong } from "react-icons/fa6";
const jakarta = Plus_Jakarta_Sans({
	weight: "200",
	subsets: ["latin"],
});
const Akan = () => {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Go Lake Mashu</title>
			</Head>
			<main
				className={
					jakarta.className +
					" min-h-screen w-full flex flex-col align-middle p-10 gap-5"
				}
			>
				<h1 className="text-5xl text-center">Lake Mashu</h1>
				<div className="w-full h-[25rem] relative">
					<Image
						src={"/io/1.png"}
						alt="Akan Image"
						fill
						className="object-cover object-center"
					/>
				</div>
				<div className="flex flex-row align-middle justify-between gap-10">
					<div className="relative h-[30rem] w-full">
						<Image
							src={"/go/mashu_map.png"}
							alt="Lake Mashu map"
							fill
							className="object-cover object-center"
						/>
					</div>
					<div className="flex flex-col align-middle w-[100rem] gap-5">
						<div className="h-full w-[16rem] mx-auto relative">
							<Image
								src={"/go/io_bus.png"}
								alt="Lake Mashu train"
								fill
								className="object-cover object-center"
							/>
						</div>
						<p className="text-center text-xl">
							By bus (East Hokkaido Express Bus)
						</p>
						<ul className="text-xl list-disc pl-8">
							<li>Route: From Kushiro Station to Kawayu Onsen</li>
							<li>
								Transfer: From Kawayu Onsen, take a local bus or taxi to mount
								IO
							</li>
							<li>Frequency: One a day</li>
							<li>Duration: 3 Hours</li>
							<li>Fare: ¥3500-¥4800.</li>
						</ul>

						<p className="text-xl">
							For more details contact :<br />
							Email : travelguide@lakeakan.com
							<br />
							Phone : +81 123-456-789
						</p>
					</div>
				</div>
				<div className="w-full">
					<Link
						href={"/location/io"}
						className="flex flex-row gap-5 bg-[#A8A6A6] w-min px-5 py-2 rounded-xl text-white shadow-xl"
					>
						<FaArrowLeftLong size={20} className="my-auto" />
						<span className="text-xl">Back</span>
					</Link>
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

export default Akan;
