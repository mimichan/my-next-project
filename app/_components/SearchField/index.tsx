"use client";

import Image from 'next/image';
import { useRouter,useSearchParams } from 'next/navigation';
import styles from './index.module.css';
import { Suspense } from 'react';

function SearchFieldComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = e.currentTarget.elements.namedItem("q");
    if(q instanceof HTMLInputElement){
      const params = new URLSearchParams();
      params.set("q", q.value.trim());
      router.push(`/news/search?${params.toString()}`);
    }
  }
  return (
    <form action="" className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="" className={styles.search}>
        <Image
          src='/search.svg'
          alt='検索'
          width={16}
          height={16}
          loading="eager"
        />
        <input
          type="text"
          name="q"
          defaultValue={searchParams.get("q") ?? undefined}
          placeholder="キーワードを入力"
          className={styles.serchInput} />
      </label>
    </form>
  );
}

export default function SearchField() {
  return (
    <Suspense>
      <SearchFieldComponent />
    </Suspense>
  );
}
