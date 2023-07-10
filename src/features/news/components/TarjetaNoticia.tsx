import { TarjetaNoticia, ImagenTarjetaNoticia, TituloTarjetaNoticia, FechaTarjetaNoticia, DescripcionTarjetaNoticia, BotonLectura } from "../styled"
import { INoticiasNormalizadas } from "../interfaces"

interface ITarjNoticiaProps {
    noticia: INoticiasNormalizadas,
    setModal: React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>
}

/**
 * Componente TarjNoticia
 * Muestra una tarjeta con información de una noticia
 * @param {ITarjNoticiaProps} - props 
 * @property {INoticiasNormalizadas} noticia - Noticia a mostrar en la tarjeta
 * @property {React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>} setModal - Funcion que actualiza el estado del modal
 * @returns {JSX.Element}
 */

const TarjNoticia = ({ noticia, setModal }: ITarjNoticiaProps) => {
    return (
        <TarjetaNoticia>
            <ImagenTarjetaNoticia src={noticia.imagen} />
            <TituloTarjetaNoticia>{noticia.titulo}</TituloTarjetaNoticia>
            <FechaTarjetaNoticia>{noticia.fecha}</FechaTarjetaNoticia>
            <DescripcionTarjetaNoticia>
                {noticia.descripcionCorta}
            </DescripcionTarjetaNoticia>
            <BotonLectura onClick={() => setModal(noticia)}>Ver más</BotonLectura>
        </TarjetaNoticia>
    )
}

export default TarjNoticia;