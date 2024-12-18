import { XMarkIcon, ArrowPathIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';

export default function Banner() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className='relative isolate flex items-center gap-x-6 overflow-hidden bg-red-500 px-6 py-2.5 sm:px-3.5 sm:before:flex-1'>
      <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
        <p className='text-sm/6 text-gray-900'>
          <strong className='font-semibold'>Error</strong>
          <svg
            viewBox='0 0 2 2'
            aria-hidden='true'
            className='mx-2 inline size-0.5 fill-current'
          >
            <circle r={1} cx={1} cy={1} />
          </svg>
          Request to get accounts failed.
        </p>
        <a
          href='#'
          onClick={() => window.location.reload()}
          className='flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900'
        >
          Try again <ArrowPathIcon aria-hidden='true' className='inline size-5 text-white' /> 
        </a>
      </div>
      <div className='flex flex-1 justify-end'>
        <button
          type='button'
          className='-m-3 p-3 focus-visible:outline-offset-[-4px]'
          onClick={() => setIsOpen(false)}
        >
          <span className='sr-only'>Dismiss</span>
          <XMarkIcon aria-hidden='true' className='size-5 text-gray-900' />
        </button>
      </div>
    </div>
  );
}
