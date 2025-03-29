// Головні структури даних
const products = new Map(); // ID → {name, price, stock}
const orders = new Set(); // Унікальні замовлення
const productHistory = new WeakMap(); // Історія змін
const users = new WeakSet(); // Всі користувачі

// Функція для створення унікального ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Додавання нового продукту
function addProduct(name, price, stock) {
    const id = generateId();
    const product = { name, price, stock };

    products.set(id, product);
    productHistory.set(product, [`Продукт створено: ${new Date()}`]);

    console.log(`✅ Додано продукт: ${name} (ID: ${id})`);
    return id;
}

// Видалення продукту за ID
function removeProduct(id) {
    if (products.has(id)) {
        products.delete(id);
        console.log(`❌ Продукт з ID ${id} видалено.`);
    } else {
        console.log(`⚠ Продукт не знайдено!`);
    }
}

// Оновлення інформації про продукт
function updateProduct(id, newPrice, newStock) {
    if (products.has(id)) {
        let product = products.get(id);
        product.price = newPrice;
        product.stock = newStock;

        productHistory.get(product).push(`Оновлено: ${new Date()}`);
        console.log(`🔄 Продукт ${product.name} оновлено!`);
    } else {
        console.log(`⚠ Продукт не знайдено!`);
    }
}

// Пошук продукту за назвою
function findProduct(name) {
    for (let [id, product] of products.entries()) {
        if (product.name.toLowerCase() === name.toLowerCase()) {
            console.log(`🔍 Знайдено продукт:`, product);
            return { id, ...product };
        }
    }
    console.log(`⚠ Продукт "${name}" не знайдено.`);
    return null;
}

// Оформлення замовлення
function placeOrder(user, productId, quantity) {
    if (!products.has(productId)) {
        console.log(`⚠ Продукт не знайдено.`);
        return;
    }

    let product = products.get(productId);
    if (product.stock < quantity) {
        console.log(`⚠ Недостатньо товару на складі.`);
        return;
    }

    product.stock -= quantity;
    orders.add({ user, productId, quantity, date: new Date() });
    users.add(user);

    console.log(`🛒 Замовлення оформлено: ${user.name} купив(ла) ${quantity}x ${product.name}.`);
}

// Виведення всіх продуктів
function showProducts() {
    console.log("📦 Каталог продуктів:");
    for (let [id, product] of products.entries()) {
        console.log(`ID: ${id}, Назва: ${product.name}, Ціна: ${product.price} грн, На складі: ${product.stock}`);
    }
}

// 🛍 Тестування програми
const user1 = { name: "Іван" };
const user2 = { name: "Марія" };

const id1 = addProduct("Ноутбук", 25000, 5);
const id2 = addProduct("Смартфон", 15000, 10);

showProducts();

updateProduct(id1, 23000, 4);
findProduct("Ноутбук");

placeOrder(user1, id1, 1);
placeOrder(user2, id2, 2);

removeProduct(id1);
showProducts();
