import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/dashboard">
                <div className="text-base tracking-wide">Dashboard</div>
              </Link>
            </li>
            <li>
              <Link href="/">
                <div className="text-base tracking-wide">Add progress</div>
              </Link>
            </li>
            <li>
              <Link href="/table">
                <div className="text-base tracking-wide">Table</div>
              </Link>
            </li>
            <li>
              <Link href="/add-users">
                <div className="text-base tracking-wide">Add New User</div>
              </Link>
            </li>
          </ul>
        </div>
        <Link href="/">
          <div className="btn btn-ghost text-xl">Fitness Tracker</div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/dashboard">
              <div className="text-lg tracking-wide">Dashboard</div>
            </Link>
          </li>
          <li>
            <Link href="/">
              <div className="text-lg tracking-wide">Add progress</div>
            </Link>
          </li>
          <li>
            <Link href="/table">
              <div className="text-lg tracking-wide">Table</div>
            </Link>
          </li>
          <li>
            <Link href="/add-users">
              <div className="text-lg tracking-wide">Add New User</div>
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">{/* <a class="btn">Button</a> */}</div>
    </div>
  );
};

export default Navbar;
