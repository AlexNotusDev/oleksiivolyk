import '@/styles/globals.css';
import Checkbox from '@/components/atoms/checkbox';

export default function Home() {
  console.log(process.env);

  return (
    <div className='w-full h-fulloverflow-scroll space-y-4'>
      <div className='bg-white py-2 px-4 rounded-md drop-shadow-lg '>
        Hi &#9996;, welcome on my personal site, currently it&apos;s in progress, features list with statuses
        below.&#128071;
        <br /> If you have any questions, please feel free to write me on{' '}
        <span className='font-medium'> alexnotusdev@gmail.com </span> or in{' '}
        <a
          className='text-blue-700'
          href='https://www.linkedin.com/in/astronotus/'
        >
          LinkedIn
        </a>
      </div>
      {features.map(({ subFeatures, title }) => (
        <Feature
          key={title}
          title={title}
          subFeatures={subFeatures}
        />
      ))}
    </div>
  );
}

const features: Feature[] = [
  { title: 'Authorisation', subFeatures: [{ title: 'Google OAuth authorisation', isAccomplished: true }] },
  {
    title: 'Blog',
    subFeatures: [
      { title: 'Create blog page, with wysiwyg editor, accessible only for admin', isAccomplished: true },
      { title: 'Blogs list, with infinity scroll', isAccomplished: true },
      { title: 'Filter by category', isAccomplished: true },
      { title: 'Filter by input', isAccomplished: true },
      { title: 'Authorised user can subscribe on blog category, and receive updates on email', isAccomplished: false },
      { title: 'Blog tags', isAccomplished: false },
    ],
  },
  {
    title: 'Skills tree',
    subFeatures: [
      { title: 'Admin can create, and edit skills tree', isAccomplished: false },
      { title: 'Admin can add quiz for each skill', isAccomplished: false },
      {
        title: 'User can go through skills tree, authorised user can pass quiz and receive score',
        isAccomplished: false,
      },
    ],
  },
  {
    title: 'Chat widget',
    subFeatures: [{ title: 'User can chat with me in working time, and ask any question', isAccomplished: false }],
  },
];

function Feature({ title, subFeatures }: Feature) {
  return (
    <div className='flex flex-col space-y-2 bg-white py-2 px-4 rounded-md drop-shadow-lg '>
      <h2>{title}</h2>
      <hr />
      {subFeatures.map(({ title, isAccomplished }: SubFeature) => {
        return (
          <div
            className='flex flex-row'
            key={title}
          >
            <Checkbox checked={isAccomplished} />
            {title}
          </div>
        );
      })}
    </div>
  );
}

type Feature = {
  title: string;
  subFeatures: SubFeature[];
};

type SubFeature = {
  isAccomplished: boolean;
  title: string;
};
