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
      <article className={styles.hero}>
        <div className={styles.imageContainer}>
          <Image
            src="/images/select-house-couple.svg"
            alt="couple searching for their dream place"
            width={720}
            height={10}
          />
        </div>

        <div className={styles.textContainer}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>IN/VCNITY</h1>
            <span className={styles.titleUnderline}></span>
          </div>
          <p className={styles.text}>The place to find your place</p>
          <ActionButton />
        </div>
      </article>
      <article className={styles.about}>
        <div className={styles.contentContainer}>
          {/** ----- First item ----- */}
          <div className={styles.itemWrapper} style={{ alignItems: 'center' }}>
            <div className={styles.imageContainer}>
              <Image
                src="/images/for-sale-cropped.svg"
                alt="Real Estate on Sale"
                width={520}
                height={10}
              />
            </div>
            <div className={styles.textWrapperRight}>
              <div className={styles.textRightContainer}>
                <div className={styles.titleContainer}>
                  <h3 className={styles.secondaryTitle}>
                    Store your Real Estate findings
                  </h3>
                  <span className={styles.secondaryTitleUnderline}></span>
                </div>
                <p className={styles.text}>
                  Ever come across that perfect property, only to forget the
                  details later? With our website, you can save your searches,
                  favorite listings, and property notes all in one secure place.
                  No more lost gems or time wasted retracing your steps. Find
                  your dream home faster with your personalized real estate
                  portfolio at your fingertips.
                </p>
              </div>
            </div>
          </div>

          {/** ----- Second item ----- */}
          <div className={styles.itemWrapper}>
            <div className={styles.textWrapperLeft}>
              {/** --- Arrow --- */}
              <span className={styles.arrowLeft}>
                <span className={styles.topLeftPoint}></span>
                <span className={styles.bottomRightPoint}></span>
              </span>

              <div className={styles.textLeftContainer}>
                <div className={styles.titleContainer}>
                  <h3 className={styles.secondaryTitle}>
                    Paid them a visit and update your data
                  </h3>
                  <span className={styles.secondaryTitleUnderline}></span>
                </div>
                <p className={styles.text}>
                  Don&apos;t let outdated information hold you back. After
                  touring a property, quickly mark it as &quot;visited&quot; on
                  our platform. This helps you keep track of your progress and
                  avoid revisiting the same places. Update notes, add
                  impressions, and rate your experience to personalize your
                  search journey and make informed decisions.
                </p>
              </div>
            </div>

            <div className={styles.imageContainer}>
              <Image
                src="/images/realtor-visit.svg"
                alt="Couple visiting a Real Estate on Sale"
                width={520}
                height={10}
              />
            </div>
          </div>

          {/** ----- Third item ----- */}
          <div className={styles.itemWrapper}>
            <div className={styles.imageContainer}>
              <Image
                src="/images/house-at-hand.svg"
                alt=""
                width={520}
                height={10}
              />
            </div>
            <div className={styles.textWrapperRight}>
              {/** --- Arrow --- */}
              <span className={styles.arrowRight}>
                <span className={styles.topRightPoint}></span>
                <span className={styles.bottomLeftPoint}></span>
              </span>

              {/** --- Text Content --- */}
              <div className={styles.textRightContainer}>
                <div className={styles.titleContainer}>
                  <h3 className={styles.secondaryTitle}>
                    Keep all the relevant information close at hand
                  </h3>
                  <span className={styles.secondaryTitleUnderline}></span>
                </div>
                <p className={styles.text}>
                  Stay organized and informed throughout your real estate
                  journey. Our platform stores property brochures, agent contact
                  details, market trends, and any other relevant information
                  alongside your saved listings. No more digging through emails
                  or scattered notes. Access everything you need, whenever you
                  need it, for a seamless and stress-free experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/** --- Complementario INFO section --- */}
      <article className={styles.contact}>
        <div className={styles.contentContainer}>What is IN/VCNITY?</div>
      </article>
    </>
  );
}
export default Home;
