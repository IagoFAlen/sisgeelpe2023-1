import { useContext } from "react";
import Alerta from "../../Alerta";
import TeamContext from "./TeamContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function Form() {

    const { objeto, handleChange, acaoCadastrar,
        alerta } = useContext(TeamContext);

    return (
        <Dialogo id="modalEdicao" titulo="Edição de Time"
            acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código" tipo="number"
                name="id" value={objeto.id} onchange={handleChange}
                requirido={false} msgvalido=""
                msginvalido="" readonly={true}
                maxCaracteres={5} />
            <CampoEntrada id="txtNome" label="Nome" tipo="text"
                name="teamName" value={objeto.teamname} onchange={handleChange}
                requirido={true} msgvalido="Nome OK"
                msginvalido="Informe o nome" readonly={false}
                maxCaracteres={50} />
            <CampoEntrada id="txtCrestURL" label="URL do Escudo" tipo="text"
                name="crestURL" value={objeto.cresturl} onchange={handleChange}
                requirido={true} msgvalido="URL do Escudo OK"
                msginvalido="Informe a URL do escudo" readonly={false}
                maxCaracteres={255} />
        </Dialogo>
    )

}

export default Form;