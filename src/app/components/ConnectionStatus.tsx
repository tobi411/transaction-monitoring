import React from 'react';

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
};

const ConnectionStatus = ({ isActive }: Props) => {
  return (
    <div className='flex items-center my-4'>
      <button className='bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded'>
        {isActive ? Actions.Pause : Actions.Resume}
      </button>
      <p className='ml-8 text-base'>Connection Status: {isActive ? Status.Active : Status.Paused}</p>
    </div>
  );
};

export default ConnectionStatus;
