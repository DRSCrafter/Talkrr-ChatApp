import '../Styles/Layout/notFound.scss';
import React from 'react';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

function NotFound() {
    return (
        <>
            <div className="not-found">
                <div className="not-found__container">
                    <QuestionAnswerIcon style={{fontSize: '150px'}}/>
                    No Chats Selected
                </div>
            </div>
        </>
    );
}

export default NotFound;