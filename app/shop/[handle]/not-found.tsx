import Link from "next/link";
import styles from "@/components/ShopPage.module.css";

export default function ShopNotFound() {
  return (
    <section className={`container ${styles.missing}`}>
      <h1>Piece not found</h1>
      <Link href="/shop">Back to shop</Link>
    </section>
  );
}
