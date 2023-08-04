export default function ButtonOption({
  options,
  name,
  value,
  changeEvent,
  wrapperStyles,
  inputStyles,
}: ButtonOptionProps) {
  return (
    <div className={wrapperStyles}>
      {options.map((option) => (
        <label key={option.value}>
          <input
            type='radio'
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => changeEvent(option.value)}
            className={inputStyles}
          />
          {option.value}
        </label>
      ))}
    </div>
  );
}

type ButtonOptionProps = {
  options: { value: string }[];
  name: string;
  value: string;
  changeEvent: (value: string) => void;
  wrapperStyles: string;
  inputStyles: string;
};
