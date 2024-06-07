import Head from "next/head";
import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { toast } from "react-toastify";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoPerson } from "react-icons/go";
import { HiOutlineHome } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
export interface UserData {
	id: string;
	aud: string;
	role: string;
	email: string;
	email_confirmed_at: string;
	phone: string;
	confirmation_sent_at: string;
	confirmed_at: string;
	last_sign_in_at: string;
	app_metadata: AppMetadata;
	user_metadata: UserMetadata;
	identities: Identity[];
	created_at: string;
	updated_at: string;
	is_anonymous: boolean;
}

export interface AppMetadata {
	provider: string;
	providers: string[];
}

export interface UserMetadata {
	email: string;
	email_verified: boolean;
	first_name: string;
	last_name: string;
	location_1: string;
	location_2: string;
	phone_verified: boolean;
	profile_picture_url: string;
	sub: string;
	username: string;
	phone: string | null;
}

export interface Identity {
	identity_id: string;
	id: string;
	user_id: string;
	identity_data: IdentityData;
	provider: string;
	last_sign_in_at: string;
	created_at: string;
	updated_at: string;
	email: string;
}

export interface IdentityData {
	email: string;
	email_verified: boolean;
	first_name: string;
	last_name: string;
	location_1: string;
	location_2: string;
	phone_verified: boolean;
	profile_picture_url: string;
	sub: string;
	username: string;
}
const jakarta = Plus_Jakarta_Sans({
	weight: "200",
	subsets: ["latin"],
});

