import Head from "next/head";
import { Plus_Jakarta_Sans } from "next/font/google";
import { BiSolidQuoteAltRight, BiSolidQuoteAltLeft } from "react-icons/bi";
import { useState, useCallback, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

const jakarta = Plus_Jakarta_Sans({
	weight: "400",
	subsets: ["latin"],
});
const Signin = () => {
	const router = useRouter();
	const [starCount, setStarCount] = useState(0);
	const [review, setReview] = useState("");
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
		}).then((response) => {
			if (response.status !== 200) {
				toast.error("Could not authenticate. Please login.");
				router.replace("/signin");
			}
		});
	}, [router]);
	const stars = useMemo(() => {
		const starsArray = [];
		for (let i = 0; i < starCount; i++) {
			starsArray.push(
				<FaStar
					size={40}
					className="hover:cursor-pointer"
					onClick={() => {
						setStarCount(i + 1);
					}}
				/>
			);
		}
		for (let i = 0; i < 5 - starCount; i++) {
			starsArray.push(
				<FaRegStar
					size={40}
					className="hover:cursor-pointer"
					onClick={() => {
						setStarCount(i + starCount + 1);
					}}
				/>
			);
		}
		return starsArray;
	}, [starCount]);
	const location = useMemo(() => {
		const locationName = router.query.place;
		if (locationName === undefined) return undefined;
		const locationArray = (locationName as string).split("");
		locationArray[0] = locationArray[0].toUpperCase();
		return locationArray.join("");
	}, [router.query.place]);
	const submit = useCallback(async () => {
		if (starCount === 0) {
			toast.error("Star count may not be 0!");
			return;
		}
		if (review.length === 0) {
			toast.error("Don't forget to write a review!");
			return;
		}
		const token = localStorage.getItem("token");
		if (location === undefined) return;
		if (token === null) {
			router.replace("/login");
			return;
		}
		const submitQuery = await fetch(`${process.env.ENDPOINT}/review/add`, {
			method: "POST",
			headers: {
				Authorization: token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				stars: starCount,
				review: review,
				location: location.toUpperCase(),
			}),
		}).catch(() => null);
		if (submitQuery === null) {
			toast.error("Something went wrong");
			return;
		}
		if (submitQuery.status !== 200) {
			toast.error("Failed to submit query");
			return;
		}
		toast.success("Submitted review!");
		window.location.replace(`/location/${location.toLowerCase()}`);
		return;
	}, [location, review, router, starCount]);
	if (
		router.isReady &&
		!["AKAN", "MARSH", "IO", "MASHU"].includes(
			(router.query.place as string).toUpperCase()
		)
	) {
		return <h1 className="text-8xl text-center">INVALID LOCATION QUERY</h1>;
	}

	return (
		<>
			<Head>
				<title>Review - {location}</title>
			</Head>
			<main
				className={
					jakarta.className +
					" min-h-screen w-auto overflow-scroll flex flex-col bg-[url(/background_1.png)] bg-cover bg-center bg-no-repeat bg-origin-border"
				}
			>
				<section className=" bg-[#FFFFFF] flex flex-grow m-16 rounded-2xl p-16 flex-row bg-opacity-70 shadow-xl align-middle justify-between gap-10">
					<div className="flex flex-col align-middle justify-between w-[8rem]">
						<BiSolidQuoteAltLeft size={50} color="white" />
						<Link
							href={`/location/${location}`}
							className="bg-[#B4B4B4] bg-opacity-80 flex flex-row gap-2 align-middle justify-center p-2 rounded-xl shadow-xl"
						>
							<FaArrowLeftLong size={30} color="white" className="my-auto" />
							<span className="my-auto text-xl text-white">Back</span>
						</Link>
					</div>
					<div className="flex flex-grow bg-[#858585] bg-opacity-15 flex-col align-middle justify-center gap-5 text-center p-10 rounded-xl">
						<h1 className="text-4xl">We appreciate your review!</h1>
						<h2 className="text-2xl">Reviewing: {location}</h2>
						<div className="flex flex-row mx-auto">{stars}</div>
						<textarea
							placeholder="Write your review here!"
							maxLength={100}
							minLength={10}
							className="h-[10rem] rounded-xl p-5 shadow-xl"
							value={review}
							onChange={(e) => setReview(e.target.value)}
						></textarea>
						<button
							className="bg-white w-1/2 mx-auto py-5 rounded-xl text-2xl shadow-xl"
							onClick={submit}
						>
							Submit my review!
						</button>
					</div>
					<div className="flex flex-col justify-end  w-[8rem]">
						<BiSolidQuoteAltRight size={50} color="white" className="ml-auto" />
					</div>
				</section>
			</main>
		</>
	);
};

export default Signin;
