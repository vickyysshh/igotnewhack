import {ResponsiveContainer} from 'recharts';

// Recharts otherwise starts with -1 x -1 until its ResizeObserver fires.
// A positive initial size prevents invalid first-frame dimensions on route changes.
export const StableChart=({children,...props})=>(
  <ResponsiveContainer initialDimension={{width:480,height:260}} minWidth={1} minHeight={1} {...props}>
    {children}
  </ResponsiveContainer>
);