const Profile = () => {
	const router = useRouter();
	const [user, setUser] = useState<UserData | null>(null);
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [location_1, setLocation1] = useState("");
	const [location_2, setLocation2] = useState("");
	useEffect(() => {
		if (!router.isReady) return;
		const token = localStorage.getItem("token");
		if (token === null) {
			router.replace("/signin");
			return;
		}
		fetch(`${process.env.ENDPOINT}/auth/authenticate`, {
			method: "POST",
			headers: {
				Authorization: token,
			},
		})
			.then((res) => {
				if (res.status !== 200) {
					toast.error("Token invalid. Please login.");
					router.replace("/signin");
					return;
				}
				res.json().then((responsejson) => {
					setUser(responsejson.data as UserData);
					const user_metadata = responsejson.data.user_metadata as UserMetadata;
					setFirstName(user_metadata.first_name);
					setLastName(user_metadata.last_name);
					setPhone(user_metadata.phone || "");
					setLocation1(user_metadata.location_1);
					setLocation2(user_metadata.location_2);
				});
			})
			.catch(() => {
				toast.error("Something went wrong when trying to authenticate.");
				setUser(null);
			});
	}, [router]);
	const saveData = useCallback(async () => {
		if (!router.isReady) return;
		const token = localStorage.getItem("token");
		if (token === null) return;
		const query = await fetch(`${process.env.ENDPOINT}/auth/profile`, {
			method: "POST",
			headers: {
				Authorization: token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				first_name,
				last_name,
				phone,
				location_1,
				location_2,
			}),
		}).catch(() => null);
		if (query === null) {
			toast.error("Something went wrong when trying to save.");
			return;
		}
		if (query.status !== 200) {
			toast.error("Failed to save...");
			return;
		}
		toast.success("Updated profile!");
		router.reload();
		return;
	}, [first_name, last_name, phone, location_1, location_2, router]);

	if (user === null) {
		return (
			<main className="min-h-screen w-full flex flex-col align-middle justify-center text-center">
				<h1 className="text-7xl">Loading...</h1>
			</main>
		);
	}
	return (
		<>
			<Head>
				<title>Profile</title>
			</Head>
			<main
				className={
					jakarta.className +
					" min-h-screen w-full flex flex-grow flex-col align-middle"
				}
			>
				<header className="flex flex-row align-middle justify-end w-full p-5 border-b-[#9A9292] border-opacity-60 border-b-4 gap-5">
					<div className="relative w-[3rem] h-[3rem] my-auto border-4 rounded-full">
						<Image
							src={user.user_metadata.profile_picture_url}
							className="object-cover object-center rounded-full"
							fill
							alt="Profile Picture"
						/>
					</div>
					<span className="h-min my-auto w-auto text-left text-xl">
						{user.user_metadata.first_name + " " + user.user_metadata.last_name}
					</span>
				</header>
				<div className="flex flex-row flex-grow align-middle justify-center">
					<div className="w-[30rem]  flex flex-col align-middle p-10 border-r-4 border-opacity-65 border-r-[#9A9292]">
						<h1 className="text-5xl text-center mb-28">User Profile</h1>
						<div className="flex flex-row align-middle justify-center gap-5 w-full">
							<GoPerson size={40} />
							<span className="h-min my-auto text-3xl">User Info</span>
						</div>
					</div>
					<div className="w-full flex flex-col align-middle p-10">
						<div className="flex flex-row align-middle justify-center gap-10 ">
							<div className="relative w-[10rem] h-[10rem] my-auto">
								<Image
									src={user.user_metadata.profile_picture_url}
									alt="Profile Picture"
									className="object-fill object-center rounded-full hover:cursor-pointer"
									fill
								/>
							</div>
							<div className="flex flex-col align-middle justify-center">
								<span className="text-3xl">
									{user.user_metadata.first_name +
										" " +
										user.user_metadata.last_name}
								</span>
								<span className="text-2xl text-[#878787] ">
									{user.user_metadata.location_1 +
										", " +
										user.user_metadata.location_2}
								</span>
							</div>
						</div>
						<div className="grid grid-rows-4 grid-cols-2 ">
							<div className="flex flex-col align-middle justify-center p-5 gap-2">
								<span className="w-full text-xl">First Name</span>
								<input
									type="text"
									placeholder="First Name"
									className="p-3 text-xl rounded-xl bg-[#D9D9D9]"
									value={first_name}
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</div>
							<div className="flex flex-col align-middle justify-center p-5 gap-2">
								<span className="w-full text-xl">Last Name</span>
								<input
									type="text"
									placeholder="Last Name"
									className="p-3 text-xl rounded-xl bg-[#D9D9D9]"
									value={last_name}
									onChange={(e) => setLastName(e.target.value)}
								/>
							</div>
							<div className="flex flex-col align-middle justify-center p-5 gap-2">
								<span className="w-full text-xl">Email</span>
								<input
									type="email"
									placeholder="Email"
									className="p-3 text-xl rounded-xl bg-[#D9D9D9]"
									value={user.user_metadata.email}
									disabled
								/>
							</div>
							<div className="flex flex-col align-middle justify-center p-5 gap-2">
								<span className="w-full text-xl">Phone</span>
								<input
									type="tel"
									placeholder="Phone"
									className="p-3 text-xl rounded-xl bg-[#D9D9D9]"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
								/>
							</div>
							<div className="flex flex-col align-middle justify-center p-5 gap-2">
								<span className="w-full text-xl">Location 1</span>
								<input
									type="text"
									placeholder="Location 1"
									className="p-3 text-xl rounded-xl bg-[#D9D9D9]"
									value={location_1}
									onChange={(e) => setLocation1(e.target.value)}
								/>
							</div>
							<div className="flex flex-col align-middle justify-center p-5 gap-2">
								<span className="w-full text-xl">Location 2</span>
								<input
									type="text"
									placeholder="Location 2"
									className="p-3 text-xl rounded-xl bg-[#D9D9D9]"
									value={location_2}
									onChange={(e) => setLocation2(e.target.value)}
								/>
							</div>
							<div className="col-span-2 p-10 align-middle justify-center flex ">
								<button
									className="text-xl bg-[#D9D9D9] w-1/2 rounded-2xl"
									onClick={saveData}
								>
									Save Changes
								</button>
							</div>
						</div>
					</div>
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

export default Profile;
