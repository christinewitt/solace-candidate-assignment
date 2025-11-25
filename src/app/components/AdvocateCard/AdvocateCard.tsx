import { Advocates } from "@/db/schema";
import styles from "./AdvocateCard.module.css"
import Tag from "../Tag/Tag";

type AdvocateCardProps = {
  advocate: Advocates;
}

export default function AdvocateCard({ advocate }: AdvocateCardProps) {
  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        <h2 className={styles.advocateName}>
          {advocate.firstName} {advocate.lastName}
        </h2>
        <Tag style="secondary" text={advocate.degree} />
      </header>

      <footer className={styles.advocateDetails}>
        <p>
          Years of experience: {advocate.yearsOfExperience} | {advocate.city} | {" "}
          <a href={`tel:${advocate.phoneNumber}`}>{advocate.phoneNumber}</a>
        </p>
      </footer>

      <section className={styles.specialtiesSection}>
        <p className={styles.specialtiesHeader}>Specialties:</p>
        <ul className={styles.specialties}>
          {advocate.specialties.map((specialty) => (
            <li key={specialty}>
              <Tag style="primary" text={specialty} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
