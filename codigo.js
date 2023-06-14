let listaUsuarios = [];
let listaUsuariosFiltrados = [];
let usuarioEditando = null;

function agregarUsuario(event) {
  event.preventDefault();

  let identificacion = document.getElementById("identificacion").value;
  let nombres = document.getElementById("nombres").value;
  let apellidos = document.getElementById("apellidos").value;
  let telefono = document.getElementById("telefono").value;
  let correo = document.getElementById("correo").value;
  let placa = document.getElementById("placa").value;
  let tipo = document.getElementById("tipo").value;

  if (usuarioEditando) {
    let usuarioIndex = listaUsuarios.findIndex(usuario => usuario.identificacion === usuarioEditando);
    if (usuarioIndex !== -1) {
      listaUsuarios[usuarioIndex] = {
        identificacion: identificacion,
        nombres: nombres,
        apellidos: apellidos,
        telefono: telefono,
        correo: correo,
        placa: placa,
        tipo: tipo,
        puntos: listaUsuarios[usuarioIndex].puntos
      };
      usuarioEditando = null;
    }
  } else {
    listaUsuarios.push({
      identificacion: identificacion,
      nombres: nombres,
      apellidos: apellidos,
      telefono: telefono,
      correo: correo,
      placa: placa,
      tipo: tipo,
      puntos: 0
    });
  }
  document.getElementById("formulario").reset();
  actualizarTabla();
}

function editarUsuario(identificacion) {
  let usuario = listaUsuarios.find(usuario => usuario.identificacion === identificacion);
  if (usuario) {
    document.getElementById("identificacion").value = usuario.identificacion;
    document.getElementById("nombres").value = usuario.nombres;
    document.getElementById("apellidos").value = usuario.apellidos;
    document.getElementById("telefono").value = usuario.telefono;
    document.getElementById("correo").value = usuario.correo;
    document.getElementById("placa").value = usuario.placa;
    document.getElementById("tipo").value = usuario.tipo;
    usuarioEditando = identificacion;
  }
}
function eliminarUsuario(identificacion) {
  let usuarioIndex = listaUsuarios.findIndex(usuario => usuario.identificacion === identificacion);
  if (usuarioIndex !== -1) {
    listaUsuarios.splice(usuarioIndex, 1);
  }
  actualizarTabla();
}

function actualizarTabla() {
  let tabla = document.getElementById("tabla-usuarios");
  let barraBusqueda = document.getElementById("barraBusqueda").value.toLowerCase().trim();
  tabla.innerHTML = `
    <tr>
      <th>Identificación</th>
      <th>Nombres</th>
      <th>Apellidos</th>
      <th>Placa</th>
      <th>Tipo</th>
      <th>Email</th>
      <th>Teléfono</th>
      <th></th>
      <th></th>
    </tr>
  `;

  let selectUsuarioPuntos = document.getElementById("usuarioPuntos");
  selectUsuarioPuntos.innerHTML = "";

  listaUsuariosFiltrados = listaUsuarios.filter(usuario => {
    const nombreCompleto = `${usuario.nombres} ${usuario.apellidos}`.toLowerCase();
    const identificacion = usuario.identificacion.toLowerCase();
    return nombreCompleto.includes(barraBusqueda) || identificacion.includes(barraBusqueda);
  });

  listaUsuariosFiltrados.forEach(usuario => {
    let fila = `
      <tr>
        <td>${usuario.identificacion}</td>
        <td>${usuario.nombres}</td>
        <td>${usuario.apellidos}</td>
        <td>${usuario.placa}</td>
        <td>${usuario.tipo}</td>
        <td>${usuario.correo}</td>
        <td>${usuario.telefono}</td>
        <td><button class="btn btn-warning" style="color: white" onclick="editarUsuario('${usuario.identificacion}')">Editar</button></td>
        <td><button onclick="eliminarUsuario('${usuario.identificacion}')">Eliminar</button></td>
      </tr>
    `;
    tabla.innerHTML += fila;

    let optionUsuario = document.createElement("option");
    optionUsuario.value = usuario.identificacion;
    optionUsuario.textContent = `${usuario.nombres} ${usuario.apellidos}`;
    selectUsuarioPuntos.appendChild(optionUsuario);
  });

  let selectCliente = document.getElementById("cliente");
  selectCliente.innerHTML = "";

  listaUsuariosFiltrados.forEach(usuario => {
    let option = document.createElement("option");
    option.value = usuario.identificacion;
    option.textContent = `${usuario.nombres} ${usuario.apellidos}`;
    selectCliente.appendChild(option);
  });
}

document.getElementById("barraBusqueda").addEventListener("input", actualizarTabla);
document.getElementById("formulario").addEventListener("submit", agregarUsuario);

actualizarTabla();

let listaservicios = [];
let id = 1;

