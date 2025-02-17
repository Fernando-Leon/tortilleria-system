import { ReactNode } from 'react';
import Navbar from './Navbar';

type Props = {
  children: ReactNode;
};

export const LayoutPage = ({ children }: Props) => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className='w-full p-6'>
        {children}
      </div>
    </div>
  )
};  