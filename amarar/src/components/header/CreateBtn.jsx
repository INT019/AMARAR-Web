import PropTypes from "prop-types";
import React from "react";

export const CreateBtn = ( { text = "Create Post", hover, className } ) =>
{
    return (
        <div className={ `classic-button ${ className }` }>
            <button className="button">
                <div className="get-started">{ text }</div>
            </button>
        </div>
    );
};

CreateBtn.propTypes = {
    text: PropTypes.string,
    hover: PropTypes.bool,
};
