import dateFormat from 'dateformat';

export default function Date({ date }) {
  return (
    <span className='text-gray-500 text-sm '>
      {dateFormat(date, 'longDate')}{' '}
    </span>
  );
}
