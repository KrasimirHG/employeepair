import React from 'react'
import { formatDate, longestPair } from './utils'

const TableView: React.FC<{ tableView: any[] }> = ({ tableView }) => {
  const tables = tableView.filter((el) => Object.entries(el).length === 4) // validate all needed columns persist
  if (!tables.length) {
    return <h3>Sorry, incorrect file format. Some column is missing</h3>
  }
  let dateFormattedTables
  try {
    dateFormattedTables = tables.map((table) => {
      const DateTo = table.DateTo.toLowerCase()
      const isDateTo: boolean = DateTo && DateTo !== 'null'
      table.DateFrom = formatDate(table.DateFrom)
      table.DateTo = isDateTo
        ? formatDate(table.DateTo)
        : formatDate(new Date().toISOString())
      return table
    })
  } catch (e) {
    return <h3>Sorry, can not convert provided dates</h3>
  }

  const findThePair = longestPair(dateFormattedTables)
  const { project, employee1, employee2, period } = findThePair

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Employee ID </th>
            <th>Project ID </th>
            <th>Date from </th>
            <th>Date to </th>
          </tr>
        </thead>
        <tbody>
          {dateFormattedTables.map((table, index) => {
            return (
              <tr key={index}>
                <td>{table['EmpID']}</td>
                <td>{table['ProjectID']}</td>
                <td>{table['DateFrom']}</td>
                <td>{table['DateTo']}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {period ? 
      <h4>{`The pair working longest time together is employee ${employee1} and employee ${employee2} over project ${project} for ${period} days`} </h4>
      : <h4>There is no pair working together on the same time </h4>}
    </div>
  )
}

export default TableView
