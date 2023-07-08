import { TarjetaNoticia, ImagenTarjetaNoticia, TituloTarjetaNoticia, FechaTarjetaNoticia, DescripcionTarjetaNoticia, BotonLectura } from "./styled"
import { INoticiasNormalizadas } from "./interfaces"

interface ITarjNoticiaProps {
    noticia: INoticiasNormalizadas,
    setModal: React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>
}

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