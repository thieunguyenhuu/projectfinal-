//Add Cart
const index = async (req, res) => {
  const id = req.params.id;
  product.findOne({_id: id}, function (err, product) {
      if (err)
          console.log(err);

      if (typeof req.session.cart == "undefined") {
          req.session.cart = [];
          req.session.cart.push({
              id:id,
              title: p.slug,
              qty: 1,
              price: parseFloat(product.price).toFixed(2),
              image: '/product_images/' + product._id + '/' + product.image
          });
      } else {
          var cart = req.session.cart;
          var newItem = true;

          for (var i = 0; i < cart.length; i++) {
              if (cart[i].title == product.slug) {
                  cart[i].qty++;
                  newItem = false;
                  break;
              }
          }

          if (newItem) {
              cart.push({
                  id:id,
                  title: product.slug,
                  qty: 1,
                  price: parseFloat(product.price).toFixed(2),
                  image: '/product_images/' + product._id + '/' + prodcut.image
              });
          }
      }
      res.redirect('back');
  });
}
module.exports = { index, show };
