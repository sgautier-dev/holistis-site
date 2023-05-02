import Link from "next/link";
import { BsLinkedin, BsArrowUpSquare } from "react-icons/bs";

function Footer() {
	const today = new Date();
	const year = today.getFullYear().toString();

	return (
		<>
			<div className="flex flex-col sm:flex-row justify-between items-center text-sm bg-blue p-4 sm:sticky sm:bottom-0 drop-shadow-xl z-10 text-white gap-3">
				<p className="" translate="no">
					Copyright &copy; <span>{year}</span>
				</p>
				<Link href="/privacy">
					<p>Confidentialité</p>
				</Link>
				<Link href="https://www.sgautier.dev/" target="_blank">
					<p translate="no">Designed by SG</p>
				</Link>
				<div className="flex items-center gap-4">
				<Link
					href="https://www.linkedin.com/in/borisbenet"
					className="text-center hover:opacity-50"
					target="_blank"
					aria-label="compte linkedin de Boris Benet, Holitis"
				>
					<BsLinkedin size={20} />
				</Link>
				<a href="#" aria-label="back to top">
					<BsArrowUpSquare size={20} />
				</a>
				</div>
			</div>
		</>
	);
}
export default Footer;
