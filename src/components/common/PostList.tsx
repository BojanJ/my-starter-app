import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Shadcn Card components
import { Skeleton } from '@/components/ui/skeleton'; // Shadcn Skeleton

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function fetchPosts(): Promise<Post[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5'); // Fetch limited posts
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

const PostList: React.FC = () => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery<Post[], Error>({
    queryKey: ['posts'], // Unique key for this query
    queryFn: fetchPosts,
    // Optional: Customize behavior for this specific query
    staleTime: 1000 * 60 * 10, // Override global staleTime for 10 minutes
  });

  if (isLoading) {
    return (
      <div className='space-y-4'>
        <Skeleton className='h-8 w-64' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-5/6' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-4/5' />
      </div>
    );
  }

  if (isError) {
    return <div className='text-red-500'>Error: {error?.message}</div>;
  }

  return (
    <div>
      <button
        onClick={() => refetch()}
        className='mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
        Refresh Posts
      </button>
      <h2 className='text-2xl font-semibold mb-4'>
        Latest Posts {isFetching ? '(Fetching...)' : ''}
      </h2>
      <div className='space-y-4'>
        {posts?.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{post.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PostList;
