import { INoticias, obtenerNoticias } from "./fakeRest";
import { INoticiasNormalizadas } from "./interfaces";

const pasarMayuscula = (titulo: string) => { 
    return titulo
            .split(" ")
            .map((str) => {
                return str.charAt(0).toUpperCase() + str.slice(1);
            })
            .join(" ");
}

const calcularMinutos = (fecha : Date) => {
    const ahora = new Date();
        const minutosTranscurridos = Math.floor(
            (ahora.getTime() - fecha.getTime()) / 60000
        );
    return minutosTranscurridos;
}

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

const obtenerInformacion = async (setNoticias:React.Dispatch<React.SetStateAction<INoticiasNormalizadas[]>>) => { 
    const respuesta = await obtenerNoticias();
    const data = respuesta.map((noticia) => {
        return (
            normalizar(noticia) );
    });
    setNoticias(data);
}

export {pasarMayuscula, calcularMinutos, normalizar, obtenerInformacion}