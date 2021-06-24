import React from 'react';
import PropTypes from "prop-types";
import Comment from "../Comment";

export default function Comments(props) {
    const {
        style,
        onClick,
        children,
        comments,
        ...rest
    } = props;

    console.log("comments", comments);
    return (
        <ul className="list-unstyled">
            {
                comments.map((comment, index) => (
                    <Comment description={comment.commentContent}
                             date={comment.commentDateCreated}
                             author={comment.user.userName}
                             key={`comment${index}`}/>
                ))
            }
        </ul>
    );
};

Comments.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func,
    comments: PropTypes.array
};

Comments.defaultProps = {
    style: {},
    onClick: () => {
    },
    posts: []
};
