'use client';

import { useMemo, useRef, useState } from 'react';
import Input from '@/components/atoms/input';
import { LayoutStyle } from '@/utils/constants';
import getUUID from '@/utils/uuid';
import OptionsList from '@/components/atoms/optionsList';
import SelectedOptionsList from '@/components/atoms/selectedOprionsList';
import VerticalSelectList from '@/components/atoms/verticalSelectList';
import Dialog from '@/components/molecules/dialog';

const MINIMUM_INPUT_LENGTH = 2;

export default function SearchSelect({
  options,
  selectEvent,
  searchEvent,
  placeholder,
  canAddNew = false,
  style,
}: SearchSelectProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [selected, setSelected] = useState<SelectOption[]>([]);
  const [selectedIDs, setSelectedIDs] = useState<Set<string>>(new Set());
  const [isSelectConfirmed, setIsSelectConfirmed] = useState<boolean>(false);
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  const [newOptionsTitles, setNewOptionsTitles] = useState<Set<string>>(new Set());
  const [isOptionsLoading, setIsOptionsLoading] = useState<boolean>(false);

  const inputElement = useRef<HTMLInputElement>(null);

  function handleInput(value: string) {
    setInputValue(value);
    if (value.length) {
      setIsShowDropdown(true);
    } else if (!selected.length) {
      setIsShowDropdown(false);
    }

    setIsOptionsLoading(true);
    searchEvent(value).then(() => setIsOptionsLoading(false));
  }

  const filteredOptions = useMemo(() => options.filter(({ id }) => !selectedIDs.has(id)), [options, selectedIDs]);
  const isOptionsHasInput = useMemo(
    () => options.some(({ title }) => title.toLowerCase() === inputValue.toLowerCase()),
    [options, inputValue],
  );

  function handleSelect(option: SelectOption) {
    setSelected((prev) => {
      if (!selectedIDs.has(option.id)) {
        return prev.concat(option);
      } else {
        return prev;
      }
    });
    setSelectedIDs((prev: Set<string>) => {
      const newSet = new Set(prev);
      newSet.add(option.id);
      return newSet;
    });
    cleanAndFocusInput();
  }

  function commit() {
    selectEvent(selected);
    setIsSelectConfirmed(true);
    setIsShowDropdown(false);
  }

  function deleteFromSelected(deleteId: string, title: string) {
    setSelected((prev) => prev.filter(({ id }) => id !== deleteId));
    setSelectedIDs((prev: Set<string>) => {
      const newSet = new Set(prev);
      newSet.delete(deleteId);
      return newSet;
    });
    setNewOptionsTitles((prev: Set<string>) => {
      prev.delete(title);
      return prev;
    });

    if (!inputValue) {
      searchEvent('');
    }
  }

  function handleEditSelected() {
    setIsSelectConfirmed(false);
    setIsShowDropdown(true);
  }

  async function addOption() {
    const newOption = { id: await getUUID(), title: inputValue, isNew: true };
    setSelected((prev) => prev.concat(newOption));
    setNewOptionsTitles((prev: Set<string>) => prev.add(inputValue));
    cleanAndFocusInput();
  }

  function cleanAndFocusInput() {
    setInputValue('');
    if (inputElement && inputElement.current) {
      inputElement.current.value = '';
    }
    inputElement?.current?.focus();
  }

  return (
    <div className='relative z-10'>
      {isSelectConfirmed && selected.length ? (
        <OptionsList
          options={selected}
          style={style}
          clickEvent={handleEditSelected}
        />
      ) : (
        <Input
          changeEvent={handleInput}
          style={style}
          placeholder={placeholder}
          reference={inputElement as unknown as HTMLInputElement}
          debounceMS={1000}
        />
      )}
      {isShowDropdown && (
        <div className={`w-full max-h-40 absolute mt-2 left-0 z-20`}>
          {!!selected.length && (
            <Dialog
              content={
                <SelectedOptionsList
                  selected={selected}
                  deleteClick={deleteFromSelected}
                />
              }
              buttonClickEvent={commit}
              buttonTitle='OK'
            />
          )}

          {!!filteredOptions.length && (
            <VerticalSelectList
              options={filteredOptions}
              selectEvent={handleSelect}
            />
          )}

          {canAddNew &&
            inputValue.length > MINIMUM_INPUT_LENGTH &&
            !newOptionsTitles.has(inputValue) &&
            !isOptionsHasInput &&
            !isOptionsLoading && (
              <Dialog
                content={<span>There is no such option yet...</span>}
                buttonClickEvent={addOption}
                buttonTitle='Add'
              />
            )}
        </div>
      )}
    </div>
  );
}

type SearchSelectProps = {
  options: SelectOption[];
  selectEvent: (values: SelectOption[]) => void;
  searchEvent: (input: string) => Promise<void>;
  placeholder: string;
  style: LayoutStyle;
  canAddNew?: boolean;
};

export type SelectOption = {
  id: string;
  title: string;
  isNew?: boolean;
};
