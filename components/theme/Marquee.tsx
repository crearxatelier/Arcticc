import styles from "./Marquee.module.css";

const items = [
  "100% cold-pressed",
  "4.9★ from 2,400+ reviews",
  "Next-day cold delivery",
  "Subscribe & save 15%",
  "Plant-powered botanicals",
  "No syrup · No fillers",
];

export function Marquee() {
  const loop = [...items, ...items];
  return (
    <div className={styles.bar} aria-label="Trust signals">
      <div className={styles.track}>
        {loop.map((item, i) => (
          <span key={`${item}-${i}`}>
            {item}
            <i aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
