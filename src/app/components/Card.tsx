'use client';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Card = ({ children }: Props) => {
  return (
    <div className='w-100 px-6 py-4 rounded-lg shadow-lg mb-4 mr-4 bg-white'>
      {children}
    </div>
  );
};

export default Card;
