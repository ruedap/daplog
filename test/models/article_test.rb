require 'test_helper'

describe Article do
  describe '.clear!' do
    before do
      @redis = Article.redis
      @redis.set('hoge', 'fuga')
    end

    it 'Redis.currentが空であること' do
      @redis.keys.wont_be_empty
      Article.clear!
      @redis.keys.must_be_empty
    end
  end
end
