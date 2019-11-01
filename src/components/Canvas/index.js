import React, {
    useEffect
} from 'react'
import {
    awesome
} from '../../lib/awesome-poster'

export default function ({params}) {
    let canvas = null;
    const poster = awesome.poster();

    useEffect(() => {
        if (canvas === null) {
            canvas = document.getElementById('app');
            poster.canvas(canvas);
        }

        poster.width(params.width)
            .height(params.height)
            .imageURL(params.imageURL)
            .fontSize(params.fontSize)
            .fontFamily(params.fontFamily)
            .title(params.title)
            .content(params.content)
            .textColor(params.textColor)
            .on('end', console.log);

        poster.start();
    })
    return <canvas id = "app" > </canvas>
}