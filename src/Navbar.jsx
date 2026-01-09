import React from 'react'

const Navbar = () => {
  return (
   <div className="navbar bg-slate-900 text-slate-100 shadow-sm  ">
  
  {/* LEFT SIDE */}
  <div className="navbar-start">
    <a className="btn btn-ghost text-xl text-cyan-400">
  BikeTinder
</a>
  </div>

  {/* RIGHT SIDE */}
  <div className="navbar-end">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="avatar"
            src="https://cdn.bikedekho.com/processedimages/bmw/s1000rr/640X309/s1000rr63944bddea0d4.jpg"
          />
        </div>
      </div>

      <ul
  tabIndex={0}
  className="menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
>
  <li><a>Profile</a></li>
  <li><a>Settings</a></li>
  <li><a className="text-red-400">Logout</a></li>
</ul>
    </div>
  </div>

</div>










  )
}

export default Navbar
