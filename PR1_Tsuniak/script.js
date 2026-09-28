
const show = (id, value) => {
  document.getElementById(id).textContent =
    typeof value === "string" ? value : JSON.stringify(value, null, 2);
};


const products = [
  { name: "Ноутбук", category: "Електроніка", price: 32000, inStock: 5 },
  { name: "Смартфон", category: "Електроніка", price: 21000, inStock: 0 },
  { name: "Навушники", category: "Аксесуари", price: 2500, inStock: 12 },
  { name: "Миша", category: "Аксесуари", price: 700, inStock: 0 },
  { name: "Монітор", category: "Електроніка", price: 8900, inStock: 3 },
];

function getAvailableProducts(list) {
  return list.filter(p => p.inStock > 0);
}

function findProductByName(list, name) {
  const found = list.find(p => p.name.toLowerCase() === name.trim().toLowerCase());
  return found || "Товар не знайдено";
}

show("out1a", getAvailableProducts(products));
show("out1b", "Введіть назву товару");
document.getElementById("in1").addEventListener("input", e => {
  show("out1b", findProductByName(products, e.target.value));
});


const students = [
  { name: "Андрій", age: 19, grade: 87, group: "КН-11" },
  { name: "Марія", age: 20, grade: 95, group: "КН-12" },
  { name: "Ігор", age: 19, grade: 72, group: "КН-11" },
  { name: "Софія", age: 21, grade: 91, group: "КН-12" },
  { name: "Олег", age: 20, grade: 64, group: "КН-13" },
];

function groupBy(list) {
  return list.reduce((acc, student) => {
    if (!acc[student.group]) acc[student.group] = [];
    acc[student.group].push(student);
    return acc;
  }, {});
}

function sortStudentsByGrade(list) {
  return [...list].sort((a, b) => b.grade - a.grade);
}

show("out2a", groupBy(students));
show("out2b", sortStudentsByGrade(students));


const employees = [
  { name: "Петро", position: "Розробник", salary: 40000, years: 4 },
  { name: "Ганна", position: "Дизайнер", salary: 32000, years: 2 },
  { name: "Василь", position: "Тімлід", salary: 65000, years: 9 },
  { name: "Ірина", position: "Тестувальник", salary: 28000, years: 3 },
];

function getAverageSalary(list) {
  if (list.length === 0) return 0;
  return list.reduce((sum, e) => sum + e.salary, 0) / list.length;
}

function findMostExperiencedEmployee(list) {
  return list.reduce((best, e) => (e.years > best.years ? e : best));
}

show("out3", {
  середняЗарплата: getAverageSalary(employees),
  найдосвідченіший: findMostExperiencedEmployee(employees),
});


const books = [
  { title: "Захар Беркут", author: "Іван Франко", year: 1883, rating: 4.5, isRead: true },
  { title: "Мойсей", author: "Іван Франко", year: 1905, rating: 4.8, isRead: false },
  { title: "Борислав сміється", author: "Іван Франко", year: 1881, rating: 3.9, isRead: false },
  { title: "Тіні забутих предків", author: "Михайло Коцюбинський", year: 1911, rating: 4.7, isRead: true },
  { title: "Лісова пісня", author: "Леся Українка", year: 1911, rating: 4.0, isRead: false },
];

function getUnreadBooks(list) {
  return list.reduce((acc, b) => {
    if (!b.isRead) acc.push(b.title);
    return acc;
  }, []);
}

function getBooksByAuthor(list, author) {
  return list
    .reduce((acc, b) => {
      if (b.author.toLowerCase() === author.trim().toLowerCase()) acc.push(b);
      return acc;
    }, [])
    .sort((a, b) => a.year - b.year);
}

function getTopRatedBooks(list) {
  return list
    .reduce((acc, b) => {
      if (b.rating > 4) acc.push(b);
      return acc;
    }, [])
    .sort((a, b) => b.rating - a.rating);
}

show("out4a", getUnreadBooks(books));
show("out4c", getTopRatedBooks(books));
const renderAuthor = () => {
  const result = getBooksByAuthor(books, document.getElementById("in4").value);
  show("out4b", result.length ? result : "Книг цього автора не знайдено");
};
document.getElementById("in4").addEventListener("input", renderAuthor);
renderAuthor();

const orders = [
  { orderId: 1001, customer: { name: "Олена", email: "olena@mail.com" }, items: ["Ноутбук", "Миша"], total: 32700 },
  { orderId: 1002, customer: { name: "Тарас", email: "taras@mail.com" }, items: ["Навушники"], total: 2500 },
  { orderId: 1003, customer: { name: "Олена", email: "olena@mail.com" }, items: ["Монітор"], total: 8900 },
  { orderId: 1004, customer: { name: "Богдан", email: "bogdan@mail.com" }, items: ["Смартфон"], total: 21000 },
];

function getTotalSpentByCustomer(list, customerName) {
  return list
    .filter(o => o.customer.name.toLowerCase() === customerName.trim().toLowerCase())
    .reduce((sum, o) => sum + o.total, 0);
}

const renderSpent = () => {
  const name = document.getElementById("in5").value;
  show("out5", `${name || "—"}: ${getTotalSpentByCustomer(orders, name)} грн`);
};
document.getElementById("in5").addEventListener("input", renderSpent);
renderSpent();

const catalog = [
  { productId: 1, name: "Ноутбук", price: 32000 },
  { productId: 2, name: "Навушники", price: 2500 },
  { productId: 3, name: "Монітор", price: 8900 },
];

const purchases = [
  { purchaseId: 1, productId: 1, quantity: 2 },
  { purchaseId: 2, productId: 2, quantity: 5 },
  { purchaseId: 3, productId: 1, quantity: 1 },
  { purchaseId: 4, productId: 3, quantity: 3 },
  { purchaseId: 5, productId: 2, quantity: 2 },
];

function getTotalSales(productList, purchaseList) {
  return purchaseList.reduce((acc, purchase) => {
    const product = productList.find(p => p.productId === purchase.productId);
    if (product) {
      acc[product.name] = (acc[product.name] || 0) + product.price * purchase.quantity;
    }
    return acc;
  }, {});
}

show("out6", getTotalSales(catalog, purchases));