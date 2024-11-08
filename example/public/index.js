// Background color management for the page (Associated with page body class and background)
function pageBackground() {
  return {
    bgColor: 'bg-white', // Background color applied to the body
    colors: ['bg-pink-100', 'bg-blue-100', 'bg-green-100', 'bg-yellow-100'], // Set of pastel background colors
    currentColorIndex: 0,

    // Changes background color of the page every 3 seconds (affects body class)
    changeBackground() {
      setInterval(() => {
        this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
        this.bgColor = this.colors[this.currentColorIndex];
      }, 3000);
    }
  }
}

// To-Do List widget (Container 1) logic (Associated with container p1c1_container and its elements)
function todoApp() {
  return {
    newTask: '',
    tasks: [
      { text: 'Sample Task 1', editing: false },
      { text: 'Sample Task 2', editing: false }
    ],
    isClicked: false,

    // Add new task
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push({ text: this.newTask, editing: false });
        this.newTask = '';
      }
    },

    // Delete task
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },

    // Edit task
    editTask(index) {
      this.tasks[index].editing = true;
    },

    // Save edited task
    saveTask(task) {
      task.editing = false;
    },

    // Toggle glow effect with logging
    glowCard() {
      this.isClicked = !this.isClicked;
      console.log('isClicked:', this.isClicked); // Debug to check toggle
    }
  };
}

// Currency Exchange widget (Container 2) logic (Associated with container p1c2_container and its elements)
function exchangeRateApp() {
  return {
    sourceCurrency: 'AED', // Source currency dropdown (Dropdown ID: p1c2wg1s1_sourceCurrency)
    destinationCurrency: 'AED', // Destination currency dropdown (Dropdown ID: p1c2wg1s2_destinationCurrency)
    sourceAmount: 0, // Amount input (Input ID: p1c2wg1t1_amountInput)
    currentRate: 1, // Displays current exchange rate (Paragraph ID: p1c2wg1p1_executiveRate)
    highlighted: false, // Controls highlight for result field (Input ID: p1c2wg1t2_exchangeResult)

    // Calculate the destination amount dynamically based on selected currencies
    get destinationAmount() {
      return (this.sourceAmount * this.currentRate).toFixed(2);
    },

    // Calculate exchange rate based on selected source and destination currencies
    calculateRate() {
      if (this.sourceCurrency === 'AED' && this.destinationCurrency === 'USD') {
        this.currentRate = 0.27;
      } else if (this.sourceCurrency === 'USD' && this.destinationCurrency === 'AED') {
        this.currentRate = 3.67;
      } else if (this.sourceCurrency === 'AED' && this.destinationCurrency === 'EUR') {
        this.currentRate = 0.23;
      } else if (this.sourceCurrency === 'EUR' && this.destinationCurrency === 'AED') {
        this.currentRate = 4.35;
      } else if (this.sourceCurrency === this.destinationCurrency) {
        this.currentRate = 1;
      }
    },

    // Highlight the exchange result field for 3 seconds (Input ID: p1c2wg1t2_exchangeResult)
    highlightValue() {
      this.highlighted = true;
      setTimeout(() => {
        this.highlighted = false;
      }, 3000);
    }
  }
}

// World Time widget (Container 3) logic (Associated with container p1c3_container and its elements)
function worldTimeApp() {
  return {
    selectedTimezone: 'Africa/Abidjan',
    formattedTime: '',

    // Determine background color class
    backgroundColorClass() {
      if (this.selectedTimezone === 'Asia/Dubai') return 'bg-yellow-100';
      if (this.selectedTimezone === 'Europe/London') return 'bg-blue-100';
      return 'bg-white';
    },

    // Update the time display based on the selected timezone
    updateTime() {
      setInterval(() => {
        const date = new Date().toLocaleString('en-US', {
          timeZone: this.selectedTimezone,
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        });
        this.formattedTime = date;
      }, 1000);
    }
  };
}




// Dynamic Data List widget (Container 4) logic
function dynamicData() {
  return {
    dataList: [], // List of products

    // Initialize and fetch products
    async generateData() {
      const products = await window.getProducts(); // Call the globally available function
      this.dataList = products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price
      })); // Map the raw data to the desired structure
    }
  }
}

// Language translation code

let defaultLang = 'zh';

const loadTranslations = async (lang) => {
  const response = await fetch(`lang/${lang}.json`);
  const translations = await response.json();
  
  document.querySelectorAll('[data-translate]').forEach((element) => {
    const key = element.getAttribute('data-translate');
    
    // Update text content or placeholder based on element type
    if (element.tagName === 'INPUT' && element.type === 'text') {
      element.placeholder = translations[key] || key;
    } else {
      element.textContent = translations[key] || key;
    }
  });
};

// Load default language translations on page load
loadTranslations(defaultLang);

// Optionally, you can add a function to change the language dynamically
const setLanguage = (lang) => {
  loadTranslations(lang);
};
