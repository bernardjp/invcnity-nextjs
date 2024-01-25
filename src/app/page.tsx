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
          <p className={styles.text}>
            Tame the Real Estate Maze. Organize, track, and conquer your search.
            <br></br>
            <strong>IN/VCNITY</strong> is the place to find your place!
          </p>
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
      <article className={styles.usersComments}>
        <span className={styles.wave}>
          <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#ff6d60"
              fillOpacity="1"
              d="M0,60L80,65C160,70,320,80,480,73.3C640,67,800,43,960,33.3C1120,23,1280,27,1440,26.7C1600,27,1760,23,1920,21.7C2080,20,2240,20,2400,30C2560,40,2720,60,2880,71.7C3040,83,3200,87,3360,83.3C3520,80,3680,70,3840,56.7C4000,43,4160,27,4320,31.7C4480,37,4640,63,4800,65C4960,67,5120,43,5280,43.3C5440,43,5600,67,5760,76.7C5920,87,6080,83,6240,70C6400,57,6560,33,6720,35C6880,37,7040,63,7200,70C7360,77,7520,63,7680,58.3C7840,53,8000,57,8160,53.3C8320,50,8480,40,8640,31.7C8800,23,8960,17,9120,25C9280,33,9440,57,9600,66.7C9760,77,9920,73,10080,61.7C10240,50,10400,30,10560,23.3C10720,17,10880,23,11040,31.7C11200,40,11360,50,11440,55L11520,60L11520,100L11440,100C11360,100,11200,100,11040,100C10880,100,10720,100,10560,100C10400,100,10240,100,10080,100C9920,100,9760,100,9600,100C9440,100,9280,100,9120,100C8960,100,8800,100,8640,100C8480,100,8320,100,8160,100C8000,100,7840,100,7680,100C7520,100,7360,100,7200,100C7040,100,6880,100,6720,100C6560,100,6400,100,6240,100C6080,100,5920,100,5760,100C5600,100,5440,100,5280,100C5120,100,4960,100,4800,100C4640,100,4480,100,4320,100C4160,100,4000,100,3840,100C3680,100,3520,100,3360,100C3200,100,3040,100,2880,100C2720,100,2560,100,2400,100C2240,100,2080,100,1920,100C1760,100,1600,100,1440,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
            ></path>
          </svg>
        </span>

        <div className={styles.contentContainer}>
          <div className={styles.commentsContainer}>
            <blockquote className={styles.blockquote}>
              <p className={styles.quote}>
                <strong>Finally</strong> a real estate site that remembers my
                searches and <strong>helps me stay organized!</strong>
              </p>
              <cite className={styles.cite}>Jorge B.</cite>
            </blockquote>
            <blockquote className={styles.blockquote}>
              <p className={styles.quote}>
                <strong>Love</strong> being able to update property info after
                visits - <strong>makes my search so much easier!</strong>
              </p>
              <cite className={styles.cite}>Mónica G.</cite>
            </blockquote>
            <blockquote className={styles.blockquote}>
              <p className={styles.quote}>
                <strong>All the info I need in one place</strong> - listings,
                notes, brochures, even market trends!
                <strong> A lifesaver</strong>
              </p>
              <cite className={styles.cite}>JP B.</cite>
            </blockquote>
          </div>

          <div className={styles.imageContainer}>
            <Image
              src="/images/ok-animate.svg"
              alt="Happy customer!"
              width={520}
              height={10}
            />
          </div>
        </div>
      </article>
    </>
  );
}
export default Home;
