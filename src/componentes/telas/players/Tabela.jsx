import { useContext } from "react";
import PlayerContext from "./PlayerContext";
import Alerta from "../../Alerta";

function Tabela() {

    const { alerta, listaObjetos, remover, setEditar, setObjeto, recuperar, setAlerta } = useContext(PlayerContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Listagem de Players</h1>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao"
            onClick={ () => {
                setObjeto({id : 0, username : "" , gender : "", team : ""});
                setEditar(false);
                setAlerta({status : "", message : ""});
            }}>
                Novo <i className=" bi bibi bi-file-plus" />
            </button>
            <Alerta alerta={alerta} />
            {listaObjetos.length === 0 && <h1>Nenhum Player encontrado</h1>}
            {listaObjetos.length > 0 &&
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col">ID</th>
                                <th scope="col">Username</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Team</th>
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
                                    <td scope="row">{objeto.id}</td>
                                    <td>{objeto.username}</td>
                                    <td>{objeto.gender}</td>
                                    <td>{objeto.team}</td>
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