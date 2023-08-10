import { Metadata } from 'next';
import styles from './styles.module.css';

export const metadata: Metadata = {
  title: 'IN/VCNITY',
  description: 'One place, all your future vicinities.',
};

function Home() {
  return (
    <main className={styles.main}>
      <h1>IN/VCNITY</h1>
    </main>
  );
}
export default Home;
