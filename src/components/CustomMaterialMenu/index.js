import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import {useHistory} from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArchive, faEdit, faEllipsisV, faTrash} from "@fortawesome/free-solid-svg-icons";
import {deletePostByIdAction, deletePostByIdReset} from "../../redux/api/PostsApi";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";


let route = require('../../utils/route');

function CustomMaterialMenu(props) {
    const {
        row,
        onDeleteRow,
        size,
        deletePostByIdAction,
        deletePostByIdReset,
        firstButtonText,
        secondButtonText,
        thirthButtonText,
        firstButtonAction,
        secondButtonAction,
        thirthButtonAction
    } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    let history = useHistory();
    const {t} = useTranslation();
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteRow = () => {
        deletePostByIdAction(row.rhContentId);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                size={size}
            >
                <FontAwesomeIcon icon={faEllipsisV}/>
            </IconButton>
            <Menu
                id="menu"
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >

                <MenuItem onClick={firstButtonAction}>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faEdit}/>
                    </ListItemIcon>
                    <Typography variant="inherit">
                        {firstButtonText}
                    </Typography>
                </MenuItem>

                {secondButtonText !== "" &&
                <MenuItem onClick={secondButtonAction}>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faArchive}/>
                    </ListItemIcon>
                    <Typography variant="inherit">
                        {secondButtonText}
                    </Typography>
                </MenuItem>
                }
                <Divider/>

                {thirthButtonText !== "" &&
                <MenuItem onClick={thirthButtonAction}>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faTrash}/>
                    </ListItemIcon>
                    <Typography variant="inherit">
                        {thirthButtonText}
                    </Typography>
                </MenuItem>
                }
            </Menu>
        </div>
    );
};

CustomMaterialMenu.propTypes = {
    row: PropTypes.object,
    firstButtonText: PropTypes.string,
    secondButtonText: PropTypes.string,
    thirthButtonText: PropTypes.string,
    firstButtonAction: PropTypes.func,
    secondButtonAction: PropTypes.func,
    thirthButtonAction: PropTypes.func,
};

CustomMaterialMenu.defaultProps = {
    row: {},
    firstButtonText: "",
    secondButtonText: "",
    thirthButtonText: "",
    firstButtonAction: () => {
    },
    secondButtonAction: () => {
    },
    thirthButtonAction: () => {
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    deletePostByIdAction,
    deletePostByIdReset

}, dispatch);

export default connect(null, mapDispatchToProps)(CustomMaterialMenu);

