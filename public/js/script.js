console.log("script loaded");
$.ajax({
    url: "http://192.168.33.10:3000/allProducts",
    type: "GET",
    dataType: "json",
    success: function(products){
        console.log(products);              

    },
    error: function(error){
        console.log("error");
        console.log(error);
    }         
});

$("#in-stock-button").click(function () { 
    window.location.replace("http://192.168.33.10:3000/inStock");
});

$("#out-of-stock-button").click(function () { 
    window.location.replace("http://192.168.33.10:3000/outOfStock");
});

