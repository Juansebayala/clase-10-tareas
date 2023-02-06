const $botonAgregarIntegrantes = document.querySelector('#agregar-integrantes');

$botonAgregarIntegrantes.onclick = function(event) {
	const $cantidadIntegrantes = (document.querySelector
	('#integrantes-familia').value);
	borrarIntegrantesAgregados();

	const errores = {
		errorCantidadIntegrantes: validarCantidadIntegrantes($cantidadIntegrantes)
	}

	if (errores.errorCantidadIntegrantes) {
		ocultarErrores();
		mostrarErrores(errores);
		ocultarBotonCalcular();
		ocultarMensajesSalarios();
	} else {
		ocultarErrores();
		agregarIntegrantes(Number($cantidadIntegrantes));
		mostrarBotonCalcular();
	}

	event.preventDefault();
}

function crearIntegrante() {
	const $integrante = document.createElement('div');
	$integrante.classList.add('row');
	$integrante.classList.add('row-cols-lg-auto')
	const $contenedorLabel = document.createElement('div');
	$contenedorLabel.classList.add('col');
	const nuevoLabel = document.createElement('label');
	nuevoLabel.classList.add('form-label');
	const textoLabel = 'Por favor, indica el salario anual del integrante: ';
	const $contenedorInput = document.createElement('div');
	$contenedorInput.classList.add('col-6')
	nuevoLabel.textContent = textoLabel;
	const nuevoInput = document.createElement('input');
	nuevoInput.classList.add('form-control');
	$contenedorLabel.appendChild(nuevoLabel);
	$contenedorInput.appendChild(nuevoInput);
	$integrante.appendChild($contenedorLabel);
	$integrante.appendChild($contenedorInput);
	return $integrante;
}

function agregarIntegrantes(cantidadIntegrantes) {
	const $salariosIntegrantes = document.querySelector('#salarios-integrantes');
	for (let i = 0; i < cantidadIntegrantes; i++) {
		const $integrante = crearIntegrante();
		$salariosIntegrantes.appendChild($integrante);
	}
}

function mostrarBotonCalcular() {
	const $botonCalcular = document.querySelector('#boton-calcular');
	$botonCalcular.classList.remove('oculto');
}

function ocultarBotonCalcular() {
	const $botonCalcular = document.querySelector('#boton-calcular');
	$botonCalcular.classList.add('oculto');
}

function borrarIntegrantesAgregados() {
	$salariosIntegrantes = document.querySelector('#salarios-integrantes');
	$elementos = document.querySelectorAll('#salarios-integrantes .row');
	$elementos.forEach(function(elemento){
		$salariosIntegrantes.removeChild(elemento);
	});
}

function validarCantidadIntegrantes(cantidadIntegrantes) {
	if (cantidadIntegrantes <= 0) {
		return 'La cantidad de integrantes no puede ser menor a 0';
	} else if (cantidadIntegrantes >= 20) {
		return 'Solo puede haber menos de 20 integrantes';
	} else if (!/^[0-9-]+$/.test(cantidadIntegrantes) || /\./.test(cantidadIntegrantes)) {
		return 'Solo puedes agregar la cantidad de integrantes sin punto decimal';
	} else {
		return '';
	}
}

function crearErrores(nodoErrores, errores) {
	const $error = document.createElement('p');
	$error.textContent = errores.errorCantidadIntegrantes;
	nodoErrores.appendChild($error);
}

function borrarErrores() {
	const $errores = document.querySelectorAll('#mensajes-error p');
	$errores.forEach(function(error){
		error.remove();
	});
}

function mostrarErrores(errores) {
	const $errores = document.querySelector('#mensajes-error');
	crearErrores($errores, errores);
	$errores.classList.remove('oculto');
}

function ocultarErrores() {
	borrarErrores();
	const $errores = document.querySelector('#mensajes-error').classList.add('oculto')
}
