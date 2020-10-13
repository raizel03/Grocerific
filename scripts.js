$(document).ready(function(){

    //Function to display the product list from the database
    $(function ProductList(){

        //Getting the data to display on the table
        $.ajax({
            type: "GET",
            url: "products/all.php",
            dataType:"JSON",

            success: function(data){
                var string = JSON.stringify(data);
                var products = JSON.parse(string);
                var totalProd = products.length - 1;
            
                for(var x = 0; x <= totalProd; x++){

                    var tblRow = "<tr>";

                    tblRow += "<td>" + products[x]['id'] + "</td>";
                    tblRow += "<td>" + products[x]['description'] + "</td>";
                    tblRow += "<td>" + products[x]['size'] + "</td>"; 
                    tblRow += "<td>" + products[x]['price'] + "</td>";                
                    tblRow += "<td class='text-center'><button data-id='" + products[x]['id'] + "' data-description='" + products[x]['description'] + "' data-size='" + products[x]['size'] 
                        + "'data-price='" + products[x]['price'] + "' class='btn btn-default btn-sm btnEdit' data-toggle='modal' data-target='#updateModal'><span class='glyphicon glyphicon-pencil'></span></button>"; 
                    tblRow += "<button data-id='" + products[x]['id'] + "' data-description='" + products[x]['description']
                        + "' class='btn btn-default btn-sm btnDelete' data-toggle='modal' data-target='#deleteModal'><span class='glyphicon glyphicon-trash'></span></button></td>";
                    tblRow += "</tr>";

                    $("#productList").append(tblRow);
                }
            }
        });
    });

    //Function to add new products to the database
    $(document).on("click", "#btnAdd", function(){
        var txtDescription = $("#txtDescription").val();
        var txtSize = $("#txtSize").val();
        var txtPrice = $("#txtPrice").val();

        if(isEmptyOrSpaces(txtDescription) || isEmptyOrSpaces(txtSize) || isEmptyOrSpaces(txtPrice)){
            $("#addmsg").html("Please fill up all blank fields");
            $("#addmsg").css({color : "red"});
        }

        else{      
            $.ajax({
                type: "POST",
                url: "products/new.php",
                data: {
                    description : txtDescription,
                    size : txtSize,
                    price : txtPrice
                },
                
                success: function(data){
                    $("#addmsg").html("Product Saved!");
                    $("#addmsg").css({color : "green"});
                }
            });
        }
    });
    
    //Close and reload Add Product Modal
    $(document).on("click", "#btnClose", function(){
        location.reload();
    });

    //To display the product to be edited
    $(document).on("click", ".btnEdit", function(){
        var id = $(this).data('id');
        var description = $(this).data('description');
        var size = $(this).data('size');
        var price = $(this).data('price');

        $("#updateID").val(id);
        $("#updateDesc").val(description);
        $("#updateSize").val(size);
        $("#updatePrice").val(price);

    });

    //To save the product that was updated
    $(document).on("click", "#btnUpdate", function(){
        var updateID = $("#updateID").val();
        var updateDesc = $("#updateDesc").val();
        var updateSize = $("#updateSize").val();
        var updatePrice = $("#updatePrice").val();

        if(isEmptyOrSpaces(updateDesc) || isEmptyOrSpaces(updateSize) || isEmptyOrSpaces(updatePrice)){
            $("#updatemsg").html("Please fill up all blank fields");
            $("#updatemsg").css({color : "red"});
        }

        else{
            $.ajax({
                type: "POST",
                url: "products/update.php",
                data: {
                    id : updateID,
                    description : updateDesc,
                    size : updateSize,
                    price : updatePrice
                },
                
                success: function(data){
                    $("#updatemsg").html("Product Updated!");
                    $("#updatemsg").css({color : "green"});
                }
            });
        }
        
    });

    //Close and reload Update modal
    $(document).on("click", "#btnExitUpdate", function(){
        location.reload();
    });

    //To display the product to be deleted
    $(document).on("click", ".btnDelete", function(){
        var delID = $(this).data('id');
        var delDescription = $(this).data('description');

        $("#delID").val(delID);
        $("#delDescription").val(delDescription);
    }); 
    

    //To delete the selected product
    $(document).on("click", "#btnDelete", function(){
        var delID = $("#delID").val();

        $.ajax({
            type: "GET",
            url: "products/delete.php",
            data: {
                id : delID
            },
            
            success: function(data){
                $("#deletemsg").html("Product Deleted!");
            }
        });
    });

    //Close and reload Delete modal
    $(document).on("click", "#btnExitDelete", function(){
        location.reload();
    });

    //Check for invalid input or whitespaces
    function isEmptyOrSpaces(str){
        return str === null || str.match(/^ *$/) !== null;
    }
});