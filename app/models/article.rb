class Article
  include Redis::Objects
  include DataMapper::Resource

  # datamapper fields, just used for .create
  property :id, Serial
  property :date, DateTime
  property :body, Text
  property :path, String
  property :title, String

  # use redis-objects fields for everything else
  counter :view_count, start: 0  # TODO

  # Public: 選択されているRedis DBの全データを消去します。
  #
  # 実行結果をStringで返します。
  def self.flushdb!
    redis.flushdb
  end
end
