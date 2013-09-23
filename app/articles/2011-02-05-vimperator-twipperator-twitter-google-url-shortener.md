# <span>Twittperatorで今見てるページを</span><span>短縮URLに変換してツイートする</span>

[以前書いたTwittperatorの記事](/2011/01/22/vimperator-twitter-plugin-twittperator)で、今見ているページのタイトルとURLを付けてツイートするやり方を書いたけど、URLを含めて140文字を超えるとつぶやけなかった（当たり前）。で、URLは短縮URLとかに変換してるわけじゃないので、ちょっと長めのURLのページだとほとんどつぶやけなかったんだけど、今回はそれを改善してみた。
<!-- READMORE -->

## 前のバージョン
[前の記事](/2011/01/22/vimperator-twitter-plugin-twittperator)では以下のように書いていた。

~~~ vim
nnoremap ,tp :<C-u>js commandline.open(":",["tw",buffer.title,buffer.URI].join(" "),modes.EX)<CR><C-a><Right><Right><Right><Space>/<Space><Left><Left><Left>
~~~

でもこれだと、タイトルやURLが長いページだったりすると、コメント付きで投稿すると140文字を超えてしまって、エラーになる。

~~~ sh
Twitter API Error: statuses/update
~~~


## 短縮URL変換バージョン

で、URLを短縮URLに変換するようにすれば、この問題は結構改善すると思ったので、コマンドを打ったらURLを短縮URLに変換した上でコマンドラインに挿入するバージョンを作ってみた。ただ、Vimperatorの関数作成とかよくわかってないので、いろいろ間違ってるかもしれない。まぁ、とりあえず動いたのでよし。

これを作成するに当たって、id:teramakoさんが書かれた[goo.gl用の短縮URL変換JavaScriptコード](https://gist.github.com/774165)がとても参考になった。ありがとうございます。というわけで、以下のコードを`.vimperatorrc`にぺたっと貼って

~~~ vim
""" twittperator.js
nmap ,tt :<C-u>tw<Space>
nmap ,tf :<C-u>tw!<CR>
nmap ,tu :<C-u>tw!@<CR>
nmap ,tp :<C-u>twuri<CR><C-a><Right><Right><Right>
js <<EOM
commands.addUserCommand(
    ["twuri"],
    "Twittperator tweet with URI",
    function(){
        let uri = 'https://www.googleapis.com/urlshortener/v1/url';
        let xhr = new XMLHttpRequest();
        xhr.open("post", uri, false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({ longUrl: buffer.URI }));
        let result = JSON.parse(xhr.responseText).id;
        commandline.open(":",["tw"," /",buffer.title,result].join(" "),modes.EX);
    }
);
EOM
~~~

これで、ツイートしたいページを開いた状態で、コマンドを発動（上の例では<kbd>,tp</kbd>）すれば、以下のようにgoo.glの短縮URLに変換した上でコマンドラインに挿入される。

* * *

<cite>[gist: 774165 - goo.glの短縮URLに変換するvimperatorの設定- GitHub](https://gist.github.com/774165)</cite>
