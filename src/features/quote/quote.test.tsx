/*
Para resolver la primera consigna, deberás ubicarte en la carpeta *src/features/quote* y, 
allí, crear un nuevo archivo *Quote.test.tsx*.

Dentro del mismo, el primer paso será crear el mock de la API utilizando MSW o la librería 
que hayas decidido utilizar. Luego, podrás comenzar a escribir los *test cases* del 
componente. Para ello, ten en cuenta los distintos escenarios posibles que puede 
presentarse en el componente, evaluando no solo el "camino feliz" sino también los flujos 
alternativos.

**Importante** Recuerda evaluar el nivel de cóverage de tus test, ya que para poder aprobar 
esta consigna deberás tener al menos un 50%. Para ello, puedes agregar el flag *--coverage* 
al momento de correr el test. */

import {rest} from "msw";
import {setupServer} from "msw/node";
import {screen, waitFor} from "@testing-library/react";
import Cita from "./Cita";
import {API_URL} from "../../app/constants";
import {render} from "../../test-utils";
import userEvent from "@testing-library/user-event";
import {MENSAJE_CARGANDO, NOMBRE_INVALIDO, NO_ENCONTRADO} from './constants';
import { mockedQuotes } from "./mockedQuotes";

const randomQuote = mockedQuotes[2].data;
const validQueries = mockedQuotes.map((q) => q.query);

const handlers = [
    rest.get(`${API_URL}`, (req, res, ctx) => {
        const character = req.url.searchParams.get('character');
        if (character === null) {
            return res(ctx.json([randomQuote]), ctx.delay(150));
        }
        if (validQueries.includes(character)) {
            const quote = mockedQuotes.find((q) => q.query === character);
            return res(ctx.json([quote?.data]));
        }
        return res(ctx.json([]), ctx.delay(150));
    }),
];

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen()
});

afterEach(() => {
    server.resetHandlers()
});

afterAll(() => {
    server.close()
});

describe("Cita", () => {
    describe("Cuando se renderiza el componente", () => {
        it("Deberia mostrar el mensaje de no encontrado", () => {
            render(<Cita/>);
            expect( screen.getByText(NO_ENCONTRADO) ).toBeInTheDocument();
        });
    });

    describe("Cuando el usuario ingresa un personaje valido", () => {
        it("Deberia mostrar el mensaje de cargando", async () => {
            render(<Cita/>);
            const botonObtenerCita = screen.getByRole("button", { name: /Obtener cita/i });
            await userEvent.click(botonObtenerCita);
            await waitFor(() => {
                expect(screen.getByText(MENSAJE_CARGANDO)).toBeInTheDocument();
            });
        });
        it("Deberia mostrar una cita del personaje buscado", async () => {
            render(<Cita/>);
            const input = screen.getByRole("textbox", { name: "Author Cita" });
            await userEvent.click(input);
            await userEvent.keyboard("Milhouse");

            const botonObtenerCita = screen.getByRole("button", { name: /Obtener cita/i });
            await userEvent.click(botonObtenerCita);

            await waitFor(() => {
                expect(screen.getByText(mockedQuotes[4].data.quote)).toBeInTheDocument()
            });
        });
        it("Deberia mostrar el nombre del personaje buscado", async () => {
            render(<Cita/>);
            const input = screen.getByRole("textbox", { name: "Author Cita" });
            await userEvent.click(input);
            await userEvent.keyboard("Milhouse");

            const botonObtenerCita = screen.getByRole("button", { name: /Obtener cita/i });
            await userEvent.click(botonObtenerCita);

            await waitFor(() => {
                expect(screen.getByText(mockedQuotes[4].data.character)).toBeInTheDocument()
            });
        });
    });

    describe("Cuando el usuario ingresa un nombre de personaje invalido", () => {
        it("Deberia mostrar un mensaje de nombre invalido", async () => {
            render(<Cita />);
            const input = screen.getByRole("textbox", { name: "Author Cita" });
            const botonObtenerCita = screen.getByRole("button", { name: /Obtener cita/i });
            await userEvent.click(input);
            await userEvent.keyboard("lisaa");
            userEvent.click(botonObtenerCita);

            await waitFor(() => {
                expect( screen.getByText(NOMBRE_INVALIDO) ).toBeInTheDocument();
            });
        });
    });

    describe("Cuando el usuario ingresa un numero", () => {
        it("Deberia mostrar un mensaje de nombre invalido", async () => {
            render(<Cita />);
            const input = screen.getByRole("textbox", { name: "Author Cita" });
            const botonObtenerCita = screen.getByRole("button", { name: /Obtener cita/i });
            await userEvent.click(input);
            await userEvent.keyboard("123");
            userEvent.click(botonObtenerCita);

            await waitFor(() => {
                expect( screen.getByText(NOMBRE_INVALIDO) ).toBeInTheDocument();
            });
        });
    });

    describe("Cuando el usuario oprime el boton obtener cita aleatoria", () => {
        it("Deberia traer una cita aleatoria", async () => {
            render(<Cita />);
            const botonObtenerCita = screen.getByRole("button", { name: /Obtener Cita aleatoria/i });
            await userEvent.click(botonObtenerCita); 

            await waitFor(() => {
                expect( screen.getByText("Doughnuts? I told you I don't like ethnic food") ).toBeInTheDocument();
            });
        });
        it("Deberia traer el nombre personaje de la cita aleatoria", async () => {
            render(<Cita />);
            const botonObtenerCita = screen.getByRole("button", { name: /Obtener Cita aleatoria/i });
            await userEvent.click(botonObtenerCita); 

            await waitFor(() => {
                expect( screen.getByText("Mr. Burns") ).toBeInTheDocument();
            });
        });
    });

    describe("Cuando el usuario oprime el boton borrar", () => {
        it("Deberia borrar la cita y mostrar el mensaje de no encontrado", async () => {
            render(<Cita/>);
            const input = screen.getByRole("textbox", { name: "Author Cita" });
            await userEvent.click(input);
            await userEvent.keyboard("bart");

            const botonBorrar = screen.getByRole("button", { name: "Borrar" });
            await userEvent.click(botonBorrar);

            await waitFor(() => {
                expect( screen.getByText(NO_ENCONTRADO) ).toBeInTheDocument();
            });
        });
        it("Deberia borrar del input el nombre del personaje escrito", async () => {
            render(<Cita/>);
            const input = screen.getByRole("textbox", { name: "Author Cita" });
            await userEvent.click(input);
            await userEvent.keyboard("bart");

            const botonBorrar = screen.getByRole("button", { name: "Borrar" });
            await userEvent.click(botonBorrar);

            await waitFor(() => {
                expect(input).toHaveValue("");
            });
        });
    });
});
