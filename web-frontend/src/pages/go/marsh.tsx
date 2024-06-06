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
const Marsh = () => {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Go Kushiro Marshland</title>
			</Head>
			<main
				className={
					jakarta.className +
					" min-h-screen w-full flex flex-col align-middle p-10 gap-5"
				}
			>
				<h1 className="text-5xl text-center">Kushiro Marshland</h1>
				<div className="w-full h-[25rem] relative">
					<Image
						src={"/marsh/1.png"}
						alt="Akan Image"
						fill
						className="object-cover object-center"
					/>
				</div>
				<div className="flex flex-row align-middle justify-between gap-10">
					<div className="relative h-[30rem] w-full">
						<Image
							src={"/go/marsh_map.png"}
							alt="Kushiro Marsh map"
							fill
							className="object-cover object-center"
						/>
					</div>
					<div className="flex flex-col align-middle w-1/2 gap-5">
						<div className="flex flex-row align-middle justify-left gap-5">
							<div className="w-[20rem] relative">
								<Image
									src={"/go/marsh_bus.png"}
									alt="Kushiro Marsh Bus"
									fill
									className="object-cover object-center"
								/>
							</div>
							<p className="w-full h-[10rem] text-xl text-justify text-wrap flex">
								Akan Bus (Outside Kushiro Station) departure times are <br />
								7:50 AM, <br />
								10:20 AM, <br />
								1:00 PM, and <br />
								3:30 PM
							</p>
						</div>
						<p className="text-xl">
							Journey time: approximately 30-50 minutes. Fare: ¥900-¥1,200
						</p>
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
						href={"/location/marsh"}
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

export default Marsh;
