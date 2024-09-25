
import { createClient } from 'microcms-js-sdk';
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from "microcms-js-sdk";
import { constrainedMemory } from 'process';

export type Member = {
  name: string;
  position: string;
  profile: string;
  image: MicroCMSImage;
} & MicroCMSListContent;

export type Category = {
  name: string;
} & MicroCMSListContent;


export type News = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category: Category;
} & MicroCMSListContent;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is not defined");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is not defined");
}

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export const getMembersList = async (queries?: MicroCMSQueries) => {
  const ListData = await client
    .getList<Member>({
      endpoint: "members",
      queries,
    });
  return ListData;
}

export const getNewsList = async (queries?: MicroCMSQueries) => {
  const ListData = await client
    .getList<News>({
      endpoint: "news",
      queries,
    });
  return ListData;
}

export const getNewsDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const DetailData = await client
    .getListDetail<News>({
      endpoint: "news",
      contentId,
      queries,
      customRequestInit: {
        next: {
          revalidate: queries?.draftKey === undefined ? 60 : 0,
        }
      }
    });
  return DetailData;
}

export const getCategoryDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const DetailData = await client
    .getListDetail<Category>({
      endpoint: "categories",
      contentId,
      queries,
    });
  return DetailData;
};

export const getAllNewsList = async () => {
  const listData = await client
    .getAllContents<News>({
      endpoint: 'news',
    });

  return listData;
};

export const getAllCategoryList = async () => {
  const listData = await client
    .getAllContents<Category>({
      endpoint: 'categories',
    });

  return listData;
};
