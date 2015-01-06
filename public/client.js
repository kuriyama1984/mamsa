jQuery(function($) {
    "use strict";
    // socket.ioのサーバにに接続
    var socket = io.connect('http://' + location.host + '/');

    // サーバからmessageイベントが送信された時
    socket.on('mongo',function(data){
        $('#list').prepend($('<div/>').
        text(data.text + '___' + data.mongoTitle));
    });
    // sendボタンがクリックされた時
    $('#send2').click(function(){
        var text = $('#input2').val();
        if(text !== ''){
            //サーバにテキストを送信
            socket.emit('mongo',{text:text});
        }
    });

    // サーバからmessageイベントが送信された時
    socket.on('message',function(data){
        $('#list').prepend($('<div/>').text(data.text));
    });
    // sendボタンがクリックされた時
    $('#send').click(function(){
        var text = $('#input').val();
        if(text !== ''){
            // サーバにテキストを送信
            socket.emit('message',{text:text});
        }
    });

});


var databases = [
    {id: 'ps01_10000000000001', circle: 'ps01_10000000000001', type: 'circle', x: 250, y: 300, r: 300, rotate: 40, stretch: 2, title: 'かてごり !!!', titleKana: 'カテゴリ', text: 'カテゴリの説明'},
    {id: 'ps01_10000000000002', circle: 'ps01_10000000000001', type: 'eventbox', x: 100, y: 150, r: 0, rotate: 0, stretch: 0, title: '調査内容1 ccc', titleKana: 'チョウサナイヨウ1', text: 'ああああああ　いいいい　ううううう　ええええええ　おおお'},
    {id: 'ps01_10000000000003', circle: 'ps01_10000000000001', type: 'eventbox', x: 100, y: 220, r: 0, rotate: 0, stretch: 0, title: '調査内容2 ccc', titleKana: 'チョウサナイヨウ2', text: 'いいいいいいいいいいいいいいいいいいいいいいいいいいいいい'},
    {id: 'ps01_10000000000004', circle: 'ps01_10000000000001', type: 'eventbox', x: 300, y: 300, r: 0, rotate: 0, stretch: 0, title: '調査内容3', titleKana: 'チョウサナイヨウ3', text: '-----------------------------------'},
    {id: 'ps01_10000000000005', circle: 'ps01_10000000000001', type: 'eventbox', x: 300, y: 380, r: 0, rotate: 0, stretch: 0, title: '調査内容4', titleKana: 'チョウサナイヨウ4', text: '-----------------------------------'},
    {id: 'ps01_10000000000006', circle: '', type: 'line', x: 0, y: 0, title: '', titleKana: '', text: '', from: 'ps01_10000000000002', to: 'ps01_10000000000004'},
    {id: 'ps01_10000000000007', circle: '', type: 'arrow', x: 0, y: 0, title: '', titleKana: '', text: '', from: 'ps01_10000000000003', to: 'ps01_10000000000004'},
    {id: 'ps01_10000000000008', circle: '', type: 'arrow', x: 0, y: 0, title: '', titleKana: '', text: '', from: 'ps01_10000000000005', to: 'ps01_10000000000002'},
    {id: 'ps01_10000000000009', circle: 'ps01_10000000000009', type: 'circle', x: 700, y: 300, r: 150, rotate: 20, stretch: 1.5, title: '分類２', titleKana: 'ブンルイ2', text: 'カテゴリの説明'}
];








window.addEventListener("load", function() {

    var maps = Object.create(mamsa.maps.prototype);
    var list = maps.init();

    maps.show(databases, {
        saveLine: function (lineObj) {
            console.log(lineObj);
        },
        save: function (_databases) {
            console.log(_databases);
        }
    });


}, true);



