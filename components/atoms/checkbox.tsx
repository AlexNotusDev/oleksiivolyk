export default function Checkbox({ checked = false, disabled = false }: CheckboxProps) {
  return (
    <div className='flex items-center mr-2'>
      <input
        checked={checked}
        disabled={disabled}
        id='checkbox'
        type='checkbox'
        className='w-4 h-4 disabled:scale-120'
      />
    </div>
  );
}

type CheckboxProps = { checked?: boolean; disabled?: boolean };
