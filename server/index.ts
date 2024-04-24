import "server-only";
import { blogFetcher } from "./fetch";

export const getBlogList = async (params?: {
  [key: string]: string | string[];
}): Promise<{ blogList: any; totalBlog: number }> => {
  try {
    const { res, data } = await blogFetcher({
      url: "posts",
      noCache: true,
      params,
    });

    if (res?.ok) {
      return {
        blogList: data,
        totalBlog: data?.length,
      };
    } else {
      console.error("getBlogList api try block err:", data?.message);
    }
  } catch (err: any) {
    console.error("getBlogList api catch block err:", err?.message);
  }

  return {
    blogList: [],
    totalBlog: 0,
  };
};

export const getSingleBlog = async (params: {
  [key: string]: string | string[];
}): Promise<{ blog: any | null }> => {
  try {
    const { res, data } = await blogFetcher({
      url: "posts",
      params,
      isIsr: true,
    });

    if (res?.ok) {
      return {
        blog: data?.length ? data[0] : null,
      };
    } else {
      console.error("getSingleBlog api try block err:", data?.message);
    }
  } catch (err: any) {
    console.error("getSingleBlog api catch block err:", err?.message);
  }

  return {
    blog: null,
  };
};
