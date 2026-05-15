import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <Link to="/admin" style={{ textDecoration: "none", color: "inherit" }}>
        <p>© 2026 MJ Crew</p>
       
      </Link>
    </footer>
  );
}

export default Footer;