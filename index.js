//Utilizamos destructuring para asignar los valores de los argumentos a variables (command, path, title, price, category).
const argumentos = process.argv.slice(2);
const [command, path, title, price, category] = argumentos;
//const productId = path;
// Extraer productId si path es como 'products/15'
const productId = path.includes('/') ? path.split('/')[1] : null;

switch (command) {
  case 'GET':
    if (path === 'products') {
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
      } else if (path.startsWith('products/')) {
        fetch(`https://fakestoreapi.com/products/${productId}`)
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
        }
        break;
  case 'POST':
    if (path === 'products') {
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
      console.error('Comando inválido');
    }
    break;
  case 'DELETE':
    if (path.startsWith('products/') && productId) {
      fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          console.log(`Producto eliminado con ID: ${productId}`);
          console.log('Respuesta de la API:', data);
        })
        .catch(error => {
          console.error('Error al eliminar el producto', error);
        });
    } else {
      console.error('Comando inválido');
    }
    break;
  default:
  console.error('Comando no válido');
}