//Para el botón ver más y ver menos.
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".read-more");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const description = button.previousElementSibling; // Selecciona el texto anterior al botón
            if (description.classList.contains("expanded")) {
                // Contrae el texto
                description.classList.remove("expanded");
                button.textContent = "Ver más"; //y cambia el texto del botón a: ver más
            } else {
                // Expande el texto
                description.classList.add("expanded"); // Añade la clase expanded para mostrar el texto completo
                button.textContent = "Ver menos"; //y cambia el botón a ver menos
            }
        });
    });
});

//Carrito de compras:
document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.querySelector(".cart-items"); // Contenedor de los productos en el carrito
    const totalAmountElement = document.querySelector(".total-amount"); // Elemento que muestra el total
    const addToCartButtons = document.querySelectorAll(".add-to-cart"); // Botones para añadir productos al carrito

    let totalAmount = 0; //suma total es let porque va cambiando

    addToCartButtons.forEach(button => { // Recorre todos los botones de añadir al carrito
        button.addEventListener("click", () => { // Al hacer clic en un botón
            const productName = button.getAttribute("data-product"); // Obtiene el nombre del producto desde el atributo data-product
            const productPrice = parseInt(button.getAttribute("data-price")); // Obtiene el precio del producto desde el atributo data-price

            // Crear un contenedor para el producto en el carrito
            const cartItem = document.createElement("div"); // Crea un nuevo div para el producto
            cartItem.classList.add("cart-item"); // Añade la clase cart-item para el estilo

            // Crear el texto del producto
            const productText = document.createElement("span"); // Crea un nuevo span para el texto del producto
            productText.textContent = `${productName} - $${productPrice}`; // Muestra el nombre y precio del producto
            cartItem.appendChild(productText); // Añade el texto al contenedor del producto

            // Crear el botón de eliminar
            const removeButton = document.createElement("button");
            removeButton.textContent = "Eliminar"; // Texto del botón
            removeButton.classList.add("remove-item"); // Añade la clase remove-item para el estilo
            cartItem.appendChild(removeButton); // Añade el botón al contenedor del producto

            // Agregar el producto al contenedor del carrito
            cartItemsContainer.appendChild(cartItem);

            // Actualizar el total
            totalAmount += productPrice;
            totalAmountElement.textContent = `$${totalAmount}`;

            // Funcionalidad para eliminar el producto
            removeButton.addEventListener("click", () => {
                cartItemsContainer.removeChild(cartItem);
                totalAmount -= productPrice;
                totalAmountElement.textContent = `$${totalAmount}`;
            });
        });
    });
}); 
 
//Formulario
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form"); // Selecciona el formulario
    const inputs = form.querySelectorAll("input, textarea"); // Selecciona todos los campos de entrada y el área de texto
    const submitButton = form.querySelector(".submit-button"); // Selecciona el botón de envío

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita que el formulario se envíe por defecto
        let isValid = true; // Variable para rastrear si el formulario es válido

        console.log("Validando formulario..."); // Depuración

        inputs.forEach(input => {
            const errorMessage = document.getElementById(`${input.id}-error`); // Selecciona el mensaje de error asociado al campo

            // Validar si el campo está vacío
            if (!input.value.trim()) {
                isValid = false; // Marca el formulario como inválido
                if (errorMessage) {
                    errorMessage.classList.add("active"); // Muestra el mensaje de error
                }
                input.style.border = "2px solid #d32f2f"; // Cambia el borde del campo a rojo
                console.log(`Error en el campo ${input.id}: está vacío.`); // Depuración
            } else {
                if (errorMessage) {
                    errorMessage.classList.remove("active"); // Oculta el mensaje de error
                }
                input.style.border = "1px solid #ccc"; // Restaura el estilo original del campo
            }

            // Validar el número de teléfono (debe tener exactamente 9 dígitos)
            if (input.id === "phone" && !/^\d{9}$/.test(input.value.trim())) {
                isValid = false; // Marca el formulario como inválido
                if (errorMessage) {
                    errorMessage.classList.add("active"); // Muestra el mensaje de error
                }
                console.log(`Error en el campo ${input.id}: número de teléfono inválido.`); // Depuración
            }

            // Validar la fecha (debe ser posterior al 18 de abril de 2025)
            if (input.id === "date") {
                const selectedDate = new Date(input.value);
                const minDate = new Date("2025-04-18");
                if (selectedDate < minDate) {
                    isValid = false; // Marca el formulario como inválido
                    if (errorMessage) {
                        errorMessage.classList.add("active"); // Muestra el mensaje de error
                    }
                    console.log(`Error en el campo ${input.id}: fecha inválida.`); // Depuración
                }
            }

            // Validar la hora (debe estar entre las 08:00 y las 20:30)
            if (input.id === "time") {
                const [hours, minutes] = input.value.split(":").map(Number);
                if (hours < 8 || (hours === 20 && minutes > 30) || hours > 20) {
                    isValid = false; // Marca el formulario como inválido
                    if (errorMessage) {
                        errorMessage.classList.add("active"); // Muestra el mensaje de error
                    }
                    console.log(`Error en el campo ${input.id}: hora inválida.`); // Depuración
                }
            }
        });

        // Validar que se haya seleccionado un tipo de consulta
        const consulta = form.querySelector("input[name='consulta']:checked");
        const consultaError = document.getElementById("consulta-error");
        if (!consulta) {
            consultaError.classList.add("active"); // Muestra el mensaje de error si no se seleccionó ninguna opción
            isValid = false; // Marca el formulario como inválido
            console.log("Error: no se seleccionó un tipo de consulta."); // Depuración
        } else {
            consultaError.classList.remove("active"); // Oculta el mensaje de error si se seleccionó una opción
        }

        // Si el formulario es válido, muestra un mensaje de éxito
        if (isValid) {
            console.log("Formulario válido. Mostrando mensaje de éxito."); // Depuración
            alert("Formulario enviado con éxito. Será contactado a la brevedad, gracias."); // Muestra el mensaje de éxito al usuario
            form.reset(); // Reinicia el formulario
        } else {
            console.log("Formulario inválido. Mostrando errores."); // Depuración
            alert("Por favor, completa todos los campos correctamente."); // Muestra un mensaje de error si el formulario no es válido
        }
    });
});