export default function HamburgerMenu() {
	return (
		<button
			id="hamburger-button"
			className="relative h-8 w-8 cursor-pointer text-3xl md:text-4xl lg:text-5xl"
			aria-label="bouton menu"
			// onClick={toggleMenu}
		>
			<span className="absolute top-4 right-0 -mt-0.5 h-1 w-8 rounded hover:opacity-50 bg-orange transition-all duration-500 before:absolute before:h-1 before:w-8 before:-translate-x-4 before:-translate-y-3 before:rounded before:bg-orange before:transition-all before:duration-500 before:content-[''] after:absolute after:h-1 after:w-8 after:-translate-x-4 after:translate-y-3 after:rounded after:bg-orange after:transition-all after:duration-500 after:content-['']"></span>
		</button>
	);
}
