import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Simple Todo - Your Personal Task Manager" },
    { name: "description", content: "Organize your work with our simple and efficient todo list application" },
  ];
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Simple Todo
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Stay organized and productive with our clean, simple todo list.
          Perfect for managing your daily tasks and work projects.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/todos"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Learn More
          </Link>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-xl">📝</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Easy Task Management</h3>
            <p className="text-gray-600 text-sm">Create, edit, and organize your tasks with a simple interface</p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-xl">✓</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Track Progress</h3>
            <p className="text-gray-600 text-sm">Mark tasks as complete and see your productivity</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 text-xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Stay Focused</h3>
            <p className="text-gray-600 text-sm">Prioritize your tasks and focus on what matters most</p>
          </div>
        </div>
      </div>
    </div>
  );
}
