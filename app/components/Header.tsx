import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink
            to="/"
            className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            Simple Todo
          </NavLink>

          <nav className="flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/todos"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              Todos
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              About
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
