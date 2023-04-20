import { useState, useEffect } from "react";
import TeamContext from "./TeamContext";
import Tabela from "./Tabela";
import Form from "./Form";

function Team() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        id: "",
        teamname: "",
        elos: parseInt(""),
        dateofestablishment: "",
        teamoverall: parseInt(""),
        coins: parseInt(""),
        cresturl: ""
      });
      const [ carregando, setCarregando ] = useState();

      const recuperar = async id => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/teams/${id}`)
        .then(response => response.json())
        .then(data => setObjeto(data))
        .catch(err => setAlerta({ status: "error", message: err }));
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
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/teams`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => setAlerta({ status: "error", message: err }))
        setCarregando(false);
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            await
                fetch(`${process.env.REACT_APP_ENDERECO_API}/teams/${objeto.id}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({ status: json.status, message: json.message }))
            recuperaTeams();
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
            { !carregando ? <Tabela /> : <Carregando/> }
            <Form/>
        </TeamContext.Provider>
    )

}

export default Team;