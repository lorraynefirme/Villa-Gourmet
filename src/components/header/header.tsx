import { routes } from "@/routes"
import Link from "next/link"

export const Header = () => {

    return   <div className="flex justify-between bg-amber-500 px-9 py-3 mb-3">
    <header>
      <p>Villa Gourmet</p>
    </header>
    <nav>
      <ul className="flex gap-3">
        <li>
          <Link className="cursor-pointer" href={routes.home}>
            Pratos
          </Link>
        </li>
        <li>
          <Link className="cursor-default" href="#">
            Sobre
          </Link>
        </li>
        <li>
          <Link className="cursor-default" href="#">
            Contato
          </Link>
        </li>
      </ul>
    </nav>
  </div>
}