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
                setObjeto({id : 0, username : "" , gender : "", height : "", weight: "",
                           age: "", latitude: "", longitude: "", profileIconURL: "", overall: "",
                           mainposition: "", secondposition: "", elos: "", team : "", preDefinedGrouID: "",
                           avaliability: ""  });
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
                                <th scope="col">Height</th>
                                <th scope="col">Weight</th>
                                <th scope="col">Age</th>
                                <th scope="col">Latitude</th>
                                <th scope="col">Longitude</th>
                                <th scope="col">ProfileIconURL</th>
                                <th scope="col">Overall</th>
                                <th scope="col">MainPosition</th>
                                <th scope="col">SecondPosition</th>
                                <th scope="col">Elos</th>
                                <th scope="col">Team</th>
                                <th scope="col">PreDefinedGroupID</th>
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
                                    <td>{objeto.username}</td>
                                    <td>{objeto.gender}</td>
                                    <td>{objeto.height}</td>
                                    <td>{objeto.weight}</td>
                                    <td>{objeto.age}</td>
                                    <td>{objeto.latitude}</td>
                                    <td>{objeto.longitude}</td>
                                    <td>{objeto.profileIconURL}</td>
                                    <td>{objeto.overall}</td>
                                    <td>{objeto.mainposition}</td>
                                    <td>{objeto.secondposition}</td>
                                    <td>{objeto.elos}</td>
                                    <td>{objeto.team}</td>
                                    <td>{objeto.preDefinedGrouID}</td>
                                    <td>{objeto.avaliability}</td>
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