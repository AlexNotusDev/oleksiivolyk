'use server';

import blogClient from '@/сlients/blogClient';
import draftToHtml from 'draftjs-to-html';
import Date from '@/components/atoms/date';
import BlogAdminPanel from '@/components/molecules/blogAdminPanel';

export default async function Blog({ params }: { params: { blogId: string } }) {
  const { blogId } = params;
  const res = await blogClient.getBlogById(blogId);
  const { body, title, createdAt } = res;
  const htmlConverted = draftToHtml(body);

  return (
    <div className='bg-white h-full p-4 drop-shadow-md rounded-md overflow-scroll'>
      <div>
        <div className='flex flex-row justify-between'>
          <h1>{title}</h1>
          <BlogAdminPanel id={blogId} />
        </div>
        <Date date={createdAt} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: htmlConverted }}></div>
    </div>
  );
}
