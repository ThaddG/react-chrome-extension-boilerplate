import React from 'react';
import ReactDOM from 'react-dom';

export default function Options() {
  return (
    <div>
      <h1>Options Page</h1>
    </div>
  )
}

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<Options />, root);
