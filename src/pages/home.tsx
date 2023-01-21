import React from 'react';
import { useContext } from 'react';
import ExportContext , {context} from '../contexts/UserContext';

function Home() {
  const context = useContext(ExportContext.Context1) as context

  return (
    <div>
      <h1 className='text-5xl font-semibold text-center'>welcome on home</h1>
      <div className='flex flex-col items-center'>
      <h2>{context.state1.props1}</h2>
      <h2>{context.state1.props2}</h2>
      <h2>{context.state2.props1}</h2>
      <h2>{context.state2.props2}</h2>
      </div>
    </div>
  );
}

export default Home;
