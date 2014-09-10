jQuery(function($) {
    "use strict";
    //socket.ioのサーバにに接続
    var socket = io.connect('http://' + location.host + '/');

    //サーバからmessageイベントが送信された時
    socket.on('mongo',function(data){
        $('#list').prepend($('<div/>').
        text(data.text + '___' + data.mongoTitle));
    });
    //sendボタンがクリックされた時
    $('#send2').click(function(){
        var text = $('#input2').val();
        if(text !== ''){
            //サーバにテキストを送信
            socket.emit('mongo',{text:text});
        }
    });

    //サーバからmessageイベントが送信された時
    socket.on('message',function(data){
        $('#list').prepend($('<div/>').text(data.text));
    });
    //sendボタンがクリックされた時
    $('#send').click(function(){
        var text = $('#input').val();
        if(text !== ''){
            //サーバにテキストを送信
            socket.emit('message',{text:text});
        }
    });

});


window.addEventListener("load", function() {
    canvas = document.getElementById("myCanvas");

    var maps = Object.create(mamsa.maps.prototype);
    var list = maps.init(canvas);
    maps.back(canvas);
    // maps.circle(canvas, 200, 200, 30, 2, 1, 1, 'hellow', '#FF00FF');

    var text = '問題発言のオンパレード';
    var textArray = 'はじめまして こんにちは ありがとうございました！！！！！<br /><a href="https://www.google.co.jp/" target=”_blank”>たすけてーーーーー</a>';
    maps.eventBox(300, 50, 1, text, textArray, '#FF00FF');

    // maps.shikaku(canvas, 400, 180, 1, 'test', '#00ffff', 300);


}, true);

