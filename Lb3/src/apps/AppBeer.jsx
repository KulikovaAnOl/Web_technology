class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
    }
    
    render(){
        return(
            <div class="app" id="app">
                <Header/>
                <Content/>
            </div>
        );
    }
}

function Nav(props){
    return (
        <a 
            class="btn btn-outline-light" 
            href="otz.html" 
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Отзыв">
            Отзыв
        </a>);
}

function Header(props){
    return(
        <div className="container-padding-x sticky-top"> 
            <div className="row">
                <div className="col">
                    <div className="p-3 mb-2 bg-warning bg-gradient text-white rounded">
                        <div align="center"><h1 className="user-select-none">Пивные бутики Уфы</h1>
                            <Nav/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

class Content extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            cR: 4,
            sR: 0,
            eR: 4,
            pR: 0
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(){
        const{error, isLoaded, eR, cR, sR, pR} = this.state;
        this.setState({
            eR: (eR+cR)
        });
        let jsonData = {
            sR: sR,
            eR: eR,
            fR: 'data/dataBeer.xml'
        };
        fetch("src/api/loadXml.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
        let jD = {
            fR: 'data/dataBeer.xml'
        };
        fetch("src/api/loadLength.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(jD)
        })
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    pR: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
        if(eR>pR){
            alert("Конец");
        }
    }
    
    componentDidMount(){
        const{error, isLoaded, eR, cR, sR, pR} = this.state;
        this.setState({
            eR: (eR+cR)
        });
        let jsonData = {
            sR: sR,
            eR: eR,
            fR: 'data/dataBeer.xml'
        };
        fetch("src/api/loadXml.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
        let jD = {
            fR: 'data/dataBeer.xml'
        };
        fetch("src/api/loadLength.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(jD)
        })
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    pR: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
    
    render(){
        const{error, isLoaded, items} = this.state;
       
            return(
                <div className="container">
                    <div class="p-3 mb-2 bg-black text-dark bg-gradient bg-dark rounded">
                        <div className="row align-items-center" id="content">
                        {items.map(item => (
                            <Cdata key={item.id} id={item.id} picture={item.picture} title={item.title} rate={item.rate}  value={item.value}/>
                        ))}
                        </div>
                        <div className="row w-100 align-items-center fixed-bottom bg-warning rounded" id="buttons">
                            <Button handleClick={this.handleClick}/>
                        </div>
                    </div>
                </div>
            );
        
    }
}

function Button(props){
    return(
        <button
            type="button"
            className="btn btn-outline-light"
            onClick={props.handleClick}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Показать еще">
            Показать еще
        </button>
    );
}


function Cdata(props){
    return (
        <div className="container-sm bg-dark rounded">
            <div class="row align-items-start">
                <Cid id={props.id}/>
                <Ctitle title={props.title}/>
                <Crate rate={props.rate}/>
                <div class="row align-items-center">
                <Cpicture picture={props.picture}/>
                <Cvalue value={props.value}/>
                </div>
                
            </div>
            <hr className="bg-white" />
        </div>
        
    );
}

function Cid(props){
    return <div className="col-sm-1"> <h2  className="text-center text-white">{props.id} </h2></div>;
}

function Ctitle(props){
    return <div className="col-sm-3"> <h2 className="text-white user-select-none">{props.title}</h2></div>;
}

function Cpicture(props){
    return <div className="col-sm-3"> <img className="rounded" src={`${props.picture}`} width="250" height="180" alt="..."/></div>;
}
function Crate(props){
  return <div className="col-sm-2"> <b className="text-white user-select-none">Мой оценка:</b><p className="text-white user-select-none"><img className="rounded" src="/3/src/apps/star.png" width="20" height="20"/>{props.rate}</p></div>;
}
function Cvalue(props){
    return <div className="col-sm-9"> <b className="text-white user-select-none">Описание:</b><p className="text-white user-select-none">{props.value}</p></div>;
}
