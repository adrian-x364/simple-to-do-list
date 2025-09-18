import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - Simple Todo" },
    { name: "description", content: "About our todo application" }
  ];
}

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About</h1>
      <p className="text-gray-600">This is a simple todo application built with React Router.</p>
    </div>
  );
}
