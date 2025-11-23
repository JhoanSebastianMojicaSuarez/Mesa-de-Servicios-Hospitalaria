import React from 'react';

export default function FormField({ label, children, hint }) {
  return (
    <div style={{marginBottom:12}}>
      {label && <label style={{display:'block',fontWeight:600,marginBottom:6}}>{label}</label>}
      {children}
      {hint && <div style={{marginTop:6,fontSize:13,color:'var(--muted)'}}>{hint}</div>}
    </div>
  );
}
