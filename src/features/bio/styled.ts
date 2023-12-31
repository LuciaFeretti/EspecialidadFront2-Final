/* 
Para resolver la segunda consigna deberás ubicarte en la carpeta *src/features/bio*. 
Allí, crearemos un archivo *styled.ts*, dentro del cual se encontrarán los componentes 
que deberás crear utilizando **Styled Components**.

Los estilos de cada componente, puedes obtenerlos del archivo *styles.modules.css* que se 
encuentra dentro de la carpeta.

Recuerda que un punto importante de la consigna, consiste en agregar estilos dinámicos a los 
botones, de manera de poder identificar el personaje que se encuentra activo. Para ello, 
puedes utilizar el valor de la variable *bioActiva* que se encuentra dentro del componente 
**Bio**

**Importante** Esta sección se encuentra funcionando correctamente en el código base. 
Es importante verificar el comportamiento actual antes de proceder a refactorizarlo, 
de forma tal que una vez realizada la consigna, puedas testear que la sección sigue 
comportándose de la misma manera.*/

import styled from 'styled-components';

export interface IBoton { 
    activo: boolean;    
}

const BioBoton = styled.button<IBoton> `
    border-radius: 5px;
    border: 1px solid darkgray;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    padding: 1rem;
    margin: 1rem;
    font-family: "Homer Simpson Revised", sans-serif;
    font-size: 1.4rem;
    ${(activo) => activo ? (`
        background-color: #fdd835;
        color: whitesmoke;
        text-shadow: 2px 2px 0 #000000, 2px -2px 0 #000000, -2px 2px 0 #000000,
        -2px -2px 0 #000000, 2px 0px 0 #000000, 0px 2px 0 #000000,
        -2px 0px 0 #000000, 0px -2px 0 #000000;`) 
        : "" }
    &:hover { cursor: pointer; };
`

const BioContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;`

const BioImagen = styled.img`
    max-width: 200px;
    max-height: 300px;
    margin-bottom: 1rem;
    `

const BioNombre = styled.h3`
    font-size: 2em;
    margin-bottom: 1rem;`

const BioDescripcion = styled.p`
    font-size: 1.3em;
    width: 70%;
    margin: 1rem auto;`

const ContenedorBotones = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;`

export {BioContainer, BioImagen, BioNombre, BioDescripcion, ContenedorBotones, BioBoton}