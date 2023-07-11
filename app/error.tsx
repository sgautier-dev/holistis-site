"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
					Quelque chose a mal tourné !
				</h1>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<button
						className="mt-4 flex-none rounded-md bg-orange px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
						onClick={
							// Attempt to recover by trying to re-render the segment
							() => reset()
						}
					>
						Réessayer
					</button>
				</div>
			</div>
		</div>
	);
}
