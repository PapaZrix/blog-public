import Head from 'next/head';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import FullPost from '../components/post/FullPost';
import Loader from '../components/layout/Loader';
import SimilarPosts from '../components/post/SimilarPosts';
import AuthorInfo from '../components/author/AuthorInfo';
import { getPost } from '../lib/postActions';
import { useRouter } from 'next/router';
import CommentSection from '../components/comment/CommentSection';
import prisma from '../db';

export default function Post() {
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading } = useQuery({
    queryKey: ['post'],
    queryFn: async () => await getPost(slug),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className='loading'>
        <Loader show />
      </div>
    );
  }

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta charSet='utf-8' />
        <title>{data.post.title}</title>
        <meta name='keywords' content={data.post.title} />
        <meta name='description' content={data.post.summary} />
        <meta name='robots' content='index, follow' />
        <meta
          property='og:title'
          content='Press To Interact | Read About Games'
        />
        <meta property='og:description' content={data.post.summary} />
        <meta property='og:image' content={data.post.thumbnail} />
        <meta
          property='og:url'
          content={`https://presstointeract.com/${slug}`}
        />
      </Head>
      <FullPost post={data.post} />
      <AuthorInfo author={data.post.user} />
      <SimilarPosts posts={data.posts} />
      <CommentSection comments={data.comments} postId={data.post?.id} />
    </>
  );
}

export async function getServerSideProps(req) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ['post'],
    async () => await getPost(req.query.slug)
  );

  const post = await prisma.post.findFirst({
    where: { slug: req.query.slug },
  });

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
