import Image from 'next/image';
import Link from 'next/link';
import styles from './not-found.module.css';

export default function Custom404() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Image
          src="/sad-pikachu.jpg"
          alt="Sad Pikachu"
          width={300}
          height={300}
          className={styles.image}
        />
        <h1 className={styles.title}>404 - Page Not Found</h1>
        <p className={styles.description}>
          Oops! It looks like you wandered too far into the tall grass...
        </p>
        <Link href="/" className={styles.homeButton}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
}