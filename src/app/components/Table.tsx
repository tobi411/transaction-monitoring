'use client';
import React from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

const columnStyles =
  'flex-1 p-3 self-center text-left border-r border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis';

type Column = {
  id: string, label: string
}

type VirtualizedTableProps = {
  rows: any[];
  columns: Column[]
  height: number;
  rowHeight: number;
  width: number | string;
};

// Virtualized Table component
const VirtualizedTable = ({
  rows,
  columns,
  height,
  rowHeight,
  width,
}: VirtualizedTableProps) => {

  // Header component
  const Header = () => (
    <div className='bg-gray-200 font-bold flex border-b border-gray-300 text-left'>
      {columns.map((col) => (
        <div key={col.id} className={columnStyles}>
          {col.label}
        </div>
      ))}
    </div>
  );

  // Row renderer
  const Row = ({ index, style, data }: ListChildComponentProps) => {
    const row = data[index];
    return (
      <div
        style={style}
        className={
          'bg-white align-center flex border-b border-gray-300 text-center'
        }
      >
        {columns.map((col) => (
          <div key={col.id} className={columnStyles}>
            {row[col.id]}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='border rounded-lg overflow-hidden border-gray-200 mt-2'>
      <Header />
      <List
        height={height}
        itemCount={rows.length}
        itemSize={rowHeight}
        width={width}
        itemData={rows}
      >
        {Row}
      </List>
    </div>
  );
};

export default VirtualizedTable;
