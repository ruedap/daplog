# redis_url = ENV['REDISCLOUD_URL']
redis_url = ENV['REDISTOGO_URL']

if redis_url
  uri = URI.parse(redis_url)
  Redis.current = Redis.new(host: uri.host,
                            port: uri.port,
                            password: uri.password)
else
  Redis.current = Redis.new(host: 'localhost', port: 6379)
end
