import { useState, useEffect } from "react";
import PlayerContext from "./PlayerContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
function Player() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        id: "", username: "",
        gender: "", height: "",
        weight: "", age: "", 
        latitude: "", longitude: "",
        profileIconURL: "", overall: "",
        mainposition: "", secondposition: "",
        elos: "", team: "",
        preDefinedGroupID: "", avaliability: ""
    });
    const [ carregando, setCarregando ] = useState();
    const [ listaTeams, setListaTeams ] = useState([]);

    const recuperar = async id => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/players/${id}`)
        .then(response => response.json())
        .then(data => setObjeto(data))
        .catch(err => setAlerta({ status: "error", message: err }));
    }

    const recuperaPlayers = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/players`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => setAlerta({ status: "error", message: err }))
        setCarregando(false);
    }

    const recuperaTeams = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/teams`)
            .then(response => response.json())
            .then(data => setListaTeams(data))
            .catch(err => setAlerta({ status: "error", message: err }))
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo =  editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/players`,
            {
                method : metodo,
                headers : { "Content-Type" : "application/json"},
                body : JSON.stringify(objeto)
            }).then(response => response.json())
            .then(json => {
                setAlerta({status : json.status, message : json.message});
                setObjeto(json.objeto);
                if (!editar){
                    setEditar(true);
                }
            })
        } catch(err){
            setAlerta({ status: "error", message: err })
        }
        recuperaPlayers();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }
 
    
    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            await
                fetch(`${process.env.REACT_APP_ENDERECO_API}/players/${objeto.id}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({ status: json.status, message: json.message }))
            recuperaPlayers();
        }
    }

    useEffect(() => {
        recuperaPlayers();
        recuperaTeams();
    }, []);

    return (
        <PlayerContext.Provider value={{
            alerta, setAlerta,
            listaObjetos, setListaObjetos,
            recuperaPlayers, remover,
            objeto, setObjeto,
            editar, setEditar, 
            recuperar, acaoCadastrar, 
            handleChange, listaTeams
        }}>
            { !carregando ? <Tabela /> : <Carregando/> }
            <Form/>
        </PlayerContext.Provider>
    )

}

export default Player;