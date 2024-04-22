import {SessionProvider} from "next-auth/react";
import type {AppProps} from "next/app";
import React from "react";

function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp;