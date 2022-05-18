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
                <Modal/>
            </div>
        );
    }
}

function Header(props){
    return(
        <div className="container-padding-x sticky-top"> 
            <div className="row">
                <div className="col">
                    <div className="p-3 mb-2 bg-warning bg-gradient text-white rounded">
                        <div align="center"><h1 className="user-select-none">Отзывы</h1>
                        <Nav/><p/>
                        <Form/><p/>
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
            cR: 2,
            sR: 0,
            eR: 2,
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
            fR: 'data/dataOtz.xml'
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
                    isLoaded: false,
                    error
                });
            }
        )
        let jD = {
            fR: 'data/dataOtz.xml'
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
                    isLoaded: false,
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
            fR: 'data/dataOtz.xml'
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
            fR: 'data/dataOtz.xml'
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
                            <Cdata key={item.id} id={item.id} name={item.name} email={item.email} value={item.value}/>
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


function Cdata(props){
    return (
       <div className="container-sm bg-dark rounded">
            <div class="row align-items-start">
                <Cid id={props.id}/>
                <Cname name={props.name}/>
                <Cemail email={props.email}/>
                
                <Cvalue value={props.value}/>
                <hr className="bg-white" />
            </div>
        </div>
    );
}

function Cid(props){
    return (
        <div className="col-sm-1">
            <h2 className="text-center text-white">
            {`${props.id}  `}</h2></div>
            
    );
}

function Cname(props){
    return (
        <div className="col-sm-3">
            <h className="text-white user-select-none">Имя: <br /></h>
            <h className="text-white user-select-none">{props.name}</h>
        </div>
    );
}

function Cemail(props){
    return (
        <div className="col-sm-3">
            <h className="text-white user-select-none">
            Еmail:  <br /></h>
            <h className="text-white user-select-none">{` ${props.email}  `}</h>
        </div>
    );
}

function Cvalue(props){
    return (
        <div className="col-sm-3">
            <h className="text-white user-select-none">Отзыв:</h>
            <p className="text-white user-select-none">{props.value}</p>
        </div>
    );
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

function Nav(props){
    return (
        <a 
            class="btn btn-outline-light" 
            href="series.html" 
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Посмотреть список пивных бутиков"
            >
            Посмотреть список пивных бутиков
        </a>);
}

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false
        };

    }
    
    componentDidMount(){
        this.setState({
            isLoaded: true
        });
    }
    
    render(){
        const{error, isLoaded, items} = this.state;
      
            return(
                <div>
                    <button 
                        type="button"
                        className="btn btn-outline-light"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Написать отзыв"
                        data-bs-toggle="modal"
                        data-bs-target="#Modal"
                        >
                        {`Написать отзыв  `}
                        
                    </button>
                    
                </div>
                
            );
        
    }
}

class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            name: '',
            email: '',
            value: '',
            pR: 0
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleClick(){
        event.preventDefault();
        const {name, email, value, pR} = this.state;
        let bN = false;let bE = false;let bV = false;
        if(!((name.trim().length==="0")||(name.trim()===""))){bN = true;}else{bN = false;}
        if(!((email.trim().length==="0")||(email.trim()===""))&&(email.includes('@'))){bE = true;}else{bE = false;}
        if(!((value.trim().length==="0")||(value.trim()===""))){bV = true;}else{bV = false;}
        if(bN&&bE&&bV==true){
            let jD = {
                fR: 'data/dataOtz.xml'
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
            let jsonData = {
                id: pR,
                name: name,
                email: email,
                value: value,
                xml: 'data/dataOtz.xml'
            };
            console.log(jsonData);
            fetch("src/api/addItemXml.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }, 
                body: JSON.stringify(jsonData)
            })
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
            alert("Отзыв отправлен!");
        }else{
            alert("Отзыв не отправлен!");
        }
    }

    componentDidMount(){
        const{isLoaded, pR} = this.state;
        let jD = {
            fR: 'data/dataOtz.xml'
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
    
    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }
    
    render(){
        const{error, isLoaded, name, email, value} = this.state;
        
            return(
                <div className="modal fade" id="Modal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header p-3 mb bg-warning text-white">
                                <h5 className="modal-title user-select-none" id="ModalLabel">Напишите отзыв</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body bg-warning">
                                <form autocomplete="off" class="row g-3 needs-validation bg-warning" onSubmit={this.handleClick}>
                                    <div class="form-floating bg-warning flex-nowrap mb-3">
                                        <input 
                                            type="text" 
                                            id="name"
                                            name="name"
                                            class="form-control" 
                                            required
                                            value={name}
                                            pattern="[A-Za-z]{4,16}"
                                            aria-label="name"
                                            aria-describedby="addon-wrapping"
                                            onChange={this.handleChange}
                                        />
                                        <label for="name">Введите имя</label>
                                    </div>
                                    <div class="form-floating flex-nowrap mb-3">
                                        <input 
                                            type="email" 
                                            id="email"
                                            name="email"
                                            class="form-control" 
                                            pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                                            value={email}
                                            required
                                            aria-label="name"
                                            aria-describedby="addon-wrapping"
                                            onChange={this.handleChange}
                                        />
                                        <label for="email">Введите email</label>
                                    </div>
                                    
                                    <div class="form-floating flex-nowrap mb-3">
                                        <textarea 
                                            class="form-control" 
                                            id="text"
                                            name="value"
                                            value={value}
                                            required
                                            aria-label="With textarea"
                                            onChange={this.handleChange}
                                            >
                                        </textarea>
                                        <label for="text">Напишите отзыв</label>
                                    </div>
                                </form>
                            </div>
                            <div align="center" className="modal-start bg-warning sticky7" id="buttons">
                                <button 
                                    type="button" 
                                    className="btn btn-warning text-white"
                                    onClick={this.handleClick}
                                    
                                    >
                                    Отправить отзыв
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        
    }
}

