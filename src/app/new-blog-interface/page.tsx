'use server';

import { getCurrentUser } from '@/src/сlients/userClient';
import NewBlogInterface from '@/src/components/organisms/newBlogInterface';
import { redirect } from 'next/navigation';
import { UserRole } from '@/src/utils/constants';

export default async function NewBlog() {
  const user = await getCurrentUser();

  if (user?.role !== UserRole.ADMIN) {
    redirect('/404');
  } else {
    return <NewBlogInterface />;
  }
}
