import React, { useEffect } from "react";
import { Query } from "@apollo/react-components";
import query from "./graphql";
import showCookiePolicy from "./../utils/showCookiePolicy";
import { PbAddonRenderPlugin } from "@webiny/app-page-builder/types";

function CookiePolicy({ settings }) {
    useEffect(() => {
        if (settings && settings.enabled === true) {
            showCookiePolicy(settings);
        }
    }, []);

    return null;
}

export default (): PbAddonRenderPlugin => ({
    type: "addon-render",
    name: "addon-render-cookie-policy",
    component: (
        <Query query={query}>
            {({ data, loading }) => {
                return loading ? null : (
                    <CookiePolicy settings={data.cookiePolicy.getSettings.data} />
                );
            }}
        </Query>
    )
});
