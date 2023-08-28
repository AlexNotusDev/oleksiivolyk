import dateFormat from 'dateformat';

export default function Date({ date, mask = 'longDate' }: { date: Date; mask?: string }) {
  return <span className='text-gray-500 text-sm '>{dateFormat(date, mask)} </span>;
}
