redis_url = ENV['REDISCLOUD_URL']

if redis_url
  uri = URI.parse(redis_url)
  Redis.current = Redis.new(
    host: uri.host,
    port: uri.port,
    password: uri.password
  )
  DataMapper.setup(:default, {
    adapter: 'redis',
    host: uri.host,
    port: uri.port,
    password: uri.password
  })
else
  Redis.current = Redis.new(host: 'localhost', port: 6379)
  DataMapper.setup(:default, { adapter: 'redis' })
end

