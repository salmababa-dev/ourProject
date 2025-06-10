import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

export default function GuestLayout() {
  return (
    <>
      <header className="bg-white shadow-md">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-2xl font-extrabold text-indigo-600">
            <Link to="/">MyApp</Link>
          </div>
          <ul className="flex space-x-8">
            {[
              { to: '/', label: 'Home' },
              { to: '/login', label: 'Login' },
             
            ].map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `relative text-gray-700 font-medium transition-colors duration-300
                    hover:text-indigo-600
                    ${isActive ? 'text-indigo-600' : ''}`
                  }
                >
                  {label}
                  {/** Barre horizontale sous l’élément actif */}
                  {({ isActive }) =>
                    isActive ? (
                      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-indigo-600 rounded-full"></span>
                    ) : null
                  }
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="container mx-auto p-8">
        <Outlet />
      </main>

     
    </>
  );
}
