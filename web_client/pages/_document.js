import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'


export default class extends Document {
    render() {
        return (
            <html>
                <Head>
                    {/*<title>Title</title>*/}
                    {/*<meta charSet="utf-8" />*/}
                    {/*<meta name="viewport" content="initial-scale=1.0, width=device-width" />*/}

                    {/* Highlight Theme */}
                    <link rel="stylesheet" media="all" href="https://highlightjs.org/static/demo/styles/railscasts.css" />

                    {/* Global site tag (gtag.js) - Google Analytics */}
                    <script src="https://www.googletagmanager.com/gtag/js?id=UA-142403750-1"/>

                    <script
                        dangerouslySetInnerHTML={{
                            __html: `window.dataLayer = window.dataLayer || [];
                             function gtag() { dataLayer.push(arguments); }
                             gtag('js', new Date());`
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}