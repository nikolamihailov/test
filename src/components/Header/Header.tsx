import Navigation from "../Navigation/Navigation";

function Header() {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 999 }}>
      <Navigation />
    </header>
  );
}

export default Header;
