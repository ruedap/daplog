# <span>HerokuでRMagickを使おうとして</span><span>requireでハマった</span>

HerokuでRMagickを使おうとしてハマった。結論を先に書くと、`require`するときは小文字の`rmagick`じゃダメで、ちゃんとキャピタライズされた`RMagick`じゃないといけなかったみたい。MacとWindowsでローカルで使ってたときは小文字で普通に使えてたので、原因に気づくまでちょっと時間が掛かった。あと、Bundlerで`Bundler.require`するときも、そのままでは同じところでハマるので注意が必要。

<!-- READMORE -->

## 小文字は不正解

`require`に大文字が混じるのは、個人的にはなんとなくダサい感じがするので、小文字で動くなら小文字で書きたいところだけど、RMagickは許してくれなかった。

~~~ ruby
require 'rmagick'  #=> 不正解
require 'RMagick'  #=> 正解
~~~

前者だとHerokuではApplication Errorになる。エラー時のログの該当箇所を抜粋。

~~~ sh
[2011-04-07T02:35:04+00:00 app[web.1]: [/usr/ruby1.8.7/lib/ruby/site_ruby/1.8/rubygems/custom_require.rb:31:in `gem_original_require': no such file to load -- rmagick (LoadError)
~~~


## Bundler.require

Bundlerを使って`Bundler.require`する時もこれでハマるので、Gemfileの書き方をちょっと変える必要がある。

~~~ ruby
gem 'rmagick'                         #=> 不正解
gem 'rmagick', :require => 'RMagick'  #=> 正解
~~~

`Bundler.require`した時に、`RMagick`ではなく`rmagick`と記述してしまっているときのエラーは、前述のApplication ErrorではなくInternal Server Errorになるっぽい。

* * *

<cite>[RMagick 2.12.0: How to use RMagick](http://studio.imagemagick.org/RMagick/doc/usage.html)</cite>
