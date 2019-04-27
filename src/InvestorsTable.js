import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './InvestorsTable.css';

const numFormatter = (cell) => {
  let parts = parseFloat(cell).toString().split('.');
  if (parts.length == 2) parts = parseFloat(cell).toFixed(3).split('.')
  parts[0] = parts[0].replace(/(.)(?=(\d{3})+$)/g,'$1,');
  const formatted = parts.join('.');
  return (
    <span>{formatted}</span>
  )
}

const columns = [
  {
    dataField: 'address',
    text: 'Address',
    align: 'left',
    filter: textFilter(),
    headerClasses: 'address-header',
    classes: 'address-column'
  },
  {
    dataField: 'rank.byVestingPerDay',
    text: 'Rank/Vesting',
    headerClasses: 'rank-headers'
  },
  {
    dataField: 'vestingPerDay',
    text: 'Vesting/Day',
    formatter: numFormatter,
    sort: true,
    headerClasses: 'token-headers'
  },
  {
    dataField: 'rank.byTotalAmount',
    text: 'Rank/Total',
    headerClasses: 'rank-headers'
  },
  {
    dataField: 'total',
    text: 'Total',
    formatter: numFormatter,
    sort: true,
    headerClasses: 'token-headers'
  },

  {
    dataField: 'investmentUnfold.183',
    text: '6 Months',
    formatter: numFormatter,
    headerClasses: 'token-headers',
    hidden: true
  },
  {
    dataField: 'investmentUnfold.365',
    text: '1 Years',
    formatter: numFormatter,
    headerClasses: 'token-headers',
    hidden: true
  },
  {
    dataField: 'investmentUnfold.730',
    text: '2 Years',
    formatter: numFormatter,
    headerClasses: 'token-headers',
    hidden: true
  },
  {
    dataField: 'investmentUnfold.1095',
    text: '3 Years',
    formatter: numFormatter,
    headerClasses: 'token-headers',
    hidden: true
  }
];

const vestingPeriod = {
  '183': '6 Months',
  '365': '1 Year',
  '730': '2 Years',
  '1095': '3 Years',
}

const expandRow = {
  renderer: row => {
    return (
      <div style={{textAlign: 'left'}}>
        <div>
          <span>Vesting Detail</span>
        </div>
        {row.investment.map(inv => {
          return (
            <div>
              <span>{vestingPeriod[inv.vestingPeriod]}: </span>
              {numFormatter(inv.amount)}
            </div>
          )
        })}
      </div>
    )
  },
  showExpandColumn: true,
  expandByColumnOnly: true,
  expandHeaderColumnRenderer: ({ isAnyExpands }) => isAnyExpands ? <b>-</b> : <b>+</b>,
  expandColumnRenderer: ({ expanded }) => expanded ? <b>-</b> : <b>...</b>
};

const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>Component as Header</h3>;

class InvestorsTable extends Component {
  render() {
    return (
      <BootstrapTable
        keyField='id'
        bootstrap4={true}
        caption={<CaptionElement />}
        data={ this.props.data }
        columns={ columns }
        filter={ filterFactory() }
        expandRow={ expandRow }
        striped
        bordered
        hover
        condensed
      />
    )
  }
}

export default InvestorsTable;
// class InvestorsTable extends Component {
//   render() {
//     const data = require('./salesInfo.json');
//
//     const columns = [
//       {
//         Header: 'Address',
//         accessor: 'address', // String-based value accessors!
//         minWidth: 210
//       },
//       {
//         id: 'vestingPerDay',
//         Header: 'Vesting/Day',
//         accessor: d => parseFloat(parseFloat(d.vestingPerDay).toFixed(2)), // Custom value accessors!
//         minWidth: 60
//       },
//       {
//         Header: 'Vesting',
//         accessor: 'vesting-group',
//         columns: [{
//             Header: 'Total',
//             accessor: 'total',
//             minWidth: 60
//           },{
//             id: '6Mvesting',
//             Header: "6 Months", // Custom header components!
//             accessor: d => d.investmentUnfold['183'],
//             minWidth: 60
//           },{
//             id: '1Yvesting',
//             Header: "1 year", // Custom header components!
//             accessor: d => d.investmentUnfold['365'],
//             minWidth: 60
//           },{
//             id: '2Yvesting',
//             Header: "2 years", // Custom header components!
//             accessor: d => d.investmentUnfold['730'],
//             minWidth: 60
//           },{
//             id: '3Yvesting',
//             Header: "3 years", // Custom header components!
//             accessor: d => d.investmentUnfold['1095'],
//             minWidth: 60
//           }
//         ]
//       },
//     ]
//
//     return <ReactTable
//       data={data}
//       columns={columns}
//     />
//   }
// }
//
// export default InvestorsTable;
