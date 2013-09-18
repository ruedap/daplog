class Article
  include Redis::Objects

  def self.clear!
    redis.flushdb
  end
end
