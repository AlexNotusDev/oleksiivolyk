'use client';

import Button from '@/src/components/atoms/button';
import blogClient from '@/src/сlients/blogClient';
import { useContext } from 'react';
import { User } from '@prisma/client';
import { UserContext } from '@/src/utils/userProvideComponent';
import { UserRole } from '@/src/utils/constants';
import { useRouter } from 'next/navigation';

export default function BlogAdminPanel({ id }: { id: string }) {
  const user = useContext<User | null>(UserContext);
  const router = useRouter();

  function redirectToPage() {
    router.push(`/blog`);
  }

  async function deleteBlog() {
    await blogClient.deleteBlog(id);

    redirectToPage();
  }

  return (
    <div className='flex flex-col justify-center'>
      {user && user.role == UserRole.ADMIN && (
        <Button
          text='Delete'
          styles='bg-red-500 h-6 w-20 text-white ml-2'
          clickEvent={deleteBlog}
        />
      )}
    </div>
  );
}
