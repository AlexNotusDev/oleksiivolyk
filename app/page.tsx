import { Metadata } from 'next';
import '@/styles/globals.css';

export default function Home() {
  return (
    <div className='w-full bg-white h-full rounded-md drop-shadow-lg p-6 overflow-scroll text-start '>
      <p className='text-2xl text-center'>Welcome !!!</p>
      <br />
      As a full-stack software developer i decided to make my own site from scratch using experience which i gained
      during my career. <br /> <br />
      <p className='text-xl  text-center'>GOALS</p> <br />
      <ol className='list-decimal list-inside'>
        <li>Simplify employers or customers get to know more about me, and my experience.</li>
        <li>Share with world my life and work stories.</li>
        <li>Playground for developing my skills</li>
      </ol>
      <br />
      <p className='text-xl text-center '>TECH STACK</p> <br />
      Next.js, TypeScript, PostgreSQL, AWS <br /> <br />
      <p className='text-xl text-center'>FEATURES</p> <br />
      <ul className='list-inside list-disc'>
        <li>PROFILE - Wou can read about me, my soft and hard skills.</li>
        <li>BLOG - I going to post stories from my life, and tech articles.</li>
        <li>
          FEEDBACK - You can look in feedbacks wat people leaved for me, and leave your feedback too if have something
          (authorisation required)
        </li>
        <li>QUIZZES - Quiz builder, for refresh knowledge</li>
      </ul>
    </div>
  );
}
