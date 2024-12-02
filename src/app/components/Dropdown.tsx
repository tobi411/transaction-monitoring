import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

type DropdownOption = {
  label: string;
  value: any;
  id: string;
};

interface DropdownProps {
  value?: string;
  label: string;
  options: DropdownOption[];
  onClick: (value: string) => void;
}

export default function Dropdown({
  label,
  value = '',
  options,
  onClick,
}: DropdownProps) {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div className='w-52'>
        <label htmlFor='dropdown-button' className='font-bold text-sm'>
          {label}
        </label>
        <MenuButton
          id='dropdown-button'
          className='inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 
        shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
        >
          <div>{value}</div>
          <ChevronDownIcon
            aria-hidden='true'
            className='-mr-1 size-5 text-gray-400 '
          />
        </MenuButton>
      </div>

      {options?.length > 0 && (
        <MenuItems
          transition
          className='absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition 
          focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 
          data-[enter]:ease-out data-[leave]:ease-in max-h-56 overflow-y-auto cursor-pointer'
        >
          <div className='py-1'>
            {options?.map((option) => (
              <MenuItem>
                <div
                  key={`dropdown-option-${option.id}`}
                  onClick={() => onClick(option.value)}
                  className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none'
                >
                  {option.label}
                </div>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      )}
    </Menu>
  );
}
