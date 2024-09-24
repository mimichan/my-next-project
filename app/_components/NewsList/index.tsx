import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import Category from "../Category";
import Date from "../Date";
import { News } from "@/app/_libs/microcms";



type Props = {
  news: News[];
};

export default function NewsList({ news }: Props) {
  if (news.length === 0) {
    return <p>ニュースはありません。</p>;
  }
  return (
    <ul>
      {news.map((article) => (
        <li key={article.id} className={styles.list}>
          <Link href={`/news/${article.id}`} className={styles.link}>
            <div className={styles.link}>
              {article.thumbnail ? (
                <Image
                  className={styles.image}
                  src={article.thumbnail.url}
                  width={article.thumbnail.width}
                  height={article.thumbnail.height}
                  alt=""
                />
              ) : (
                <Image
                  className={styles.image}
                  src="/no-image.png"
                  width={1200}
                  height={630}
                  alt="No Image"
                />
              )}
              <dl className={styles.content}>
                <dt className={styles.title}>
                  {article.title}
                </dt>
                <dd className={styles.meta}>
                  <Category category={article.category} />
                  <Date date={article.publishedAt ??
                    article.createdAt} />
                </dd>
              </dl>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
