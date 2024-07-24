import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>JWT Library POC</h1>
      <p>
        You&apos;ve sucessfully started the POC application for JWT library in Next.js. There are
        two API routes in this project that use the `jwt-library`:
      </p>

      <h2>Steps</h2>
      <div className={styles.description}>
        <p>
          1. If you try to access the API route{' '}
          <code className={styles.code}>GET /api/secure/info</code> without a valid JWT token,
          you&apos;ll get a 401 Unauthorized response.
        </p>
        <p>
          2. Generate a JWT token by calling API <code className={styles.code}>POST /api/auth</code>{' '}
          with a request data containing <code className={styles.code}>`user`</code> and{' '}
          <code className={styles.code}>`ttl`</code> (optional).
        </p>
        <p>
          3. Usign the generated token, call the API{' '}
          <code className={styles.code}>GET /api/secure/info</code> with the token in the
          Authorization header.
        </p>
        <p>4. You&apos;ll be able to access the endpoint successfully.</p>
        <p>
          5. Now, If you try to access the API route{' '}
          <code className={styles.code}>GET /api/secure/info</code> with an invalid JWT token,
          you&apos;ll get a 401 Unauthorized response.
        </p>
      </div>
    </main>
  );
}
