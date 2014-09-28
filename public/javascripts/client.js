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
    // maps.eventBox2(300, 50, 1, text, textArray, '#FF00FF');

    // eventbox
    maps.eventBox('0001', 100, 50, '調査内容 ccc', 'mod');
    maps.eventBox('0002', 300, 50, 'おはよう cccxxx', 'view');


    // eventbox2
    maps.eventBox2('1001', 100, 150, '調査内容2 ccc', 'ああああああ　いいいい　ううううう　ええええええ　おおお', 'mod');
    // maps.eventBox2('1002', 300, 150, 'おはよう2 cccxxx', 'ああああああ　いいいい　ううううう　ええええええ　おおお', 'view');
}, true);



