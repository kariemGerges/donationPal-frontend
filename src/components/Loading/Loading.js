import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ type, color, height, width }) => {

    const shape = type;
    const colors = color;
    const h = height;
    const w = width;
    return (
        <div className="loading">
            <ReactLoading type={shape} color={colors} height={h} width={w} />
        </div>
    );
};


export default Loading;