import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useClickOutside } from "../hooks/useClickOutside";
import Button from "./Button";
import styles from "./Header.module.css";

export default function Header() {
  const { user, isLoading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useClickOutside(menuRef, () => setMenuOpen(false));

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    navigate("/");
  };

  const initial = user?.name?.[0]?.toUpperCase() ?? "?";

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          Margin<span>alia</span>
        </Link>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Read
          </Link>

          {!isLoading && user && (
            <Link to="/write" className={styles.navLink}>
              Write
            </Link>
          )}

          {!isLoading && !user && (
            <>
              <Link to="/login" className={styles.navLink}>
                Log in
              </Link>
              <Button size="sm" onClick={() => navigate("/signup")}>
                Sign up
              </Button>
            </>
          )}

          {!isLoading && user && (
            <div className={styles.userMenu} ref={menuRef}>
              <button className={styles.avatarBtn} onClick={() => setMenuOpen((v) => !v)}>
                <span className={styles.avatar}>{initial}</span>
                <span className={styles.name}>{user.name}</span>
              </button>
              {menuOpen && (
                <div className={styles.dropdown}>
                  <Link
                    to="/my-blogs"
                    className={styles.dropdownItem}
                    onClick={() => setMenuOpen(false)}
                  >
                    My blogs
                  </Link>
                  <button className={styles.dropdownItem} onClick={handleLogout}>
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
