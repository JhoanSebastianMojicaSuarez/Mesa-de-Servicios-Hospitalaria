import React from 'react';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const classes = `btn ${variant === 'secondary' ? 'secondary' : ''} ${className}`.trim();
  return (
    <button className={classes} {...props}>{children}</button>
  );
}
