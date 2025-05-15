import { useEffect, useState } from "react";
const FormNota = ({ nota, onSave, onCancel }) => {
    const [texto, setTexto] = useState("");
    const [importancia, setImportancia] = useState(3);
    const envioEvt = (e) => {
        e.preventDefault();
        // notaGuardar va a basarse en la nota existente si es actualización 
        // o a crear una nueva si es añadido 
        const notaGuardar = {
            ...(nota || {}), // Si la nota ya existe, se mantiene su id  
            texto,
            importancia: parseInt(importancia),
        };
        // Ahora se llama al evento onSave que está en el control padre 
        onSave(notaGuardar);
    };
    const cancelarEvt = () => { if (onCancel) onCancel(); };
    useEffect(() => {
        // Si hay nota, se cargan sus valores 
        if (nota) {
            setTexto(nota.texto);
            setImportancia(nota.importancia);
        }
    }, [nota]);
    return (
        <form onSubmit={envioEvt}>
            <h2>{nota ? "Actualizar" : "Añadir"}</h2>
            <label>
                Texto:
                <input type="text" value={texto} onChange={(e) => setTexto(e.target.value)}
                    required />
            </label>
            <label>
                Importancia (1-5):
                <input type="number" min="1" max="5" value={importancia}
                    onChange={(e) => setImportancia(e.target.value)} required />
            </label>
            <button type="submit">{nota ? "Guardar" : "Añadir"}</button>
            <button type="button" onClick={cancelarEvt}>
                Cancelar
            </button>
        </form>
    );
};
export default FormNota;