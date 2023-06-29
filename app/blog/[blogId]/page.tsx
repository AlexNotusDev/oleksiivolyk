'use server';

import blogClient from '@/сlients/blogClient';
import draftToHtml from 'draftjs-to-html';
import Date from '@/components/atoms/date';

export default async function Post({ params }: { params: { blogId: string } }) {
  const { blogId } = params;
  const res = await blogClient.getBlogById(blogId);
  const { body, title, createdAt } = res;
  const htmlConverted = draftToHtml(body);

  return (
    <div className='bg-white p-4 drop-shadow-md rounded-md'>
      <div className='mb-2'>
        <h1>{title}</h1>
        <Date date={createdAt} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: htmlConverted }}></div>
    </div>
  );
}
