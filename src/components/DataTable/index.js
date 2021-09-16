import { faSearch, faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../LoadingSpinner'

const _ = require("lodash")
function DataTable(props) {

    const { columns, datas, emptyMessage, children, className, rowClassName, cellClassName, headerClassName } = props

    const [loaded, setLoaded] = useState(props.loaded)

    const [tableHeadFilter, setTableHeadFilter] = useState({ ascending : true, column:""})

    const handleTableHeadFilter = (name) => {
        let tableHeadFilterTmp =  { ...tableHeadFilter}
        if(tableHeadFilterTmp.column === name) {
            tableHeadFilterTmp.ascending = !tableHeadFilterTmp.ascending
        } else {
            tableHeadFilterTmp.column = name
            tableHeadFilterTmp.ascending = true
        }
        setTableHeadFilter(tableHeadFilterTmp)
        // alert(name)
    }

    useEffect(() => {
        setLoaded(props.loaded)
    }, [props])

    // const [searchKey, setSearchKey] = useState("")

    // let datasToShow = searchKey !== "" ? datas.filter( item => (item.name.toLowerCase().includes(searchKey.toLowerCase()) ) ) : datas
    let datasToShow = tableHeadFilter.ascending ? 
        _.sortBy(datas, (item) => { return item[tableHeadFilter.column]})
        : _.sortBy(datas, (item) => { return item[tableHeadFilter.column]}).reverse();

    return (
        <>
            {/* <div className="row">
                        <div className="col-lg-4">
                            <div className="d-flex align-items-center mb-3 text-dark">
                                <FontAwesomeIcon icon={faSearch} className="d-inline-block me-2"/>
                                <input className="form-control" onChange={(e)=>{ setSearchKey(e.target.value) }} placeholder="Rechercher" />
                            </div>
                        </div>
                    </div> */}
            <table className="Admin__Table px-0">
                    <thead>
                        <tr>
                            {/* <th scope="col">#</th>
                            <th scope="col" width="300px">Nom</th>
                            <th scope="col" width="400px">Description</th>
                            <th scope="col">Etat du projet</th>
                            <th scope="col">Date de fin des contributions</th>
                            <th scope="col" width="100px">Actions</th> */}
                            { columns.map ( item => (
                                item.sortable === undefined || item.sortable === true ? 
                                    <th scope="col" onClick={() => { handleTableHeadFilter(item.dataTitle) }}>
                                        <span 
                                            className={`d-block ${tableHeadFilter.column === item.dataTitle ? "dropdown-toggle" :""} ${tableHeadFilter.ascending === false ? "return" : ""}`}
                                            >{item.title}{ tableHeadFilter.column !== item.dataTitle ? 
                                                <span className="ps-1"><FontAwesomeIcon
                                                icon={faSort} /></span> : "" }
                                        </span>
                                    </th>
                                //     <th scope="col" onClick={() => { handleTableHeadFilter(item.dataTitle) }}>
                                //     <span 
                                //         className={`d-block`}>{item.title}<FontAwesomeIcon 
                                //             icon={ tableHeadFilter.column !== item.dataTitle ? 
                                //                 faSort : ( tableHeadFilter.ascending === true ? faSortDown : faSortUp ) } /></span>
                                // </th>
                                : <th scope="col">{item.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loaded === false ?
                            (
                                <tr>
                                    <td colSpan={columns.length} className="text-center py-4"><LoadingSpinner /></td>
                                </tr>
                            )
                            : 
                            (
                                datasToShow.length > 0 ? datasToShow.map((item, index) => (
                                    <tr key={index}>
                                        {/* <th scope="col">#</th>
                                        <td width="300px">{item.title}</td>
                                        <td width="400px">{item.description}</td>
                                        <td>{_.capitalize(item.status.replaceAll("_"," ")) }</td>
                                        <td>Date de fin des contributions</td>
                                        <td width="100px">Actions</td> */}
                                        { columns.map ((colItem, colIndex) => (
                                            typeof(colItem.renderData) === "function" ? 
                                            <td>{colItem.renderData(item, index)}</td> : (
                                            colIndex === 0 ? <th scope="col">{ item[colItem.dataTitle] }</th> : <td>{ item[colItem.dataTitle] }</td> )
                                        ))}
                                    </tr>
                                )):
                                <tr>
                                    <td className="text-center" colSpan="6">{ emptyMessage === undefined ? "No Data" : emptyMessage}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                
        </>
    )
}

export default DataTable
