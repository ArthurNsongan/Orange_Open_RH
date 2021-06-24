import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import DataTable from 'react-data-table-component';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {Constant} from "../../config/Constant";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const LinearIndeterminate = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <LinearProgress color="secondary"/>
        </div>
    );
};

export default function DataTableComponent(props) {
    const {
        data,
        loading,
        ...rest
    } = props;
    const {t} = useTranslation();

    return (
        <DataTable
            {...rest}
            data={data}
            progressPending={loading}
            progressComponent={<LinearIndeterminate/>}
            persistTableHead
            noDataComponent={t('common.no_data_table')}
            customStyles={Constant.tableCustomStyles}
            pagination
            selectableRows
            highlightOnHover
            pointerOnHover
            persistTableHead
        />
    );
};


DataTableComponent.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.array
};

DataTableComponent.defaultProps = {
    data: [],
    loading: false
};

