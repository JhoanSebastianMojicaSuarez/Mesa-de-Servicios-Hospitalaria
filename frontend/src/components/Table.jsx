import React from 'react';

export default function Table({ columns = [], data = [] }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((c, i) => <th key={i}>{c}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((c, i) => <td key={i}>{row[c] ?? ''}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
