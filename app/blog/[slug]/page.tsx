import { getSingleBlog } from "../../../server";

export default async function Home({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { blog } = await getSingleBlog({
    slug,
  });

  return <h1>Blog Detailed Page</h1>;
}
