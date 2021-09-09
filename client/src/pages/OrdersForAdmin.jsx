import React, { Component, useState} from 'react'
import ReactTable, {useRowSelect} from "react-table-6"; 
import 'react-dropdown/style.css';
import "react-table-6/react-table.css" 
import download from 'downloadjs';
import axios from 'axios'; 
import "react-table-6/react-table.css" 
import api from '../components/api/index'
import userApi from '../components/api/userApi'
import dateFormat from 'dateformat';
import Tabs from './Tabs';
import styled from 'styled-components'
import { BorderBottom } from '@material-ui/icons';
import AuthService from "../services/authService";
import { CSVLink, CSVDownload } from "react-csv";
import { ExportToCsv } from 'export-to-csv';
import ReactTooltip from "react-tooltip";

import { API_URL } from './url';

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
    margin-top: 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`
const Download = styled.div`
    color: #3f30cf;
    cursor: pointer;
`
const columns = [
    {
        Header: '',
        accessor: '',
        Cell: function(props) {
            return (
                <span>
                    <DeleteOrder id={props.original._id} />
                </span>
            )
        },
    },
    {
        Header: '',
        accessor: '',
        Cell: function(props) {
            return (
                <span>
                    <UpdateOrder id={props.original._id} />
                </span>
            )
        },
    },
    {
        Header: 'Price 1',
        accessor: 'price1',
        filterable: true,
        minWidth: 100,
        resizable: true,
    
    },
    {
        Header: 'Price 2',
        accessor: 'price2',
        filterable: true,
        minWidth: 100,
        resizable: true,
        

    },
    {
        Header: 'Grant',
        accessor: 'grant',
        filterable: true,
        minWidth: 120,
        resizable: true,
        
    },
    {
        Header: 'Milestone',
        accessor: 'milestone',
        filterable: true,
        minWidth: 120,
        resizable: true,
        
    },
    {
        Header: 'Submission',
        accessor: 'submission',
        filterable: true,
        minWidth: 120,
        resizable: true,
        
    },
    {
        Header: 'Ordered By',
        accessor: 'orderMadeBy',
        filterable: true,
        minWidth: 150,
        resizable: true,
    },
    {
        Header: 'Requested Date',
        accessor: 'requestDay',
        filterable: true,
        minWidth: 140,
        resizable: true,

    },
    {
        Header: 'Needed By',
        accessor: 'dateUI',
        filterable: true,
        minWidth: 140,
        resizable: true,

        
    },
    {
        Header: 'Vendor 1',
        accessor: 'vendor1',
        filterable: true,
        minWidth: 230,
        resizable: true,
    },

    {
        Header: 'Vendor 2',
        accessor: 'vendor2',
        filterable: true,
        minWidth: 230,
        resizable: true,
    },
    {
        Header: 'Category',
        accessor: 'category',
        filterable: true,
        minWidth: 150,
        resizable: true,
    },
    {
        Header: 'Catalog 1',
        accessor: 'catalog1',
        filterable: true,
        minWidth: 150,
        resizable: true,
    },
    {
        Header: 'Catalog 2',
        accessor: 'catalog2',
        filterable: true,
        minWidth: 150,
        resizable: true,
    },
    {
        Header: 'Item Amount',
        accessor: 'numberOfItems',
        filterable: true,
        minWidth: 120,
        resizable: true,
    },
    {
        Header: 'Item Description',
        accessor: 'description',
        filterable: true,
        minWidth: 200,
        resizable: true,
    },

    {
        Header: 'Notes',
        accessor: 'notes',
        filterable: true,
        minWidth: 250,
        Cell: (row) => {
            return <span data-tip={row.value}>{row.value}</span>;
        }
    
        
    },
    {
        Header: 'Status',
        accessor: 'statusUI',
        filterable: true,
        minWidth: 150,
        resizable: true,

    },
    {
        Header: 'Is File Needed',
        accessor: 'msdFileUI',
        filterable: true,
        minWidth: 150,
        resizable: true,
    },

    {
        Header: 'Files',
        accessor: '',
        Cell: function(props) {
            return (
                <span>
                   <DownloadOrder id={props.original._id} numOfFiles = {props.original.numberOfFiles}/>
                </span>
            )
        },
    },

]

class UpdateOrder extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/orders/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>
        <button className="btn" id="button" style = {{backgroundColor: '#a88532'}}>Update</button>
        </Update>
    }
}

class NoteDetails extends Component {
    updateUser = event => {
        event.preventDefault()
    }

    render() {
        return <Update onClick={this.updateUser}>
        <button className="btn" id="button" style = {{backgroundColor: '#a88532'}}>Update</button>
        </Update>
    }
}

class DeleteOrder extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete this order permanently?`,
            )
        ) {
            api.deleteOrderById(this.props.id)
            
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>
        <button className="btn" id="button" style = {{backgroundColor: '#fc036f'}}>Delete</button>
        </Delete>
    }
}

