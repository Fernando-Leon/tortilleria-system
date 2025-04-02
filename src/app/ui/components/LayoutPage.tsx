import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const LayoutPage = ({ children }: Props) => {
  return (
    <div className="w-full h-full">
      <div className='w-full p-20 pt-10'>
        {children}
      </div>
    </div>
  )
};  