function agregarservicios(event) {
  event.preventDefault();

  let servicio = document.getElementById("servicio").value;
  let valor = document.getElementById("valor").value;
  let descripcion = document.getElementById("descripcion").value;
  let puntos = document.getElementById("puntos").value;

  listaservicios.push({
    id: id,
    servicio: servicio,
    valor: valor,
    descripcion: descripcion,
    puntos: parseInt(puntos),
  });
  id++;

  document.getElementById("formulario2").reset();

  actualizarservicios();
}

function eliminarservicio(servicioId) {
  let servicioIndex = listaservicios.findIndex(servicio => servicio.id === servicioId);
  if (servicioIndex !== -1) {
    listaservicios.splice(servicioIndex, 1);
  }
  actualizarservicios();
}

function actualizarservicios() {
  let tabla = document.getElementById("tabla-servicios");
  tabla.innerHTML = `
    <tr>
      <th>Id</th>
      <th>Servicio</th>
      <th>Valor</th>
      <th>Descripcion</th>
      <th>Puntos</th>
      <th></th>
    </tr>
  `;

  listaservicios.forEach(servicio => {
    let fila = `
      <tr>
        <td>${servicio.id}</td>
        <td>${servicio.servicio}</td>
        <td>${servicio.valor}</td>
        <td>${servicio.descripcion}</td>
        <td>${servicio.puntos}</td>
        <td><button onclick="eliminarservicio(${servicio.id})">Eliminar</button></td>
      </tr>
    `;
    tabla.innerHTML += fila;
  });

  let selectservicioViaje = document.getElementById("servicioViaje");
  selectservicioViaje.innerHTML = "";

  listaservicios.forEach(servicio => {
    let option = document.createElement("option");
    option.value = servicio.servicio;
    option.textContent = servicio.servicio;
    selectservicioViaje.appendChild(option);
  });
}

document.getElementById("formulario2").addEventListener("submit", agregarservicios);

function realizarCompra(event) {
  event.preventDefault();
  
  let servicioSeleccionada = document.getElementById("servicioViaje").value;

  let servicio = listaservicios.find(servicio => servicio.servicio === servicioSeleccionada);

  if (servicio) {
    let valorAntesIVA = parseFloat(servicio.valor);
    let impuestoIVA = parseFloat((valorAntesIVA / 100) * 14);
    let descuento = parseFloat((valorAntesIVA / 100) * 6);
    let valorConImpuestos = parseFloat((valorAntesIVA - descuento) + impuestoIVA );
    let puntos = parseInt(servicio.puntos);
    let clienteSeleccionado = document.getElementById("cliente").value;
    let cliente = listaUsuarios.find(usuario => usuario.identificacion === clienteSeleccionado);

    if (cliente) {
      let resumenCompra = `
        <p><strong>Cliente:</strong> ${cliente.nombres} ${cliente.apellidos}</p>
        <p><strong>servicio de Viaje:</strong> ${servicio.servicio}</p>
        <p><strong>Valor:</strong> ${valorAntesIVA}</p>
        <p><strong>Impuesto del IVA (14%):</strong> ${impuestoIVA}</p>
        <p><strong>Descuento especial (6%):</strong> ${descuento}</p>
        <p><strong>Valor con impuestos y descuento:</strong> ${valorConImpuestos}</p>
        <p><strong>Puntos obtenidos:</strong> ${puntos}</p>
      `;

      document.getElementById("resumenCompra").innerHTML = resumenCompra;
      document.getElementById("btnMostrarResumen").style.display = "block";

      cliente.puntos += puntos;

      actualizarTabla();
    } else {
      alert("El cliente seleccionado no existe.");
    }
  } else {
    alert("La servicio de viaje seleccionada no existe.");
  }
}

function mostrarResumenCompra() {
  let modal = new bootstrap.Modal(document.getElementById("modalResumenCompra"));
  let resumenCompra = document.getElementById("resumenCompra").innerHTML;
  modal.show();
}

document.getElementById("formularioCompra").addEventListener("submit", realizarCompra);

function mostrarPuntos() {
  let usuarioSeleccionado = document.getElementById("usuarioPuntos").value;
  let usuario = listaUsuarios.find(usuario => usuario.identificacion === usuarioSeleccionado);

  if (usuario) {
    let puntos = usuario.puntos;
    document.getElementById("tabla-puntos").innerHTML = `
      <tr>
        <th>Cliente</th>
        <th>Puntos</th>
      </tr>
      <tr>
        <td>${usuario.identificacion} - ${usuario.nombres} ${usuario.apellidos}</td>
        <td>${puntos}</td>
      </tr>
    `;
  } else {
    document.getElementById("tabla-puntos").innerHTML = `
      <tr>
        <th>Cliente</th>
        <th>Puntos</th>
      </tr>
      <tr>
        <td colspan="2">No se encontró el cliente seleccionado.</td>
      </tr>
    `;
  }
}

document.getElementById("mostrarPuntos").addEventListener("click", mostrarPuntos);
