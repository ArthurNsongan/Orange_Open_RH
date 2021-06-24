import React, {useState, useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {postCommentAction, postCommentReset} from "../../redux/api/CommentApi";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {bindActionCreators} from 'redux';
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {Constant} from "../../config/Constant";
import * as Utils from "../../utils";

function CommentField(props) {
    const {
        postID
    } = props;
    const {t} = useTranslation();
    let history = useHistory();
    const [comment, setComment] = useState('');
    const [isStartWriting, setIsStartWriting] = useState(false);

    useEffect(() => {
        if (props.result !== null) {
            toast.dark(t('comment.add_new_success'), {
                position: "top-right",
                autoClose: Constant.toastDelay,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            history.go(0);
        }
    }, [props]);

    const onSubmitComment = (event) => {
        event.preventDefault();
        console.log(comment);
        if (comment !== "") {
            props.postCommentAction({
                commentContent: comment,
                rhContentId: parseInt(props.postID),
                userId: Utils.getUserConnected().userId
            });
        }
    };
    return (
        <form className="mb-3" onSubmit={onSubmitComment}>
            <div className="form-group">
                <label htmlFor="commentField"
                       className={`${comment === "" && isStartWriting && "is-invalid"}`}>
                    {t('comment.add_comment')}
                </label>
                <textarea className={`form-control ${comment === "" && isStartWriting && "is-invalid"}`}
                          id="commentField"
                          onChange={event => {
                              setComment(event.target.value);
                              setIsStartWriting(true);
                          }}
                          value={comment}
                          name="comment"
                          rows="3"/>

                {
                    comment === "" && isStartWriting &&
                    <div className="invalid-feedback">
                        {t('error.required_field')}
                    </div>
                }
            </div>
            {
                props.loading ?
                    <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status"
                              aria-hidden="true"/>
                        <span className="sr-only">{t('common.loading')}</span>
                    </button> :
                    <button className="btn btn-primary"
                            type="button"
                            onClick={onSubmitComment}>{t('common.post')}</button>
            }
        </form>
    );
}


const mapStateToProps = state => ({
    loading: state.postCommentReducer.loading,
    result: state.postCommentReducer.result,
    error: state.postCommentReducer.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    postCommentAction,
    postCommentReset
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CommentField);
