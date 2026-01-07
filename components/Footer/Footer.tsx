import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Left */}
        <div className={styles.left}>
          <div className={styles.brand}>Your Company Name</div>
          <div className={styles.copy}>
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>

        {/* Right */}
        <div className={styles.right}>
          <a href="#">Privacy Policy</a>
          <span className={styles.dot}>•</span>
          <a href="#">Terms of Service</a>
          <span className={styles.dot}>•</span>
          <a href="#">Support</a>
        </div>
      </div>
    </footer>
  );
}

