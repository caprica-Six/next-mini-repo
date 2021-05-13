import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>Static image test</p>
        <p>Image ref: "/images/test.jpg"</p>
        <p>Does not render when deployed</p>
        <Image
          alt="Vercel logo"
          src="/images/test.jpg"
          width={50}
          height={50}
        />
      </main>
    </div>
  );
}
