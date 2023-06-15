import { useState, useEffect } from "react";
import TeamContext from "./TeamContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import Autenticacao from "../../seguranca/Autenticacao";
import WithAuth from "../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

function Team() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        id: "",
        teamname: "",
        cresturl: ""
      });
      const [ carregando, setCarregando ] = useState();

      let navigate = useNavigate();

      const recuperar = async id => {
        try{
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/teams/${id}`,
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

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo =  editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/teams`,
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
        recuperaTeams();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setObjeto({...objeto, [name] : value});
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

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/teams/${objeto.id}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                "x-access-token": Autenticacao.pegaAutenticacao().token
                            }
                        })
                        .then(response => response.json())
                        .then(json => setAlerta({ status: json.status, message: json.message }))
                recuperaTeams();
            } catch (err) {
                console.log(err);
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
    }

    useEffect(() => {
        recuperaTeams();
    }, []);

    return (
        <TeamContext.Provider value={{
            alerta, setAlerta,
            listaObjetos, setListaObjetos,
            recuperaTeams, remover,
            objeto, setObjeto,
            editar, setEditar, 
            recuperar, acaoCadastrar, 
            handleChange
        }}>
            <Tabela />
            <Form/>
        </TeamContext.Provider>
    )

}

export default WithAuth(Team);