new Vue({
  el: '#app',
  data: {
    // using a boolean to decide wheter we are displaying the card or not
    isShowingCart: false,

    cart: {
      items: []
    },
    products: [
      {
        id: 1,
        name: 'MacBook Pro (15 inch)',
        description: 'This laptop has a super crisp Retina display. Yes, we know that it\'s overpriced...',
        price: 2999,
        inStock: 50
      },
      {
        id: 2,
        name: 'Samsung Galaxy Note 7',
        description: 'Unlike the overpriced MacBook Pro, we\'re selling this one a bit cheap, as we heard it might explode...',
        price: 299,
        inStock: 755
      },
      {
        id: 3,
        name: 'HP Officejet 5740 e-All-in-One-printer',
        description: 'This one might not last for so long, but hey, printers never work anyways, right?',
        price: 149,
        inStock: 5
      },
      {
        id: 4,
        name: 'iPhone 7 cover',
        description: 'Having problems keeping a hold of that phone, huh? Ever considered not dropping it in the first place?',
        price: 49,
        inStock: 42
      },
      {
        id: 5,
        name: 'iPad Pro (9.7 inch)',
        description: 'We heard it\'s supposed to be pretty good. At least that\'s what people say.',
        price: 599,
        inStock: 0
      },
      {
        id: 6,
        name: 'OnePlus 3 cover',
        description: 'Does your phone spend most of its time on the ground? This cheap piece of plastic is the solution!',
        price: 19,
        inStock: 81
      }
    ]
  },

  methods: {
    addProductToCart(product) {
      const cartItem = this.getCartItem(product);
      if (!!cartItem !== false) {
        cartItem.quantity++;
      } else {
        this.cart.items.push({
          product,
          quantity: 1
        });
      }

      product.inStock -= 1;
    },

    getCartItem(product) {
      return this.cart.items.find((i) => {
        return i.product.id === product.id;
      })
    },

    increaseQuantity(cartItem) {
      cartItem.product.inStock--;
      cartItem.quantity++
    },

    decreaseQuantity(cartItem) {
      cartItem.product.inStock++;
      cartItem.quantity--;

      if (cartItem.quantity === 0) {
        this.removeItemFromCart(cartItem);
      }
    },

    removeItemFromCart(cartItem) {
      const index = this.cart.items.indexOf(cartItem)

      if (index >= 0) {
        this.cart.items.splice(index, 1)
      }
    },

    checkout() {
      if (confirm('You sure you want to purchase these products?')) {
        this.cart.items.forEach((item) => {
          item.product.inStock += item.quantity;
        });

        this.cart.items = [];
      }
    }

  },

  computed: {
    cartTotal() {
      return this.cart.items.reduce((total, item) => {
        return total + (item.quantity * item.product.price)
      }, 0);
    },

    taxAmount() {
      return ((this.cartTotal * 10) / 100);
    }
  },

  filters: {
    currency(value) {
      if (!value && value !== 0) {
        return;
      }
      const formatter = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      });

      return formatter.format(value)
    }
  }
});
