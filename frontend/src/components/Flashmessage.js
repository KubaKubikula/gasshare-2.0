import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const FlashMessage = (props) => {
    return (
        <div style={{position: "absolute", width: "100%", display: "none"}}>
            <Alert severity="success">
                <AlertTitle>Info</AlertTitle>
                This is an info alert — <strong>check it out!</strong>
            </Alert>
        </div>
    );
}

export default FlashMessage;