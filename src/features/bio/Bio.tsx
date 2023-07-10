import { useState } from "react";
import { NombresSimpsons, INFO_SIMPSONS } from "./constants";
//import styles from "./styles.module.css";
import { BioContainer, BioImagen, BioNombre, BioDescripcion, ContenedorBotones, BioBoton } from "./styled";

/**
 * Componente Bio
 * Muestra la biografia de cada personaje de Los Simpsons
 * @returns {JSX.Element} Con botones de cada personaje, imagen, nombre y descripcion del personaje seleccionado
 */

const Bio = () => {
  const [bioActiva, setBioActiva] = useState(
    INFO_SIMPSONS[NombresSimpsons.BART]
  );

  /**
   * Actualiza la biografia del personaje seleccionado
   * @param {NombresSimpsons} nombre - Nombre del personaje
   * @returns {void}
   */
  const onClick: (nombre: NombresSimpsons) => void = (nombre) =>
    setBioActiva(INFO_SIMPSONS[nombre]);


  /**
   * Crea los botones de cada personaje
   * @returns {JSX}
   */
  const crearBotones = () => {
    return Object.keys(INFO_SIMPSONS).map((nombre: string) => (
      <BioBoton
        key={nombre as string}
        onClick={() => onClick(nombre as NombresSimpsons)}
        activo={bioActiva.nombre === nombre}
      >
        {nombre}
      </BioBoton>
    ));
  };

  return (
    <BioContainer>
      <ContenedorBotones>{crearBotones()}</ContenedorBotones>
      <div>
        <div>
          <BioImagen
            src={bioActiva.image}
            alt={bioActiva.nombre}
          />
        </div>
        <div>
          <BioNombre>{bioActiva.nombre}</BioNombre>
          <BioDescripcion>{bioActiva.descripcion}</BioDescripcion>
        </div>
      </div>
    </BioContainer>
  );
};

export default Bio;
