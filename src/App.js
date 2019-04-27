import React from 'react';
import InvestorsTable from './InvestorsTable';

const data = require('./salesInfo.json');

function App() {
  return (
    <div className="App">
      <InvestorsTable data={data}/>
    </div>
  );
}

export default App;
