function updateDemo(content) {
  const demoDiv = document.getElementById("demo");
  demoDiv.innerHTML = content;
}

async function getAllProducts() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    let content = "<h2>All Products:</h2>";
    response.data.forEach((product) => {
      content += `<p><strong>Title:</strong> ${product.title}, <strong>Body:</strong> ${product.body}</p>`;
    });
    updateDemo(content);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getFilteredProducts(filter) {
  if (!filter) {
    // Check if filter is not provided
    filter = prompt("Enter user ID to filter products:");
    if (filter === null) return; // Exit function if user cancels prompt
  }

  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${filter}`
    );
    let content = `<h2>Filtered Products (User ID: ${filter}):</h2>`;
    response.data.forEach((product) => {
      content += `<p><strong>Title:</strong> ${product.title}, <strong>Body:</strong> ${product.body}</p>`;
    });
    updateDemo(content);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function deleteProduct() {
  const productId = prompt("Enter product ID:");
  if (productId !== null) {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${productId}`
      );
      updateDemo(`<p>Product with ID ${productId} has been deleted.</p>`);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }
}

async function addProduct() {
  const userId = prompt("Enter user ID:");
  const title = prompt("Enter product title:");
  const body = prompt("Enter product body:");

  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        userId: userId,
        title: title,
        body: body,
      }
    );
    updateDemo(
      `<p>New product added:</p><p><strong>Title:</strong> ${response.data.title}, <strong>Body:</strong> ${response.data.body}</p>`
    );
  } catch (error) {
    console.error("Error adding product:", error);
  }
}

async function editProduct() {
  const productId = prompt("Enter product ID:");
  const title = prompt("Enter new title:");
  const body = prompt("Enter new body:");

  try {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${productId}`,
      {
        title: title,
        body: body,
      }
    );
    updateDemo(
      `<p>Product with ID ${productId} has been edited:</p><p><strong>Title:</strong> ${response.data.title}, <strong>Body:</strong> ${response.data.body}</p>`
    );
  } catch (error) {
    console.error("Error editing product:", error);
  }
}
