import React, { createContext, useState } from 'react';

interface state1 {
 props1: string;
 props2: number;
}

interface state2 {
  props1: string;
  props2: number;
}

export interface context {
  state1: state1;
  state2: state2;
}

interface children{
  children: JSX.Element
}

const Context1 = createContext({});
function Provider({ children }: children) {
const [state1, setState1] = useState<state1>({props1: "test", props2: 2})

const [state2, setState2] = useState<state2>({props1: "test", props2: 2})

return (
  <Context1.Provider
    value={{state1,setState1,state2,setState2}}
  >
    {children}
  </Context1.Provider>
);

}
const ExportContext = {
  Context1,
  Provider
}

export default ExportContext;