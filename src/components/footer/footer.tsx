import Link from "next/link"

export const Footer = () => {
    return  <footer className="flex md:flex-row gap-3 md:gap-0 flex-col md:h-4 fixed bottom-0 left-0 z-20 w-full p-4 h-20
     bg-white border-t border-gray-200 shadow-sm md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
    <a
      href="tel:+553199456465"
      aria-label="Ligar para o número (31) 99456-465"
    >
      Contato: (31) 99999-9999
    </a>

    <ul className="flex gap-3">
      <li>
        <Link className="cursor-default" href="#">
          Instagram
        </Link>
      </li>
      <li>
        <Link className="cursor-default" href="#">
          Facebook
        </Link>
      </li>
    </ul>
  </footer>
}
