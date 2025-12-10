import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import {Children, isValidElement, cloneElement, useState} from 'react';
import { Header } from './header';
import Drawer from './drawer';
import "./app.css";


export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [isOpen, setOpen] = useState(false);

  const deleteItem = (item) => {
    setCart(cart.filter(cartItem => {
      return cartItem.inventory_uuid !== item.inventory_uuid;
    }));
  }

  return (
    <div>
      <Header cart={cart} setOpen={setOpen} isOpen={isOpen} />
      <Outlet context={{cart, setCart, deleteItem}} />
      <Drawer deleteItem={deleteItem} cart={cart} setOpen={setOpen} isOpen={isOpen} />
      <div id="drawer-overlay"
          className={`w-full h-full absolute top-0 left-0 z-4 bg-black opacity-75 ${isOpen === true ? "visible" : "invisible"}`}
          onClick={() => setOpen(false)}></div>
    </div>
  );
}

export function ErrorBoundary({ error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
