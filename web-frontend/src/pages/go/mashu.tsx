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
const Mashu = () => {
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
						src={"/mashu/1.png"}
						alt="Mashu Image"
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
						<p className="text-center text-xl">
							Go by train (JR Senmo Main Line)
						</p>
						<ul className="text-xl list-disc pl-8">
							<li>Frequency: 5 times a day</li>
							<li>Duration: Approximately 1 hour and 14 minutes</li>
							<li>Fare: ¥1300 to ¥1800 (approximately $8 to $12)</li>
						</ul>
						<div className="flex flex-row align-middle justify-left gap-5 h-auto">
							<div className="w-[30rem] relative">
								<Image
									src={"/go/mashu_bus.png"}
									alt="Lake Mashu train"
									fill
									className="object-cover object-center"
								/>
							</div>
							<ul className="w-full h-[10rem] text-lg text-justify text-wrap flex flex-col list-disc pl-8">
								<li>First Train: Around 7:00 AM</li>
								<li>Second Train: Around 9:30 AM</li>
								<li>Third Train: Around 12:00 PM</li>{" "}
								<li>Fourth Train: Around 2:30 PM </li>
								<li>Fifth Train: Around 5:00</li>
								PM
							</ul>
						</div>

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
						href={"/location/mashu"}
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

export default Mashu;
