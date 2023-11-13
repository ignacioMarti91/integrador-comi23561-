document.addEventListener('DOMContentLoaded', function () {
    const ticketForm = document.getElementById('ticket-form');
    const cantidadInput = document.getElementById('cantidad');
    const categoriaSelect = document.getElementById('categoria');
    const totalInput = document.getElementById('total');
    const borrarButton = document.getElementById('borrar');
    const resumenButton = document.getElementById('resumen');

    ticketForm.addEventListener('input', calcularTotal);
    borrarButton.addEventListener('click', borrarFormulario);
    ticketForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el envío del formulario al hacer clic en "Resumen y condiciones"
        mostrarResumen();
    });

    function calcularTotal() {
        const precioTicket = 200;
        const cantidad = parseInt(cantidadInput.value) || 0;
        const categoria = categoriaSelect.value;

        if (categoria && cantidad > 0) {
            let descuento = 0;

            switch (categoria) {
                case 'estudiante':
                    descuento = 0.8;
                    break;
                case 'trainee':
                    descuento = 0.5;
                    break;
                case 'junior':
                    descuento = 0.15;
                    break;
                default:
                    descuento = 0;
            }

            const total = cantidad * precioTicket * (1 - descuento);
            totalInput.value = `$${total.toFixed(2)}`;
        } else {
            totalInput.value = '';
        }
    }

    function borrarFormulario() {
        ticketForm.reset();
        totalInput.value = '';
    }

    function mostrarResumen() {
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const correo = document.getElementById('correo').value;
        const cantidad = parseFloat(cantidadInput.value) || 0; // Asegurar que la cantidad sea un número
        const categoria = categoriaSelect.value;

        if (!nombre || !apellido || !correo || !categoria || isNaN(cantidad) || cantidad <= 0) {
            alert('Por favor, complete todos los campos antes de generar el resumen.');
            return;
        }

        const total = totalInput.value;

        const resumen = `Resumen de la compra:\n\nNombre: ${nombre}\nApellido: ${apellido}\nCorreo: ${correo}\nCantidad: ${cantidad}\nCategoría: ${categoria}\nTotal: ${total}`;

        alert(resumen);
    }
});
