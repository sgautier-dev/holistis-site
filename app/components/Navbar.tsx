import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
	return (
		<nav className=" bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
			<div className="mx-auto flex justify-between flex-col sm:flex-row">
				<Link href="/" className="hover:opacity-80">
					<Image
						className="border-2 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full"
						src="/images/boris-profil.jpg"
						width={70}
						height={70}
						alt="boris benet photo de profile"
						priority={true}
					/>
				</Link>
				<Link href="/" className="hover:opacity-80">
					<Image
						src="/images/LogoHolistis-Orange+Violet.gif"
						width={300}
						height={100}
						alt="logo holistis"
						priority={true}
					/>
				</Link>
                <p>MENU</p>
			</div>
		</nav>
	);
}
