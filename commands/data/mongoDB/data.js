database.mongoDB = [
    {
        title: "MongoDBのOSXへのインストール、ローカル環境",
        when: "2014/07/15",
        how: "MongoDBのOSXへのインストール、ローカル環境",
        url: "http://qiita.com/yoh-nak/items/f0c429f10347ae7ec98b",
        commands:[
            ["MacPorts（長時間）","$ sudo port install mongodb"],
            ["/var/lib/mongodbを作成","$ sudo mkdir /var/lib/mongodb"],
            ["/var/log/mongodb.logを作成","$ sudo touch /var/log/mongodb.log"],
            ["mongodbの起動","$ sudo mongod --dbpath /var/lib/mongodb --logpath /var/log/mongodb.log"],
            ["別のターミナルからmongoシェルを扱う","$ mongo"]
        ]
    }



    ,{
        title: "起動　プロセス確認　終了",
        when: "2014/07/19",
        how: "起動　プロセス確認　終了",
        url: "http://qiita.com/yoh-nak/items/f0c429f10347ae7ec98b",
        commands:[
            ["mongodbの起動","$ sudo mongod --dbpath /var/lib/mongodb --logpath /var/log/mongodb.log"],
            ["別のターミナルからmongoシェルを扱う","$ mongo"],
            ["プロセス確認","$ ps auxww | grep mongo | grep -v grep"],
            ["終了","> exit"]
        ]
    }






];