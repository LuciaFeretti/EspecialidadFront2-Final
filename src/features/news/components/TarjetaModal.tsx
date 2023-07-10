import { ContenedorModal, TarjetaModal, CloseButton, ImagenModal, CotenedorTexto, TituloModal, DescripcionModal, BotonSuscribir} from "../styled"
import { SuscribeImage, CloseButton as Close } from "../../../assets";
import { INoticiasNormalizadas } from "../interfaces";

interface ITarjModalProps {
    noticia: INoticiasNormalizadas
    setNoticia: React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>
}

/**
 * Componente TarjModal
 * @param {ITarjModalProps} - props
 * @property {INoticiasNormalizadas } noticia - noticia a mostrar en el modal
 * @property {React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null >>} setNoticia - función que actualiza el estado de la noticia
 *  @returns {JSX.Element}
 */
const TarjModal = ( {noticia, setNoticia}: ITarjModalProps )=>{
    const tituloPremium = "Suscríbete a nuestro Newsletter"
    const descripPremium = "Suscríbete a nuestro newsletter y recibe noticias de nuestros personajes favoritos."

    return(
        <ContenedorModal>
            <TarjetaModal>
                <CloseButton onClick={() => setNoticia(null)}>
                    <img src={Close} alt="close-button" />
                </CloseButton>
                <ImagenModal src={noticia?.esPremium? SuscribeImage : noticia?.imagen} alt="mr-burns-excelent" />
                <CotenedorTexto>
                    <TituloModal>{noticia?.esPremium? tituloPremium : noticia?.titulo}</TituloModal>
                    <DescripcionModal>
                    {noticia?.esPremium? descripPremium : noticia?.descripcion}
                    </DescripcionModal>
                    {noticia?.esPremium && 
                        <BotonSuscribir
                            onClick={() =>
                            setTimeout(() => {
                                alert("Suscripto!");
                                setNoticia(null);
                            }, 1000)}
                            >
                            Suscríbete
                        </BotonSuscribir>
                    }
                </CotenedorTexto>
            </TarjetaModal>
        </ContenedorModal>
    )
}
export default TarjModal