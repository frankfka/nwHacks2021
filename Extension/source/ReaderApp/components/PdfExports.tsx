import * as React from 'react';

const HTMLToPDF = require('html-to-pdf');

// Add HTML right here

function pdfConverter(): void {

    const htmlToPDF = new HTMLToPDF(
        document.documentElement.innerHTML
    );

    htmlToPDF.convert()
        .then((buffer: any) => {
            const blob = new Blob(buffer, {type: "application/pdf"});
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'file.pdf';
            link.click();
            // do something with the PDF file buffer
        })
        .catch((err: any) => {
            console.log(err);
            // do something on error
        });

}

/*const ReactToPdf = require('react-to-pdf');
function reactConverter():void {
    const ref = React.createRef();
    <div>
        <ReactToPdf targetRef={ref} filename="div-blue.pdf">
            {({toPdf}) => (
                <button onClick={toPdf}>Generate pdf</button>
            )}
        </ReactToPdf>
        <div style={{width: 500, height: 500, background: 'blue'}} ref={ref}/>
    </div>

}
*/

export default pdfConverter;