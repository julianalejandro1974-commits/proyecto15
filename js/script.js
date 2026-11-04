
const { useState } = React;

// =====================================
// 1. PREGUNTAS Y RESPUESTAS DE SQL
// =====================================

const tarjetas = [
    {
        pregunta: "¿Qué es SQL?",
        respuesta: "SQL es un lenguaje utilizado para consultar, administrar y modificar información almacenada en bases de datos relacionales."
    },
    {
        pregunta: "¿Qué es una base de datos?",
        respuesta: "Es un conjunto organizado de información que se almacena para poder consultarla, modificarla y administrarla fácilmente."
    },
    {
        pregunta: "¿Qué es una tabla en SQL?",
        respuesta: "Es una estructura que organiza los datos en filas y columnas. Cada tabla almacena información relacionada con un tema específico."
    },
    {
        pregunta: "¿Qué es una clave primaria (PRIMARY KEY)?",
        respuesta: "Es un campo que identifica de manera única cada registro de una tabla. No puede tener valores repetidos ni valores NULL."
    },
    {
        pregunta: "¿Qué es una clave foránea (FOREIGN KEY)?",
        respuesta: "Es un campo que permite relacionar una tabla con otra mediante la referencia a una clave primaria."
    },
    {
        pregunta: "¿Para qué sirve SELECT?",
        respuesta: "SELECT permite consultar y obtener información de una o varias tablas de una base de datos."
    },
    {
        pregunta: "¿Para qué sirve INSERT INTO?",
        respuesta: "INSERT INTO se utiliza para agregar nuevos registros o datos dentro de una tabla."
    },
    {
        pregunta: "¿Para qué sirve UPDATE?",
        respuesta: "UPDATE permite modificar los datos que ya existen en una tabla. Generalmente se utiliza junto con WHERE para indicar qué registros cambiar."
    },
    {
        pregunta: "¿Para qué sirve DELETE?",
        respuesta: "DELETE permite eliminar registros de una tabla. Se puede utilizar WHERE para seleccionar cuáles registros eliminar."
    },
    {
        pregunta: "¿Qué hace la cláusula WHERE?",
        respuesta: "WHERE permite establecer condiciones para filtrar los registros que queremos consultar, modificar o eliminar."
    },
    {
        pregunta: "¿Qué es una relación entre tablas?",
        respuesta: "Es una conexión entre dos o más tablas que permite organizar la información y evitar su duplicación."
    },
    {
        pregunta: "¿Para qué sirve ORDER BY?",
        respuesta: "ORDER BY permite ordenar los resultados de una consulta de forma ascendente (ASC) o descendente (DESC)."
    },
    {
        pregunta: "¿Para qué sirve GROUP BY?",
        respuesta: "GROUP BY agrupa registros que tienen valores iguales en una o varias columnas. Se utiliza frecuentemente con funciones como COUNT y SUM."
    },
    {
        pregunta: "¿Qué es un JOIN?",
        respuesta: "JOIN permite combinar información de dos o más tablas utilizando una columna relacionada entre ellas."
    },
    {
        pregunta: "¿Cuál es la diferencia entre INNER JOIN y LEFT JOIN?",
        respuesta: "INNER JOIN devuelve únicamente los registros que coinciden en ambas tablas. LEFT JOIN devuelve todos los registros de la tabla izquierda y las coincidencias de la derecha."
    },
    {
        pregunta: "¿Qué significa NULL en SQL?",
        respuesta: "NULL representa la ausencia de un valor o un dato desconocido. No es lo mismo que cero o una cadena vacía."
    },
    {
        pregunta: "¿Para qué sirve UNIQUE?",
        respuesta: "UNIQUE es una restricción que impide que existan valores duplicados en una columna o combinación de columnas."
    },
    {
        pregunta: "¿Para qué sirve COUNT()?",
        respuesta: "COUNT() es una función que permite contar la cantidad de registros o valores que cumplen determinadas condiciones."
    },
    {
        pregunta: "¿Qué es una transacción en SQL?",
        respuesta: "Es un conjunto de operaciones que se ejecutan como una unidad de trabajo. Permite confirmar los cambios con COMMIT o deshacerlos con ROLLBACK."
    },
    {
        pregunta: "¿Qué significa normalizar una base de datos?",
        respuesta: "Es un proceso que organiza la información en diferentes tablas para reducir la duplicación de datos y mejorar su consistencia."
    }
];


// =====================================
// 2. COMPONENTE: BARRA DE PROGRESO
// =====================================

function ProgressBar({ actual, total }) {

    const porcentaje = Math.round((actual / total) * 100);

    return (
        <div className="progreso-contenedor">

            <div className="progreso-fondo">
                <div
                    className="progreso-relleno"
                    style={{ width: `${porcentaje}%` }}
                ></div>
            </div>

            <span className="progreso-porcentaje">
                {porcentaje}%
            </span>

            <span className="progreso-contador">
                {actual} de {total}
            </span>

        </div>
    );
}


// =====================================
// 3. COMPONENTE: TARJETA FLASH
// =====================================

function FlashCard({ pregunta, respuesta, mostrar }) {

    return (
        <div className="tarjeta">

            {mostrar ? (

                <p className="contenido-tarjeta respuesta">
                    {respuesta}
                </p>

            ) : (

                <h2 className="contenido-tarjeta">
                    {pregunta}
                </h2>

            )}

        </div>
    );
}


// =====================================
// 4. COMPONENTE PRINCIPAL: APP
// =====================================

function App() {

    // Estado de la tarjeta actual
    const [indice, setIndice] = useState(0);

    // Estado para mostrar u ocultar la respuesta
    const [mostrarRespuesta, setMostrarRespuesta] = useState(false);

    // Obtener la tarjeta actual
    const tarjetaActual = tarjetas[indice];

    // Avanzar a la siguiente tarjeta
    function siguiente() {

        if (indice < tarjetas.length - 1) {
            setIndice(indice + 1);
            setMostrarRespuesta(false);
        }

    }

    // Regresar a la tarjeta anterior
    function anterior() {

        if (indice > 0) {
            setIndice(indice - 1);
            setMostrarRespuesta(false);
        }

    }

    // Mostrar u ocultar la respuesta
    function cambiarRespuesta() {

        setMostrarRespuesta(!mostrarRespuesta);

    }

    // Estructura de la aplicación
    return (

        <main className="contenedor">

            <h1 className="titulo">
                Flash Cards
            </h1>

            {/* Barra de progreso */}

            <ProgressBar
                actual={indice + 1}
                total={tarjetas.length}
            />

            {/* Tarjeta de preguntas y respuestas */}

            <div className="tarjeta-contenedor">

                <FlashCard
                    pregunta={tarjetaActual.pregunta}
                    respuesta={tarjetaActual.respuesta}
                    mostrar={mostrarRespuesta}
                />

                {/* Botones de navegación */}

                <div className="navegacion">

                    <button
                        className="boton"
                        onClick={anterior}
                        disabled={indice === 0}
                    >
                        ‹ Previous
                    </button>

                    <button
                        className="boton boton-respuesta"
                        onClick={cambiarRespuesta}
                    >
                        {mostrarRespuesta ? "Hide Answer" : "Show Answer"}
                    </button>

                    <button
                        className="boton"
                        onClick={siguiente}
                        disabled={indice === tarjetas.length - 1}
                    >
                        Next ›
                    </button>

                </div>

            </div>

        </main>

    );

}


// =====================================
// 5. RENDERIZAR LA APLICACIÓN
// =====================================

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
