import { getBlogList } from "../../server";

export default async function BlogList() {
  const { blogList } = await getBlogList();

  return null;
}
