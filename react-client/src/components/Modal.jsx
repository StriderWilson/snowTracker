import React from 'react';
import ReactDom from 'react-dom';

const Modal = function(props) {

    return ReactDom.createPortal(
        <div>
            <h1 id='info'>
                {props.resort.name}
            </h1>
            <div>
                <b>
                Total Snow Fall: {props.resort.totalSnowfall} cm
                </b>
            </div>
            <div>
                <b>
                Percent Chance of Snow: {props.resort.chanceOfSnow}%
                </b>
            </div>
            <div>
                <a href={props.resort.snowReportUrl} >Snow Report</a>
            </div>
            <div>
                <a href={props.resort.webcamUrl} >Webcams</a>
            </div>
            <button onClick={props.expand}>
                Go Back!
            </button>
        </div>,
        document.getElementById('modal'),
      );
}

export default Modal