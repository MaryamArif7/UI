// middleware.js

// Function to fetch raw product data from the REST API
window.getProducts = async function() {
  const apiUrl = 'https://swiztek.com/wp-json/wc/v3/products';
  const username = 'test';
  const password = 'bE1u mZjZ MES5 DAvx 8lAI qoL5';
  const authHeader = 'Basic ' + btoa(username + ':' + password);

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return await response.json(); // Return raw product data
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

