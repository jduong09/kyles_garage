import { Header } from "../header";
import { Landing } from "../landing/landing";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (<div>
    <Header />
    <Landing />
  </div>);
}
