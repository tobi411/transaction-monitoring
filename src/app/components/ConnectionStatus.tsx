'use client';
import React from 'react';
import Spinner from '@/assets/icons/Spinner';
export enum Status {
  Active = 'Active',
  Paused = 'Paused',
}

enum Actions {
  Pause = 'Pause',
  Resume = 'Resume',
}

type Props = {
  isActive: boolean;
  isLoading: boolean;
  onClick: () => void;
};

const ConnectionStatus = ({ isActive, onClick, isLoading }: Props) => {
  return (
    <div className='flex items-center my-4'>
      <button
        className='bg-black hover:bg-gray-800 disabled:bg-gray-800 text-white font-bold py-2 px-4 rounded'
        onClick={() => onClick()}
        // disabled={isLoading}
      >
        {isLoading && (<Spinner />)}
        {isActive ? Actions.Pause : Actions.Resume}
      </button>
      <p className='ml-8 text-base'>
        Connection Status: {isActive ? Status.Active : Status.Paused}
      </p>
    </div>
  );
};

export default ConnectionStatus;
