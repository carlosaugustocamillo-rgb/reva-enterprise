import React from './react.js';
import htm from 'https://esm.sh/htm@3.1.1?dev';

export const html = htm.bind(React.createElement);
