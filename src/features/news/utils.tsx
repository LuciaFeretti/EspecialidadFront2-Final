import { INoticias, obtenerNoticias } from "./fakeRest";
import { INoticiasNormalizadas } from "./interfaces";

/**
 * Convierte la primera letra de cada palabra en mayuscula
 * @param {string} titulo - titulo a convertir
 * @returns {string} - el titulo con las primeras letras de cada palabra en mayuscula
 */
const pasarMayuscula = (titulo: string) => { 
    return titulo
            .split(" ")
            .map((str) => {
                return str.charAt(0).toUpperCase() + str.slice(1);
            })
            .join(" ");
}

/**
 * Calcula la cantidad de minutos transcurridos entre la fecha dada y el momento actual
 * @param {Date} fecha - Fecha a calcular
 * @returns {number} - Cantidad de minutos transcurridos
 */
const calcularMinutos = (fecha : Date) => {
    const ahora = new Date();
        const minutosTranscurridos = Math.floor(
            (ahora.getTime() - fecha.getTime()) / 60000
        );
    return minutosTranscurridos;
}

/**
 * Normaliza una noticia
 * @param {INoticias} noticia - Noticia a normalizar
 * @returns {INoticiasNormalizadas} - Noticia normalizada
 */
const normalizar = (noticia: INoticias) => { 
    return { 
        id: noticia.id,
        titulo: pasarMayuscula(noticia.titulo),
        descripcion: noticia.descripcion,
        fecha: `Hace ${ calcularMinutos(noticia.fecha) } minutos`,
        esPremium: noticia.esPremium,
        imagen: noticia.imagen,
        descripcionCorta: noticia.descripcion.substring(0, 100)
    }
}

/**
 * Obtiene la información de las noticias y actualiza el estado
 * @param {React.Dispatch<React.SetStateAction<INoticiasNormalizadas[]>>} setNoticias - funcion que actualiza el estado de las noticias
 * @returns {void}
 */
const obtenerInformacion = async (setNoticias:React.Dispatch<React.SetStateAction<INoticiasNormalizadas[]>>) => { 
    const respuesta = await obtenerNoticias();
    const data = respuesta.map((noticia) => {
        return (
            normalizar(noticia) );
    });
    setNoticias(data);
}

export {pasarMayuscula, calcularMinutos, normalizar, obtenerInformacion}