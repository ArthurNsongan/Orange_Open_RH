import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import {Constant} from "../../config/Constant";
import {useTranslation} from "react-i18next";

export default function GlossaryItem(props) {
    const {
        category,
        items,
        indexKey,
        ...rest
    } = props;

    const totalPosts = items.length;
    const totalPage = Math.ceil(totalPosts / Constant.glossaryPageLimit);

    const [currentPosts, setCurrentGlossary] = useState(items.slice(0, Constant.glossaryPageLimit));
    const {t} = useTranslation();

    useEffect(() => {
        setCurrentGlossary(items.slice(0, Constant.glossaryPageLimit));
    }, [props.items]);

    const handlePageChange = data => {
        const offset = (data.selected) * Constant.glossaryPageLimit;
        setCurrentGlossary(items.slice(offset, offset + Constant.glossaryPageLimit));
    };
    
    const accordionId = Math.round(Math.random() * 10);
    return (
        <>
            <ul className="list-unstyled">

                <li className="media mb-4">
                    <svg className="mr-3 h5" width="64" height="64"
                         xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"
                         focusable="false" role="img">
                        <rect width="100%" height="100%" fill="#999"/>
                        <text x="50%" y="50%" fill="#fff" dy=".3em" dominant-baseline="middle"
                              text-anchor="middle">{category}
                        </text>
                    </svg>

                    <div className="media-body">
                        <div className="accordion" id={`accordion-${indexKey}`}>
                            {
                                items.map((item, index) => (
                                    <div className="card" key={`glossairedescription${indexKey}${index}`}>
                                        <div className="card-header" id={`heading${indexKey}${index}`}>
                                            <h4 className="mb-0">
                                                <button className="btn btn-link btn-block text-left" type="button"
                                                        data-toggle="collapse"
                                                        data-target={`#collapse${indexKey}${index}`}
                                                        aria-expanded="false"
                                                        aria-controls={`collapse${indexKey}${index}`}>
                                                    {item.title}
                                                </button>
                                            </h4>
                                        </div>
                                        <div id={`collapse${indexKey}${index}`} className="collapse"
                                             aria-labelledby={`collapse${indexKey}${index}`}
                                             data-parent={`#accordion-${indexKey}`}>
                                            <div className="card-body">
                                                {item.description}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </li>

            </ul>

        </>
    );
};

GlossaryItem.propTypes = {
    category: PropTypes.string,
    items: PropTypes.array
};

GlossaryItem.defaultProps = {
    category: "",
    items: []
};