class DownloadOrder extends Component {
    downloadOrder = async event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to download the order?`,
            )
        ) {
            if (this.props.numOfFiles == 1){
                const result =  await axios.get(`${API_URL}/downloadFiles/${this.props.id}`, {
                    responseType: 'blob'
                });
                const downloadName = `${Date.now()}.pdf`;
                download(result.data, downloadName, 'application/pdf');

            }
            else{
                const result =  await axios.get(`${API_URL}/download/${this.props.id}`, {
                    responseType: 'blob'
                });
                const downloadName = `${Date.now()}`;
                download(result.data, downloadName, 'application/octet-stream');
            }

        }
    }

    render() {
        if (this.props.numOfFiles == 0){        
            return <Delete >No File</Delete>
        }
        else{
            return <Download onClick={this.downloadOrder}>Download</Download>
        }
        
    }
}
class OrdersForAdmin extends Component {
    constructor(props) {
        super(props)
        this.download = this.download.bind(this);
        this.reactTable = React.createRef();
        this.state = {
            orders: [],
            columns: [],
            isLoading: false,
            dataToDownload: []
        }
        
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllOrdersForAdmin().then(orders => {
            this.setState({
                orders: orders.data.data,
                isLoading: false,
            })
        })
    }
    getTrProps = (state, rowInfo, colInfo, instance) => {
          return {
            style: {
              background: '#e1eef2',
            }
          }
      }
      download = async (event) => {
        const currentRecords = this.reactTable.getResolvedState().sortedData;
        var data_to_download = []
        for (var index = 0; index < currentRecords.length; index++) {
           let record_to_download = {}
           for(var colIndex = 2; colIndex < columns.length-1 ; colIndex ++) {
                record_to_download[columns[colIndex].Header] = currentRecords[index][columns[colIndex].accessor]
           }
           data_to_download.push(record_to_download)
        }
        this.setState({ dataToDownload: data_to_download }, () => {
           this.csvLink.link.click()
           this.csvLink.link.click()
        })
      } 
      filterCaseInsensitive(filter, row) {
        const id = filter.pivotId || filter.id;
       
        if (row[id] != undefined || row[id] ===''){
            if (Number.isInteger(row[id])){
                const item = row[id].toString();
                return String(item.toLowerCase()).startsWith(filter.value.toLowerCase());
            }
            return String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase());
        }
        else{
            return true;
        }

        
    }
    render() {
        const { orders, isLoading } = this.state
        const onChangeFct = () => console.log("onChange usually handled by redux");
        
        let showTable = true
        if (!orders.length) {
            showTable = false
        }

        return (
            <div>
            <div>
                <Wrapper>
                <button onClick={this.download} style= {{marginLeft: '40px'}, {float: 'left'}}>
                   Export CSV File
               </button>
                <h1 style = {{marginBottom: '30px'}}>New Orders</h1>
                {showTable && (
                <div>
                <ReactTooltip place="right" />
                <ReactTable
                    
                    data={orders}
                    columns={columns}
                    loading={isLoading}
                    defaultPageSize={25}
                    showPageSizeOptions={true}
                    minRows={0}
                    onPageSizeChange={() => {
                        ReactTooltip.rebuild();
                    }}
                    getTrProps={this.getTrProps}
                    ref={(r) => this.reactTable = r}
                    filterable
                    defaultFilterMethod={(filter, row) => this.filterCaseInsensitive(filter, row) }
                />

                </div>

                )}
            </Wrapper>
            </div>
            <div>
               <CSVLink
                   data={this.state.dataToDownload}
                   filename="data.csv"
                   className="hidden"
                   ref={(r) => this.csvLink = r}
                   target="_blank"/>

            </div>
            </div>
        )
    }
}

export default OrdersForAdmin