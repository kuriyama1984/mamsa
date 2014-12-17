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


var databases = [
    {id: '1001', type: 'eventbox', x: 100, y: 150, title: '調査内容1 ccc', text: 'ああああああ　いいいい　ううううう　ええええええ　おおお'},
    {id: '1002', type: 'eventbox', x: 100, y: 220, title: '調査内容2 ccc', text: 'いいいいいいいいいいいいいいいいいいいいいいいいいいいいい'},
    {id: '1003', type: 'eventbox', x: 300, y: 300, title: '調査内容3', text: '-----------------------------------'},
    {id: '1004', type: 'eventbox', x: 300, y: 380, title: '調査内容4', text: '-----------------------------------'},
    {id: '1005', type: 'line', x: 0, y: 0, title: '', text: '', from: '1001', to: '1003'},
    {id: '1006', type: 'arrow', x: 0, y: 0, title: '', text: '', from: '1002', to: '1003'},
    {id: '1007', type: 'arrow', x: 0, y: 0, title: '', text: '', from: '1004', to: '1001'}
];








window.addEventListener("load", function() {

    var maps = Object.create(mamsa.maps.prototype);
    var list = maps.init();

    maps.show(databases, {
        saveLine: function (lineObj) {
            console.log(lineObj);
        }
    });


}, true);



