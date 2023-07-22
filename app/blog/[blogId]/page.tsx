'use server';

import blogClient from '@/сlients/blogClient';
import draftToHtml from 'draftjs-to-html';
import Date from '@/components/atoms/date';
import BlogAdminPanel from '@/components/molecules/blogAdminPanel';

export default async function Blog({ params }: { params: { blogId: string } }) {
  console.log('Blog params:', params);
  const { blogId } = params;
  console.log('Blog id: ', blogId);
  const res = await blogClient.getBlogById(blogId);
  console.log('Blog response:', res);
  const { body, title, createdAt } = res;
  const htmlConverted = draftToHtml(body);

  console.log('htmlConverted:', htmlConverted);

  return (
    <div className='bg-white p-4 drop-shadow-md rounded-md'>
      <div className='mb-2'>
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
