import { useContext } from "react";
import Alerta from "../../Alerta";
import PlayerContext from "./PlayerContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";
import CampoSelect from "../../comuns/CampoSelect";

function Form() {

    const { objeto, handleChange, acaoCadastrar,
        alerta, listaTeams } = useContext(PlayerContext);

    return (
        <Dialogo id="modalEdicao" titulo="Edição de Team"
            acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtId" label="ID" tipo="number"
                name="id" value={objeto.id} onchange={handleChange}
                requirido={false} msgvalido=""
                msginvalido="" readonly={true}
                maxCaracteres={5} />
            <CampoEntrada id="txtUsername" label="Nome de Usuário" tipo="text"
                name="username" value={objeto.username} onchange={handleChange}
                requirido={true} msgvalido="Nome de Usuário OK"
                msginvalido="Informe o nome de usuário" readonly={false}
                maxCaracteres={50} />
            <CampoEntrada id="txtGender" label="Gênero" tipo="text"
                name="gender" value={objeto.gender} onchange={handleChange}
                requirido={false} msgvalido="Gênero OK"
                msginvalido="" readonly={false}
                maxCaracteres={50} />
            <CampoSelect id="selectTeam" label="Time"
                name="team" value={objeto.team} onchange={handleChange}
                requirido={true} msgvalido="Time OK"
                msginvalido="Selecione o time">
                {
                    listaTeams && listaTeams.map((team) => (
                        <option key={team.id} value={team.id}>
                            {team.teamName}
                        </option>
                    ))
                }
            </CampoSelect>

        </Dialogo>
    )

}

export default Form;