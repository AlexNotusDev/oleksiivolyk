import type { NextApiRequest, NextApiResponse } from 'next';
import { Blog } from '@/models/Blog';
import { BlogCategory } from '@/enums/BlogCategory';
import { apiMethodsSwitch } from '@/utils/apiMethodsSwitch';
import BlogController from '@/pages/api/blog/controller';

// const posts: Blog[] = [
//   {
//     id: '1qaz',
//     img: 'https://static-00.iconduck.com/assets.00/react-icon-512x456-5xl7nmtw.png',
//     title:
//       'React library React library React library React library React library ',
//     description:
//       'In this article i covered all main points about react, also a lot information about advanced features and how to use them properly',
//     created: new Date(),
//     category: BlogCategory.TECH,
//     tags: ['react', 'SPA', 'front-end'],
//   },
//   {
//     id: '2qaz',
//     img: 'https://i.guim.co.uk/img/media/68cccbf0854e4db038ee78f6d619d3818bd60172/0_346_5184_3110/master/5184.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=e4aae9aa2104e10ec3aeaae863f04a32',
//     title: 'Night in Amsterdam, guide',
//     description:
//       'I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!, I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!, I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!',
//     created: new Date('12/03/2022'),
//     category: BlogCategory.LIFE,
//     tags: ['travel', 'hang-out'],
//   },
//   {
//     id: '2qaz',
//     img: 'https://i.guim.co.uk/img/media/68cccbf0854e4db038ee78f6d619d3818bd60172/0_346_5184_3110/master/5184.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=e4aae9aa2104e10ec3aeaae863f04a32',
//     title: 'Night in Amsterdam, guide',
//     description:
//       'I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!, I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!, I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!',
//     created: new Date('12/03/2022'),
//     category: BlogCategory.LIFE,
//     tags: ['travel', 'hang-out'],
//   },
//   {
//     id: '2qaz',
//     img: 'https://i.guim.co.uk/img/media/68cccbf0854e4db038ee78f6d619d3818bd60172/0_346_5184_3110/master/5184.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=e4aae9aa2104e10ec3aeaae863f04a32',
//     title: 'Night in Amsterdam, guide',
//     description:
//       'I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!, I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!, I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!',
//     created: new Date('12/03/2022'),
//     category: BlogCategory.LIFE,
//     tags: ['travel', 'hang-out'],
//   },
//   {
//     id: '2qaz',
//     img: 'https://i.guim.co.uk/img/media/68cccbf0854e4db038ee78f6d619d3818bd60172/0_346_5184_3110/master/5184.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=e4aae9aa2104e10ec3aeaae863f04a32',
//     title: 'Night in Amsterdam, guide',
//     description:
//       'I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!, I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!, I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!',
//     created: new Date('12/03/2022'),
//     category: BlogCategory.LIFE,
//     tags: ['travel', 'hang-out'],
//   },
//   {
//     id: '2qaz',
//     img: 'https://i.guim.co.uk/img/media/68cccbf0854e4db038ee78f6d619d3818bd60172/0_346_5184_3110/master/5184.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=e4aae9aa2104e10ec3aeaae863f04a32',
//     title: 'Night in Amsterdam, guide',
//     description:
//       'I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!, I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!, I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!',
//     created: new Date('12/03/2022'),
//     category: BlogCategory.LIFE,
//     tags: ['travel', 'hang-out'],
//   },
//   {
//     id: '2qaz',
//     img: 'https://i.guim.co.uk/img/media/68cccbf0854e4db038ee78f6d619d3818bd60172/0_346_5184_3110/master/5184.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=e4aae9aa2104e10ec3aeaae863f04a32',
//     title: 'Night in Amsterdam, guide',
//     description:
//       'I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!, I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!, I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!',
//     created: new Date('12/03/2022'),
//     category: BlogCategory.LIFE,
//     tags: ['travel', 'hang-out'],
//   },
//   {
//     id: '2qaz',
//     img: 'https://i.guim.co.uk/img/media/68cccbf0854e4db038ee78f6d619d3818bd60172/0_346_5184_3110/master/5184.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=e4aae9aa2104e10ec3aeaae863f04a32',
//     title: 'Night in Amsterdam, guide',
//     description:
//       'I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!, I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!, I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!',
//     created: new Date('12/03/2022'),
//     category: BlogCategory.LIFE,
//     tags: ['travel', 'hang-out'],
//   },
//   {
//     id: '2qaz',
//     img: 'https://i.guim.co.uk/img/media/68cccbf0854e4db038ee78f6d619d3818bd60172/0_346_5184_3110/master/5184.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=e4aae9aa2104e10ec3aeaae863f04a32',
//     title: 'Night in Amsterdam, guide',
//     description:
//       'I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!, I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!, I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!',
//     created: new Date('12/03/2022'),
//     category: BlogCategory.LIFE,
//     tags: ['travel', 'hang-out'],
//   },
//   {
//     id: '2qaz',
//     img: 'https://i.guim.co.uk/img/media/68cccbf0854e4db038ee78f6d619d3818bd60172/0_346_5184_3110/master/5184.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=e4aae9aa2104e10ec3aeaae863f04a32',
//     title: 'Night in Amsterdam, guide',
//     description:
//       'I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!, I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!, I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!',
//     created: new Date('12/03/2022'),
//     category: BlogCategory.LIFE,
//     tags: ['travel', 'hang-out'],
//   },
//   {
//     id: '2qaz',
//     img: 'https://i.guim.co.uk/img/media/68cccbf0854e4db038ee78f6d619d3818bd60172/0_346_5184_3110/master/5184.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=e4aae9aa2104e10ec3aeaae863f04a32',
//     title: 'Night in Amsterdam, guide',
//     description:
//       'I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!, I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!, I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!',
//     created: new Date('12/03/2022'),
//     category: BlogCategory.LIFE,
//     tags: ['travel', 'hang-out'],
//   },
//   {
//     id: '2qaz',
//     img: 'https://i.guim.co.uk/img/media/68cccbf0854e4db038ee78f6d619d3818bd60172/0_346_5184_3110/master/5184.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=e4aae9aa2104e10ec3aeaae863f04a32',
//     title: 'Night in Amsterdam, guide',
//     description:
//       'I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!, I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!, I described my experience from Amsterdam, from car parking, and where i lived, to red light street girls visits, and weeds, enjoy!',
//     created: new Date('12/03/2022'),
//     category: BlogCategory.LIFE,
//     tags: ['travel', 'hang-out'],
//   },
// ];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Blog[]>) {
  await apiMethodsSwitch(req, res, BlogController);
}
