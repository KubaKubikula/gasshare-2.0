import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const FlashMessage = (props:any) => {
    return (
        <div style={{display: props.flashMessage != "" ? 'block' : 'none' }}>
        <div style={{position: "absolute", width: "100%"}}>
            <Alert severity="success">
                <AlertTitle>{props.flashMessage}</AlertTitle>
            </Alert>
        </div>
        </div>
    );
}

export default FlashMessage;