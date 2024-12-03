'use client';
import React from 'react';

type Props = {
  value: string;
};
const Subheader = ({ value }: Props) => {
  return <div className='font-semibold text-base'>{value}</div>;
};

export default Subheader;
