import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function DataTable({columns, rows}) {

  //cont columns = [{ field: 'id', headerName: 'ID', width: 70 }]
  //const rows = [{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 }]
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 50, 100]}
        checkboxSelection={false}
      />
    </div>
  );
}