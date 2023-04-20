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
                name="id" value={objeto?.id} onchange={handleChange}
                requirido={false} msgvalido=""
                msginvalido="" readonly={true}
                maxCaracteres={5} />
            <CampoEntrada id="txtUsername" label="Nome de Usuário" tipo="text"
                name="username" value={objeto?.username} onchange={handleChange}
                requirido={true} msgvalido="Nome de Usuário OK"
                msginvalido="Informe o nome de usuário" readonly={false}
                maxCaracteres={50} />
            <CampoEntrada id="txtGender" label="Gênero" tipo="text"
                name="gender" value={objeto?.gender} onchange={handleChange}
                requirido={false} msgvalido="Gênero OK"
                msginvalido="" readonly={false}
                maxCaracteres={50} />
            <CampoEntrada id="txtHeight" label="Altura" tipo="text"
                name="height" value={objeto?.height} onchange={handleChange}
                requirido={false} msgvalido="Altura OK"
                msginvalido="" readonly={false}
                maxCaracteres={10}
                step="0.01" />
            <CampoEntrada id="txtWeight" label="Peso" tipo="text"
                name="weight" value={objeto?.weight} onchange={handleChange}
                requirido={false} msgvalido="Peso OK"
                msginvalido="" readonly={false}
                maxCaracteres={10}
                step="0.01" />
            <CampoEntrada id="txtAge" label="Idade" tipo="number"
                name="age" value={objeto?.age} onchange={handleChange}
                requirido={false} msgvalido="Idade OK"
                msginvalido="" readonly={false}
                maxCaracteres={10} />
            <CampoEntrada id="txtLatitude" label="Latitude" tipo="text"
                name="latitude" value={objeto?.latitude} onchange={handleChange}
                requirido={false} msgvalido="Latitude OK"
                msginvalido="" readonly={false}
                maxCaracteres={20}
                step="0.01" />
            <CampoEntrada id="txtMainPosition" label="Posição Principal" tipo="number"
                name="mainposition" value={objeto?.mainposition} onchange={handleChange}
                requirido={true} msgvalido="Posição Principal OK"
                msginvalido="Por favor, selecione uma posição válida." readonly={false}
                maxCaracteres={10} />
            <CampoEntrada id="txtSecondPosition" label="Segunda Posição" tipo="number"
                name="secondposition" value={objeto?.secondposition} onchange={handleChange}
                requirido={true} msgvalido="Segunda Posição OK"
                msginvalido="Por favor, selecione uma posição válida." readonly={false}
                maxCaracteres={10} />
            <CampoEntrada id="txtLongitude" label="Longitude" tipo="text"
                name="longitude" value={objeto?.longitude} onchange={handleChange}
                requirido={false} msgvalido="Longitude OK"
                msginvalido="" readonly={false}
                maxCaracteres={20}
                step="0.01" />
            <CampoEntrada id="txtProfileIconURL" label="URL do Ícone de Perfil" tipo="text"
                name="profileIconURL" value={objeto?.profileIconURL} onchange={handleChange}
                requirido={false} msgvalido="URL do Ícone de Perfil OK"
                msginvalido="" readonly={false}
                maxCaracteres={255} />
            <CampoEntrada id="chkAvaliability" label="Disponível" tipo="text"
                name="avaliability" checked={objeto?.avaliability} onchange={handleChange}
                msgvalido="Disponibilidade OK" msginvalido=""
                readonly={false} />
            <CampoSelect id="selecTeam" label="Time"
                name="team" value={objeto?.team} onchange={handleChange}
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