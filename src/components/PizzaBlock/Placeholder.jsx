import React from "react"
import ContentLoader from "react-content-loader";

const Placeholder = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="431" rx="10" ry="10" width="95" height="30" />
        <rect x="129" y="424" rx="25" ry="25" width="152" height="45" />
        <rect x="0" y="278" rx="10" ry="10" width="280" height="24" />
        <circle cx="134" cy="129" r="130" />
        <rect x="0" y="318" rx="10" ry="10" width="280" height="88" />
    </ContentLoader>
)

export default Placeholder;
