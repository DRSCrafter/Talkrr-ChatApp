import React from "react";
import date from "date-and-time";

function Message({isSent}) {
    return (
        <div style={styles.container(isSent)}>
            <div style={isSent ? styles.bodySend : styles.bodyReceive}>
                {isSent ? null : <div style={{fontWeight: 'bold'}}>John Smith</div>}
                <div style={{fontSize: 14}}>Yo man what's up? haven't heard of you in a while.</div>
                <div
                    style={isSent ? styles.dateSend : styles.dateReceive}>{date.format(new Date(), 'ddd, MMM DD HH:mm')}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: isSent => ({
        width: '95%',
        height: isSent ? 80 : 90,
        margin: 'auto',
        marginBlock: 10,
        direction: isSent ? 'rtl' : 'ltr'
    }),
    bodyReceive: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        minWidth: 100,
        maxWidth: '40%',
        height: '100%',
        position: 'relative',
        backgroundColor: 'rgba(72,72,72,0.6)',
        borderRadius: 30,
        borderBottomLeftRadius: 0,
        paddingInline: 20,
        color: 'white'
    },
    dateReceive: {
        position: 'absolute',
        bottom: -15,
        right: 20,
        fontSize: 10
    },
    bodySend: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        minWidth: 100,
        width: '40%',
        height: '100%',
        position: 'relative',
        backgroundColor: 'rgba(66,98,255,0.45)',
        borderRadius: 25,
        borderBottomRightRadius: 0,
        paddingInline: 20,
        color: 'white',
        direction: 'ltr'
    },
    dateSend: {
        position: 'absolute',
        bottom: -15,
        left: 20,
        fontSize: 10
    }
};

export default Message;