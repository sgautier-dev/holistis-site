import Link from "next/link";
import Image from "next/image";
import HamburgerMenu from "./HamburgerMenu";

export default function Header() {
	return (
		<header className=" bg-blue p-6 sticky top-0 drop-shadow-xl z-10">
			<div className="mx-auto flex items-center justify-between gap-1 flex-col sm:flex-row">
				<Link
					href="/"
					className="hover:opacity-80 focus-visible:outline-orange"
				>
					<Image
						className="border-2 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full "
						src="/images/boris-profil-787x787.jpg"
						width={70}
						height={70}
						alt="boris benet photo de profile"
						priority={true}
					/>
				</Link>
				<Link
					href="/"
					className="hover:opacity-80 focus-visible:outline-orange"
				>
					<Image
						src="/images/LogoHolistis-Orange+Violet.gif"
						width={250}
						height={100}
						alt="logo holistis"
						priority={true}
					/>
				</Link>
				<HamburgerMenu />
			</div>
		</header>
	);
}
