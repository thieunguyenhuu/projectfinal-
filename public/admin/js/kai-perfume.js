$(document).ready(function () {
  //admin-user
  $("body").on("click", ".js-btn-edit-user", function (e) {
    e.preventDefault();
    let userId = $(this).attr("data-id");

    $.ajax({
      type: "get",
      url: `get-user/${userId}`,
      dataType: "json",
      success: function (response) {
        if (response.status === 200) {
          const user = response.data;
          $("#form-edit-user").attr("action", `update-user/${user.id}`);
          $("#form-edit-user input[name=name]").val(user.name);
          $("#form-edit-user input[name=email]").val(user.email);
          $("#form-edit-user input[name=phoneNumber]").val(user.phoneNumber);
          $("#form-edit-user textarea[name=address]").val(user.address);
          $("#modal-edit-user").modal("show");
        }
      },
    });
  });
  $("body").on("click", ".js-btn-delete-user", function (e) {
    e.preventDefault();
    let userId = $(this).attr("data-id");

    $("#form-submit-delete").attr("action", `delete-user/${userId}`);
  });

  //admin-producer
  $("body").on("click", ".js-btn-edit-producer", function (e) {
    e.preventDefault();
    let producerId = $(this).attr("data-id");

    $.ajax({
      type: "get",
      url: `get-producer/${producerId}`,
      dataType: "json",
      success: function (response) {
        if (response.status === 200) {
          const producer = response.data;
          $("#form-edit-producer").attr(
            "action",
            `update-producer/${producer.id}`
          );
          $("#form-edit-producer input[name=name]").val(producer.name);
          $("#form-edit-producer input[name=country]").val(producer.country);
          $("#modal-edit-producer").modal("show");
        }
      },
    });
  });
  $("body").on("click", ".js-btn-delete-producer", function (e) {
    e.preventDefault();
    let producerId = $(this).attr("data-id");

    $("#form-submit-delete").attr("action", `delete-producer/${producerId}`);
  });

  //admin-product
  $("body").on("click", ".js-btn-edit-product", function (e) {
    e.preventDefault();
    let productId = $(this).attr("data-id");

    $.ajax({
      type: "get",
      url: `get-product/${productId}`,
      dataType: "json",
      success: function (response) {
        if (response.status === 200) {
          const product = response.data;
          $("#form-edit-product").attr(
            "action",
            `update-product/${product.id}`
          );
          $("#form-edit-product input[name=name]").val(product.name);
          $("#form-edit-product input[name=inStock]").val(product.inStock);
          $("#form-edit-product select[name=categoryId]").val(
            product.categoryId
          );
          $("#form-edit-product select[name=producerId]").val(
            product.producerId
          );
          $("#form-edit-product input[name=price]").val(product.price);
          $("#form-edit-product select[name=isActive]").val(
            product.isActive + ""
          );
          $("#form-edit-product textarea[name=description]").val(
            product.description
          );
          $("#modal-edit-product").modal("show");
        }
      },
    });
  });
  $("body").on("click", ".js-btn-delete-product", function (e) {
    e.preventDefault();
    let productId = $(this).attr("data-id");

    $("#form-submit-delete").attr("action", `delete-product/${productId}`);
  });
  $("body").on("change", ".js-update-product-active", function (e) {
    e.preventDefault();
    let productId = $(this).val();
    let isActive = $(this).prop("checked");

    $.ajax({
      type: "post",
      url: "update-product-active",
      data: { isActive, productId },
      dataType: "json",
      success: function (response) {
        if (!response.success) {
          alert(response.message);
        }
      },
    });
  });

  //admin-rating
  $("body").on("click", ".js-btn-delete-rating", function (e) {
    e.preventDefault();
    let ratingId = $(this).attr("data-id");

    $("#form-submit-delete").attr("action", `delete-rating/${ratingId}`);
  });
  $("body").on("change", ".js-update-rating-active", function (e) {
    e.preventDefault();
    let ratingId = $(this).val();
    let isActive = $(this).prop("checked");

    $.ajax({
      type: "post",
      url: `update-rating/${ratingId}`,
      data: { isActive },
      dataType: "json",
      success: function (response) {
        if (!response.success) {
          alert(response.message);
        }
      },
    });
  });

  //admin-order
  $("body").on("change", ".js-select-change-orderstatus", function (e) {
    e.preventDefault();
    let orderId = $(this).attr("data-id");
    let statusId = $(this).val();

    $.ajax({
      type: "post",
      url: `update-order/${orderId}`,
      data: { statusId },
      dataType: "json",
      success: function (response) {
        if (response.success) {
          location.reload();
        } else {
          alert(response.message);
        }
      },
    });
  });

  $("body").on("click", ".js-btn-view-orderDetail", function (e) {
    e.preventDefault();
    let code = $(this).attr("data-code");

    $.ajax({
      type: "post",
      url: "get-order",
      data: { code },
      dataType: "json",
      success: function (response) {
        if (response.success) {
          const {
            id,
            code,
            receiverName,
            receiverEmail,
            receiverPhoneNumber,
            receiverAddress,
            discountCode,
            discountPercent,
            total,
            discount,
            totalAmount,
            reasonCancel,
            OrderStatus,
          } = response.data;
          $("#order-code").html(`#${code}`);
          $("#order-status").html(OrderStatus.name);
          $("#receiver-name").html(receiverName);
          $("#receiver-email").html(receiverEmail);
          $("#receiver-phone-number").html(receiverPhoneNumber);
          $("#receiver-address").html(receiverAddress);
          $("#total").html(`${total} VND`);
          $("#discount-code").html(discountCode);
          $("#discount-percent").html(`${discountPercent}%`);
          $("#discount").html(discount);
          $("#total-amount").html(`${totalAmount} VND`);
          $("#modal-order-detail").modal("show");
          $.ajax({
            type: "get",
            url: "order-detail/1",
            dataType: "json",
            success: function (response) {
              if (response.success) {
                const { quantity, price, Products } = response.data;
              } else {
                alert(response.message);
              }
            },
          });
        } else {
          alert(response.message);
        }
      },
    });
  });
});
