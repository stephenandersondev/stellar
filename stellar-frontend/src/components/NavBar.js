const Navbar = () =>
  <div>
        <NavLink
        to="/"
        exact
        style={link}
        activeStyle={{
            background: 'darkblue'
        }}
        >Home</NavLink>
        <NavLink
        to="/about"
        exact
        style={link}
        activeStyle={{
            background: 'darkblue'
        }}
        >About</NavLink>
        <NavLink
        to="/login"
        exact
        style={link}
        activeStyle={{
            background: 'darkblue'
        }}
        >Login</NavLink>
        <NavLink
        to="/messages"
        exact
        style={link}
        activeStyle={{
            background: 'darkblue'
        }}
        >Messages</NavLink>
    </div>;
