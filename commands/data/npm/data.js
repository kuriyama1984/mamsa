database.npm= [
    {
        title: 'npmでpackageをインストールする',
        when: '2014/07/15',
        how: 'npm initは対話形式でprojectの初期設定を行うためのcommandです。<br />実行すると対話形式で項目を入力して、package.jsonを作成します。<br />package.jsonはprojectのpackageを管理するためのファイルです。<br />mavenで言うところのpom.xmlです。<br />package.jsonはnode.jsのlibraryを公開する時のファイルなので、licenseなどが入ります。<br />だ、ここでは公開するlibraryを作っているわけではなく、開発環境としてnpmを使いたいだけなので、ほとんど削除してかまわないでしょう。<br />適当に項目を削ったのが、以下のpackage.jsonです。<br /><br />{<br />"name": "sample",<br />"version": "0.0.0",<br />"description": ""<br />}',
        url: 'http://qiita.com/sinmetal/items/395edf1d195382cfd8bc',
        commands:[
            ["package.jsonの作成","$ npm init"]
        ]
    }


];