import React from 'react';

export const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  className = '',
  children,
}) => <div className={'rounded-3xl border bg-white p-6 shadow-sm ' + className}>{children}</div>;
