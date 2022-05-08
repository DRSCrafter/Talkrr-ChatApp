import './App.css';

function App() {
    return (
        <>
            <img
                src={require("./Assets/Background/Background (2).jpg")}
                style={{...styles.background, zIndex: -2}}
                alt="background"/>
            <img className="background"
                 src={require("./Assets/Background/Background (2).jpg")}
                 style={{...styles.background, zIndex: -1, filter: 'blur(10px)'}}
                 alt="background"/>
            <span style={{display: 'flex'}}>
            <span style={{width: '23%', height: '100vh', padding: 10}}>
                <div style={{ display: 'flex', width: '100%'}}>
                    <img src={require('./Assets/logo.png')} style={{width: '17%'}} alt="Logo"/>
                    <span style={{
                            fontFamily: 'Debby Script',
                            fontSize: '3vw',
                            color: "white",
                            marginLeft: 20
                        }}>
                        Talkrr
                    </span>
                </div>
            </span>
            <span style={{width: '77%', height: '100vh', backgroundColor: '#000000'}}>
            </span>
            </span>
        </>
    );
}

const styles = {
    background: {
        width: '100vw',
        height: '100vh',
        position: 'absolute',
    }
}

export default App;
