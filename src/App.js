import './App.css';
import Data from "./oa.json";
import React, { useMemo } from "react";
import BarChart from './component/BarChart';
import { useTable, useSortBy } from 'react-table';

function App() {
    const data = useMemo(() => Data, []);
    const columns = useMemo(() => [
      {
        Header: "Name",
        accessor: "person.name",
      },
      {
        Header: "Age",
        accessor: "person.age",
      },
      {
        Header: "Disease",
        accessor: "person.disease",
      },
      {
        Header: "Duration",
        accessor: "person.duration_of_suffering",
      },
      {
        Header: "Treatment",
        accessor: "person.treatment",
      }

    ], [] );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
    }, useSortBy);

    return (
      <div className="App">
        <div className='container'>
          <div className="chart-container=">
          <div style={{ width: 400 }}>
            <BarChart chartData={{
              labels: data.map((data) => data.person.age),
              datasets: [
                {
                  label: "Age",
                  data: data.map((data) => data.person.age),
                  backgroundColor: [
                    "Pink",
                    "Blue",
                    "Orange",
                    "Green",
                    "Purple",
                    "Black",
                    "Yellow",
                    "Red",
                    "Indigo",
                    "Violet",

                  ],
                  borderColor: "black",
                  borderWidth: 1,
                },
              ],
            }} />
            </div>
          </div>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (column.isSortedDesc ? '⬇' : '⬆') : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default App;
