import '../Styles/Layout/notFound.css';
import React from 'react';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

function NotFound() {
    return (
        <>
            <div className="not-found-root">
                <div className="not-found-container">
                    <QuestionAnswerIcon style={{fontSize: '150px'}}/>
                    No talks selected
                </div>
            </div>
        </>
    );
}

export default NotFound;