// @ts-nocheck
import { parse, format, isAfter, isBefore, differenceInDays } from 'date-fns'

const formattedDate = 'yyyy-MM-dd'
const dateRegex1 = /^\d{2}([./-])\d{2}\1\d{4}$/ // format MM/DD/YYYY or MM-DD-YYYY
const dateRegex2 = /^\d{2}([./-])\d{2}\1\d{2}$/ // format MM/DD/YY or MM-DD-YY

export function formatDate(date: any) {
  let year, month, day

  if (date.match(dateRegex1)) {
    const separator = date.includes('-') ? '-' : '/'
    date = date.split(separator)
    year = date[2]
    month = date[0]
    day = date[1]
    date = year + separator + month + separator + day
  }

  if (date.match(dateRegex2)) {
    const separator = date.includes('-') ? '-' : '/'
    date = date.split(separator)
    year = 20 + date[2]
    month = date[0]
    day = date[1]
    date = year + separator + month + separator + day
  }
  const fDate = format(new Date(date), formattedDate)
  return fDate
}

function calkCommonPeriod(data: any) {
  const startDate1 = parse(data[0].DateFrom, formattedDate, new Date())
  const endDate1 = parse(data[0].DateTo, formattedDate, new Date())
  const startDate2 = parse(data[1].DateFrom, formattedDate, new Date())
  const endDate2 = parse(data[1].DateTo, formattedDate, new Date())

  let commonStartDate, commonEndDate

  if (isAfter(startDate1, startDate2)) {
    commonStartDate = startDate1
  } else {
    commonStartDate = startDate2
  }

  if (isBefore(endDate1, endDate2)) {
    commonEndDate = endDate1
  } else {
    commonEndDate = endDate2
  }

  if (
    isBefore(commonStartDate, commonEndDate) ||
    commonStartDate.toString() === commonEndDate.toString()
  ) {
    const start = format(commonStartDate, formattedDate)
    const end = format(commonEndDate, formattedDate)
    console.log(`Common Period: ${start} to ${end}`)
    return differenceInDays(new Date(end), new Date(start))
  } else {
    console.log('There is no common period')
    return 0
  }
}

function difference(emp1: number, emp2: number, projectId: string, data: any) {
  const common = data.filter(
    (project: { ProjectID: number; EmpID: number }) =>
      project.ProjectID === projectId &&
      (project.EmpID === emp1 || project.EmpID === emp2)
  )
  return calkCommonPeriod(common)
}

export function longestPair(data) {
  const obj = {}

  for (const el of data) {
    if (!obj[el.ProjectID]) {
      obj[el.ProjectID] = [el.EmpID]
    } else {
      obj[el.ProjectID].push(el.EmpID)
    }
  }

  const arrsPerProject = Object.entries(obj).filter((el) => el[1].length > 1)
  let longestPeriod = {
    project: null,
    employee1: null,
    employee2: null,
    period: 0,
  }
  for (const pair of arrsPerProject) {
    for (let i = 0; i < pair[1].length - 1; i++) {
      for (let j = i + 1; j < pair[1].length; j++) {
        const diff = difference(pair[1][i], pair[1][j], pair[0], data)
        if (diff > longestPeriod.period) {
          longestPeriod = {
            project: pair[0],
            employee1: pair[1][i],
            employee2: pair[1][j],
            period: diff,
          }
        }
      }
    }
  }
  return longestPeriod
}
