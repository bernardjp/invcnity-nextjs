import { Metadata } from 'next';
import Image from 'next/image';
import styles from './style.module.css';
import ActionButton from './components/LandingPage/ActionButton';

export const metadata: Metadata = {
  title: 'IN/VCNITY',
  description: 'One place, all your future vicinities.',
};

function Home() {
  return (
    <>
      <article className={`${styles.hero} ${styles.wrapper}`}>
        <div className={styles.image_container}>
          <Image
            src="/images/select-family.svg"
            alt="couple searching for their dream place"
            width={720}
            height={10}
          />
        </div>

        <div className={styles.text_container}>
          <div className={styles.title_container}>
            <h1 className={styles.title}>IN/VCNITY</h1>
            <span className={styles.title_underline}></span>
          </div>
          <p className={styles.text}>The place to find your place</p>
          <ActionButton />
        </div>
      </article>
      <article className={`${styles.about} ${styles.wrapper}`}>
        <div className={styles.content_container}>What is IN/VCNITY?</div>
      </article>
      {/* <article className={styles.contact_wrapper}> */}
      <article className={`${styles.contact} ${styles.wrapper}`}>
        <div className={styles.content_container}>What is IN/VCNITY?</div>
      </article>
    </>
  );
}
export default Home;
