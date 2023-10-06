import React, { useState } from 'react';
import FileUpload from './FileUpload';
import TableView from './TableView';

const App: React.FC = () => {
  const [tables, setTables] = useState<any[]>([]);

  const handleUpload = (data: any[]) => {
    setTables(data);
  };

  return (
    <div style={{marginLeft: '1vw'}}>
      <h1>Employee pairs</h1>
      {tables.length ? <TableView tableView={tables} /> : <FileUpload onUpload={handleUpload} />}
    </div>
  );
};

export default App;
