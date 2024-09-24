import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <dl>
        <dt className={styles.title}>ページが見つかりません。</dt>
          <dd className={styles.text}>
            あなたがアクセスしようとしたページは存在しません。<br />
            URLを再度ご確認の上、もう一度お試しください。
          </dd>
      </dl>
    </div>
  );
}
