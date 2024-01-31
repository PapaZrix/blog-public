import prisma from '../../db';
import { getServerSideSitemap } from 'next-sitemap';

export async function getServerSideProps(context) {
  const posts = await prisma.post.findMany();

  const fields = posts.map((post) => ({
    loc: `https://presstointeract.com/${post.slug}`,
    lastmod: post.createdAt.toISOString(),
  }));

  return getServerSideSitemap(context, fields);
}

export default function Site() {}
