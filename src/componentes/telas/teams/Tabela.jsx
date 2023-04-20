import { useContext } from "react";
import TeamContext from "./TeamContext";
import Alerta from "../../Alerta";

function Tabela() {

    const { alerta, listaObjetos, remover, setEditar, setObjeto, recuperar, setAlerta } = useContext(TeamContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Listagem de Teams</h1>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao"
            onClick={ () => {
                setObjeto({id : 0, nome : "" , descricao : "", sigla : ""});
                setEditar(false);
                setAlerta({status : "", message : ""});
            }}>
                Novo <i className=" bi bibi bi-file-plus" />
            </button>
            <Alerta alerta={alerta} />
            {listaObjetos.length === 0 && <h1>Nenhum team encontrado</h1>}
            {listaObjetos.length > 0 &&
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col">ID</th>
                                <th scope="col">Nome do Time</th>           
                                <th scope="col">Elos</th>
                                <th scope="col">Data de Fundação</th>
                                <th scope="col">Ranking Geral</th>
                                <th scope="col">Moedas</th>
                                <th scope="col">URL do Escudo</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {listaObjetos.map(objeto => (
                                <tr key={objeto.id}>
                                    <td align="center">
                                        <button className="btn btn-info" title="Editar"
                                        data-bs-toggle="modal" data-bs-target="#modalEdicao"
                                        onClick={ () => {
                                            recuperar(objeto.id);
                                            setEditar(true);
                                            setAlerta({status : "", message : ""});
                                        }}>
                                            <i className="bi bi-pencil-square" />
                                        </button>
                                        <button className="btn btn-danger" title="Excluir"
                                            onClick={() => remover(objeto)}>
                                            <i className="bi bi-trash3" />
                                        </button>
                                    </td>
                                    <td>{objeto.id}</td>
                                    <td>{objeto.teamName}</td>
                                    <td>{objeto.elos}</td>
                                    <td>{objeto.dateOfEstablishment}</td>
                                    <td>{objeto.teamOverAll}</td>
                                    <td>{objeto.coins}</td>
                                    <td>{objeto.crestURL}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

        </div>
    )
}

export default Tabela;