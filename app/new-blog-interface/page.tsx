'use server';

import { getCurrentUser } from '@/сlients/userClient';
import NewBlogInterface from '@/components/organisms/newBlogInterface';
import { redirect } from 'next/navigation';
import { UserRole } from '@/utils/constants';

export default async function NewBlog() {
  const user = await getCurrentUser();

  if (user?.role !== UserRole.ADMIN) {
    redirect('/404');
  } else {
    return <NewBlogInterface />;
  }
}
