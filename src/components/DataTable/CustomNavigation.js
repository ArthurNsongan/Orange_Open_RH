import React from "react";
import PropTypes from "prop-types";
import * as TableUtil from "./TableUtils";

function TablePaginationActions({ count, page, rowsPerPage, onChangePage }) {
    const handleFirstPageButtonClick = () => {
        onChangePage(1);
    };

    // RDT uses page index starting at 1, MUI starts at 0
    // i.e. page prop will be off by one here
    const handleBackButtonClick = () => {
        onChangePage(page);
    };

    const handleNextButtonClick = () => {
        onChangePage(page + 2);
    };

    const handleLastPageButtonClick = () => {
        onChangePage(TableUtil.getNumberOfPages(count, rowsPerPage));
    };

    return (
        <>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                <FirstPageIcon />
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= TableUtil.getNumberOfPages(count, rowsPerPage) - 1}
                aria-label="next page"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= TableUtil.getNumberOfPages(count, rowsPerPage) - 1}
                aria-label="last page"
            >
                <LastPageIcon />
            </IconButton>
        </>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const CustomMaterialPagination = ({
                                      rowsPerPage,
                                      rowCount,
                                      onChangePage,
                                      onChangeRowsPerPage,
                                      currentPage,
                                  }) => (
    <TablePagination
        component="nav"
        count={rowCount}
        rowsPerPage={rowsPerPage}
        page={currentPage - 1}
        onChangePage={onChangePage}
        onChangeRowsPerPage={({ target }) =>
            onChangeRowsPerPage(Number(target.value))}
        ActionsComponent={TablePaginationActions}
    />
);

CustomMaterialPagination.propTypes = {
    rowsPerPage: PropTypes.number.isRequired, // calculated rows per page state from DataTable
    rowCount: PropTypes.number.isRequired, // calculated row count from DataTable
    onChangePage: PropTypes.func.isRequired, // you want to "callback" the updated page number to DataTable so it can update its state
    onChangeRowsPerPage: PropTypes.func.isRequired, // you want to "callback" the updated rows per (newRowsPerPage, currentPage) to DataTable so it can update its state
    currentPage: PropTypes.number.isRequired, // the current page state from DataTable
};
