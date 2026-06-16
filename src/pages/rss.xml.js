import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../config";
import { getCollection } from "astro:content";
import createSlug from "./../lib/createSlug";

export async function GET(context) {
  const blog = await getCollection("publications");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: import.meta.env.SITE,
    items: blog.map((post) => {
      // `pubDate` is a string; "under review" entries have no real date.
      const parsed = new Date(post.data.pubDate);
      return {
        title: post.data.title,
        ...(isNaN(parsed.getTime()) ? {} : { pubDate: parsed }),
        description: post.data.description,
        link: `/publications/${createSlug(post.data.title, post.id)}/`,
      };
    }),
  });
}
