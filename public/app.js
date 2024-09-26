document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const showBooks = document.getElementById('showBooks');
    const showCart = document.getElementById('showCart');
    const showLogin = document.getElementById('showLogin');
    const showRegister = document.getElementById('showRegister');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    showBooks.addEventListener('click', fetchBooks);
    showCart.addEventListener('click', showCartContent);
    showLogin.addEventListener('click', () => {
        content.innerHTML = '';
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });
    showRegister.addEventListener('click', () => {
        content.innerHTML = '';
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    });

    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);

    function fetchBooks() {
        fetch('/books')
            .then(response => response.json())
            .then(books => {
                let html = '<h2>Livres disponibles</h2>';
                books.forEach(book => {
                    html += `
                        <div class="book">
                            <h3>${book.title}</h3>
                            <p>Auteur: ${book.author}</p>
                            <p>Prix: ${book.price} €</p>
                            <button onclick="addToCart(${book.id})">Ajouter au panier</button>
                        </div>
                    `;
                });
                content.innerHTML = html;
            })
            .catch(error => {
                content.innerHTML = `<p>Erreur: ${error.message}</p>`;
            });
    }

    function showCartContent() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let html = '<h2>Votre panier</h2>';
        if (cart.length === 0) {
            html += '<p>Votre panier est vide.</p>';
        } else {
            cart.forEach(item => {
                html += `
                    <div class="cart-item">
                        <h3>${item.title}</h3>
                        <p>Quantité: ${item.quantity}</p>
                        <p>Prix: ${item.price * item.quantity} €</p>
                    </div>
                `;
            });
            html += `<button onclick="checkout()">Passer la commande</button>`;
        }
        content.innerHTML = html;
    }

    function handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        console.log('Tentative de connexion avec:', { email, password });
    
        fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                alert('Connexion réussie !');
                fetchBooks();
            } else {
                alert('Échec de la connexion. Veuillez réessayer.');
            }
        })
        .catch(error => {
            console.error('Erreur de connexion:', error);
            alert('Une erreur est survenue lors de la connexion: ' + (error.error || error.message));
        });
    }

    function handleRegister(e) {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const firstName = document.getElementById('registerFirstName').value;
        const lastName = document.getElementById('registerLastName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
    
        console.log('Données d\'inscription:', { username, firstName, lastName, email, password });
    
        fetch('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, first_name: firstName, last_name: lastName, email, password })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
        .then(data => {
            console.log('Réponse du serveur:', data);
            alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Une erreur est survenue lors de l\'inscription: ' + (error.error || error.message));
        });
    }

    window.addToCart = function(bookId) {
        fetch(`/books/${bookId}`)
            .then(response => response.json())
            .then(book => {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existingItem = cart.find(item => item.id === book.id);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({ ...book, quantity: 1 });
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                alert('Livre ajouté au panier !');
            })
            .catch(error => {
                alert(`Erreur: ${error.message}`);
            });
    };

    window.checkout = function() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert('Votre panier est vide.');
            return;
        }

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const order = {
            user_id: 1, // À remplacer par l'ID de l'utilisateur connecté
            status: 'pending',
            total_price: total,
            books: cart.map(item => ({ book_id: item.id, quantity: item.quantity }))
        };

        fetch('/orders/create', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(order)
        })
        .then(response => response.json())
        .then(data => {
            alert(`Commande créée avec succès ! ID de la commande : ${data.order.id}`);
            localStorage.removeItem('cart');
            showCartContent();
        })
        .catch(error => {
            alert(`Erreur lors de la création de la commande : ${error.message}`);
        });
    };

    // Charger la liste des livres au démarrage
    fetchBooks();
});