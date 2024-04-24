import { getBlogList } from "../../server";

// this page is cached despite passing next: { revalidate: 0 }
export default async function BlogList() {
  const { blogList } = await getBlogList();

  return <h1>{blogList?.length}</h1>;
}
