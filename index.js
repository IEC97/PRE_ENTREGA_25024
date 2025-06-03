const args = process.argv.slice(2);
const comando = args[0].toLowerCase();
const opciones = args.slice(1);


// GET - Trae todos los productos
fetch('https://fakestoreapi.com/products')
  .then((response) => response.json())
  .then(data => {
    console.log('Lista de productos:');
    data.forEach(productos => {
      const { id, title, price, description, category, image } = productos;
      console.log(`Producto ID: ${id}`);
      console.log(`Título: ${title}`);
      console.log(`Precio: $${price}`);
      console.log(`Descripción: ${description}`);
      console.log(`Categoria: ${category}`);
      console.log(`Imagen: ${image}`);
      console.log('------------------------');
    });
  })
  .catch(error => {
    console.error("Error al obtener la lista de productos", error);
  });

// GET - Trae productos por id
fetch(`https://fakestoreapi.com/${productId}`)
  .then((response) => response.json())
  .then(data => {
    console.log('Producto Encontrado:');
    const { id, title, price, description, category, image } = data;
    console.log(`Producto ID: ${id}`);
    console.log(`Título: ${title}`);
    console.log(`Precio: $${price}`);
    console.log(`Descripción: ${description}`);
    console.log(`Categoria: ${category}`);
    console.log(`Imagen: ${image}`);
  })
  .catch(error => {
    console.error("Error al obtener el producto", error);
  });

// POST - Agregar producto
if (command === 'POST' && endpoint === 'products') {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      price: Number(price),
      category
    })
  };
  fetch('https://fakestoreapi.com/products', config)
    .then((response) => response.json())
    .then((data) => console.log(data.id))
    .catch((error) => console.error(error));
} else {
  console.error('Comando o endpoint inválido');
}

//DELETE - ELIMINAR PRODUCTO
fetch('https://fakestoreapi.com/products/1', {
  method: 'DELETE'
})
  .then(response => response.json())
  .then(data => console.log(data));
  