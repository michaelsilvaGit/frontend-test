import Link from "next/link";



export function Header() {

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 w-full max-w-7xl mx-auto">
        <div className="text-2xl font-semibold tracking-wide">
          <Link href='/clients' className="hover:text-blue-500 transition-colors duration-300">
            Teste Sinka
          </Link>
        </div>

        <nav>
          <ul className="flex items-center space-x-6 md:space-x-12">
            <li>
              <Link href='/clients' className="hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-all duration-300 shadow-md">
                Clientes
              </Link>
            </li>
            <li>
              <Link href='/clients/new/' className="hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-all duration-300 shadow-md">
                Novo cliente
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>

  )
}