const socket = io();

const btnForm = document.getElementById('btn-form');
const form = document.getElementById('add-prod');

const newProd = e => {
	e.preventDefault();
	const data = new FormData(form);
	const prod = {
		title: data.get('title'),
		description: data.get('description'),
		category: data.get('category'),
		price: data.get('price'),
		code: data.get('code'),
		stock: data.get('stock')
	};
	socket.emit('addProd', prod);
	form.reset();
};

const delProd = async e => socket.emit('delProd', e.target.id);

socket.on('products', products => {
	const productsContainer = document.getElementById('products-container');
	productsContainer.innerHTML = '';
	for (const prod of products) {
		productsContainer.innerHTML += `
			<div>
            	<h2>${prod.title}</h2>
            	<p><b>Description:</b> ${prod.description}</p>
            	<p><b>Category:</b> ${prod.category}</p>
            	<p><b>Price: $</b>${prod.price}</p>
            	<p><b>Code:</b> ${prod.code}</p>
            	<p><b>Stock:</b> ${prod.stock}</p>
            	<button id=${prod.id} class='btn-del'>Eliminar</button>
        	</div>
		`;
	}
});

document.addEventListener('click', e => e.target.matches('.btn-del') && delProd(e));
btnForm.addEventListener('click', newProd);
