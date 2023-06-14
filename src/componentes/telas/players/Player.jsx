import { useState, useEffect } from "react";
import PlayerContext from "./PlayerContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import Autenticacao from "../../seguranca/Autenticacao";
import WithAuth from "../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

function Player() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        id: "", username: "",
        gender: "", team: ""
    });
    const [ carregando, setCarregando ] = useState(true);
    const [ listaTeams, setListaTeams ] = useState([]);

    let navigate = useNavigate();

    const recuperar = async id => {
        try{
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/players/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": Autenticacao.pegaAutenticacao().token
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Erro código: ' + response.status);
            })
            .then(data => setObjeto(data))
            .catch(err => setAlerta({ "status": "error", "message": err }))

        }catch(err){
            console.log('caiu no erro do recuperar por id: ' + err);
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperaPlayers = async () => {
        try {
            setCarregando(true);
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/players`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": Autenticacao.pegaAutenticacao().token
                    }
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Erro código: ' + response.status)
                })
                .then(data => setListaObjetos(data))
                .catch(err => setAlerta({ "status": "error", "message": err }))
            setCarregando(false);
        } catch (err) {
            setAlerta({ "status": "error", "message": err })
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperaTeams = async () => {
        try {
            setCarregando(true);
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/teams`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": Autenticacao.pegaAutenticacao().token
                    }
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Erro código: ' + response.status)
                })
                .then(data => setListaObjetos(data))
                .catch(err => setAlerta({ "status": "error", "message": err }))
            setCarregando(false);
        } catch (err) {
            setAlerta({ "status": "error", "message": err })
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo =  editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/players`,
                {
                    method: metodo,
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": Autenticacao.pegaAutenticacao().token
                    },
                    body: JSON.stringify(objeto)
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Erro código: ' + response.status)
                })
                .then(json => {
                    setAlerta({ status: json.status, message: json.message });
                    setObjeto(json.objeto);
                    if (!editar) {
                        setEditar(true);
                    }
                })
        } catch (err) {            
            setAlerta({ "status": "error", "message": err })
            window.location.reload();
            navigate("/login", { replace: true });            
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
            try {
                await
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/players/${objeto.id}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                "x-access-token": Autenticacao.pegaAutenticacao().token
                            }
                        })
                        .then(response => response.json())
                        .then(json => setAlerta({ status: json.status, message: json.message }))
                recuperaPlayers();
            } catch (err) {
                console.log(err);
                window.location.reload();
                navigate("/login", { replace: true });
            }
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
            <Tabela />
            <Form/>
        </PlayerContext.Provider>
    )

}

export default Player;