import { currentYear } from "../utils/format";

export function Footer() {
  return (
    <footer className="footer container">
      <p className="copyright">
        &copy; <span>{currentYear}</span> billal ben
      </p>
    </footer>
  );
}
