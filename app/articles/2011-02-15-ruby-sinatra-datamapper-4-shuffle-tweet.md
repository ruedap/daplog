# <span>SinatraからDataMapperを使う(4)</span><span> シャッフルツイート機能</span>

[前回](/2011/02/14/ruby-sinatra-datamapper-3-validation)までで、DataMappterを使う上での基本的なポイントは抑えたので、今回は本来の目的であるTwitter Botでのシャッフルツイート機能のロジック部分に着手する。

<!-- READMORE -->


## シャッフルツイートの基本仕様

シャッフルツイート機能は、以下のような仕様を持つ。

1. データベースにツイートする順番の値を持つカラムがある（今回は`tweet_num`カラム）
2. `tweet_num`カラムの初期値はゼロ
3. 全レコードの中で、`tweet_num`カラムに1以上の値を持つレコードが1つもなかったら、シャッフルされた値を全レコードに挿入する
4. ツイートは、`tweet_num`カラムで最も大きな値を持つレコードの名言をツイートする
5. ツイートが正常に行われたら、そのレコードの`tweet_num`の値はゼロになる
6. 最終的に全レコードがツイートされたら、すべての`tweet_num`の値がゼロになるので、(3)の状態になり、再度シャッフルされる


## 基本仕様の実装

シャッフルツイートの基本仕様を実装するコードは以下のようになる。ほぼすべて`tweet.rb`内で収まる。

~~~ ruby
require 'rubygems'
require 'twitter'
require 'config/local_env.rb' unless ENV['OAUTH_TOKEN_SECRET']
class Tweet
  attr_reader :message
  def initialize
    Twitter.configure do |config|
      config.consumer_key       = ENV['CONSUMER_KEY']
      config.consumer_secret    = ENV['CONSUMER_SECRET']
      config.oauth_token        = ENV['OAUTH_TOKEN']
      config.oauth_token_secret = ENV['OAUTH_TOKEN_SECRET']
    end
    shuffle if empty?
  end
  def shuffle
    @post = Post.all
    s = (1..@post.size).to_a.shuffle
    @post.each do |post|
      post.tweet_num = s.shift unless s.empty?
    end
    @post.save
  end
  def empty?
    Post.all.find {|post| post.tweet_num > 0 }.nil?
  end
  def tweet
    t = get_tweet
    r = tweet_to_twitter t.title
    set_tweet_num t unless r.nil?
  end
  private
  def get_tweet
    shuffle if empty?
    Post.all(:tweet_num.gt => 0, :order => [:tweet_num.desc]).first
  end
  def tweet_to_twitter tweet
    return nil unless tweet
    begin
      Twitter.update tweet.chomp
    rescue => ex
      @message = ex.message
      nil
    end
  end
  def set_tweet_num record
    record.tweet_num = 0
    record.save
  end
end
~~~

* * *

<cite>[DataMapper を使う (Finding) - KrdLabの不定期日記](http://d.hatena.ne.jp/KrdLab/20090809/1250007554)</cite>

