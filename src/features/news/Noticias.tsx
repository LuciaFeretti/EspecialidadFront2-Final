/*
Dentro de la carpeta src/features/news, encontraremos el archivo Noticias.tsx. Allí, se 
encuentra toda la lógica de esta sección. Para poder resolver esta consigna, es importante 
poder abstraernos un poco de la creación de la UI, y del HTML, para pensar en que 
funcionalidades pueden ser generalizadas y extraídas del componente en particular. Por ejemplo,
una función que agrega mayúsculas a un string, es algo que puede ser utilizado en cualquier 
lado (no solo en este componente), por lo que puede crearse una función utilitaria para 
realizar esta tarea cada vez que sea necesario. Recuerda además lo aprendido sobre los 
distintos principios SOLID al momento de pensar en las oportunidades de refactorización 
que se nos presentan en este caso. */

import { useEffect, useState } from "react";
import {
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias,
} from "./styled";
import {INoticiasNormalizadas} from './interfaces';
import {obtenerInformacion} from "./utils";
import TarjModal from "./TarjetaModal";
import TarjNoticia from "./TarjetaNoticia";

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  useEffect(() => {
    obtenerInformacion(setNoticias);
  }, []);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((n) => (
          <TarjNoticia noticia={n} setModal={setModal} key={n.id}/>
        ))}
      </ListaNoticias>
      {modal && <TarjModal noticia={modal} setNoticia={setModal}/>}
    </ContenedorNoticias>
  );
};

export default Noticias;
