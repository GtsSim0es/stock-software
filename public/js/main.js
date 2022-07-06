
$(document).ready(function (e) {
    $("#divConteudo").hide();

    $("#btnMostrarEsconder").click(function (e) {
        $("#divConteudo").toggle();
    });
});

$(document).ready(function (i) {
    $(".divRem").hide();

    $("#btnRem").click(function (i) {
        $(".divRem").toggle();
    });
});

function previewImagem(){
    var imagem = document.querySelector('input[name=imagem]').files[0];
    var preview = document.querySelector('img');
    
    var reader = new FileReader();
    
    reader.onloadend = function () {
        preview.src = reader.result;
    }
    
    if(imagem){
        reader.readAsDataURL(imagem);
    }else{
        preview.src = "";
    }
}