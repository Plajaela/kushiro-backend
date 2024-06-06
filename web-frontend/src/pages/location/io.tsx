import Head from "next/head";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/router";
const jakarta = Plus_Jakarta_Sans({
	weight: "200",
	subsets: ["latin"],
});
interface Data {
	created_at: string;
	user_id: string;
	stars: number;
	review: string;
	location: string;
	users: {
		last_name: string;
		first_name: string;
		profile_picture_url: string;
	};
}
const IO = ({ data }: { data: Data[] }) => {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Mount IO</title>
			</Head>
			<main
				className={
					jakarta.className +
					" min-h-screen w-full flex flex-col align-middle p-10 gap-5"
				}
			>
				<h1 className="text-7xl text-center text-[#4F4E4E] text-opacity-85 ">
					Mount IO
				</h1>
				<div className="grid grid-cols-6 grid-rows-6 gap-5 h-[70rem]">
					<div className="relative row-span-2 col-span-4">
						<Image
							src={"/io/1.png"}
							alt="io-1"
							fill
							className="object-cover object-center"
						/>
					</div>
					<div
						className="relative row-span-3 col-span-2"
						style={{
							gridColumnStart: 5,
							gridRowStart: 1,
						}}
					>
						<Image
							src={"/io/4.png"}
							alt="io-4"
							fill
							className="object-cover object-center"
						/>
					</div>
					<div
						className="relative row-span-4 col-span-2"
						style={{
							gridColumnStart: 1,
							gridRowStart: 3,
						}}
					>
						<Image
							src={"/io/2.png"}
							alt="io-2"
							fill
							className="object-cover object-center"
						/>
					</div>
					<div
						className="relative row-span-4 col-span-2"
						style={{
							gridColumnStart: 3,
							gridRowStart: 3,
						}}
					>
						<Image
							src={"/io/3.png"}
							alt="io-3"
							fill
							className="object-cover object-center"
						/>
					</div>
					<div
						className="relative row-span-2 col-span-2"
						style={{
							gridColumnStart: 5,
							gridRowStart: 4,
						}}
					>
						<Image src={"/io/5.png"} alt="io-5" fill className="object-cover" />
					</div>

					<div
						className="row-span-1 col-span-2 flex flex-col align-middle justify-center"
						style={{
							gridColumnStart: 5,
							gridRowStart: 6,
						}}
					>
						<Link
							href={"/go/io"}
							className="flex flex-row align-middle justify-center gap-2 border-2 mx-auto px-5 py-2 "
						>
							<span className="text-[#5F5D5D] text-2xl">How to get there?</span>
							<MdArrowRightAlt size={25} className="my-auto" />
						</Link>
					</div>
				</div>
				<h2 className="text-7xl text-center text-[#4F4E4E] text-opacity-85 mt-20">
					REVIEWS
				</h2>
				<div className="grid grid-cols-3 grid-rows-1 gap-5">
					{data.map((reviewData, index) => {
						const stars = [];
						for (let i = 0; i < reviewData.stars; i++) {
							stars.push(<FaStar size={40} />);
						}
						for (let i = 0; i < 5 - reviewData.stars; i++) {
							stars.push(<FaRegStar size={40} />);
						}
						return (
							<div
								key={index}
								className="flex flex-row align-middle justify-center gap-5"
							>
								<div className="h-[15rem] w-[20rem] relative">
									<Image
										src={reviewData.users.profile_picture_url}
										alt="Profile Picture"
										fill
										className="object-cover object-center"
									/>
								</div>
								<div className="w-full flex flex-col align-middle gap-1">
									<h3 className="text-3xl">Mount IO</h3>
									<div className="flex flex-row align-middle">{stars}</div>
									<p className="text-lg h-[8rem] text-justify text-wrap truncate">
										{reviewData.review}
									</p>
									<div className="h-[2rem] flex flex-row align-middle justify-between">
										<span className="truncate">
											{reviewData.users.first_name +
												" " +
												reviewData.users.last_name}
										</span>
										<span>
											{new Date(reviewData.created_at).toLocaleDateString(
												"ja-JP"
											)}
										</span>
									</div>
								</div>
							</div>
						);
					})}
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
export default IO;

export async function getServerSideProps() {
	const response = await fetch(
		`${process.env.ENDPOINT}/review/list/IO?limit=3`
	);
	if (response.status !== 200)
		return {
			props: {
				data: [],
			},
		};
	const responsejson = await response.json();
	const data = responsejson.data;
	return {
		props: {
			data,
		},
	};
}
