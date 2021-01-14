const Nav = function({ user, onLogout }) {
  if(!user.isLoggedIn) {
    return null;
  }
  return (
    <nav>
      <ul className="nav">
        <li className="logout"><a href="#logout" onClick={onLogout}>Logout</a></li>
      </ul>
    </nav>
  );
};

export default Nav;
