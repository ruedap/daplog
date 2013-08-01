if ENV['REDISCLOUD_URL']
  uri = URI.parse(ENV['REDISCLOUD_URL'])
  Redis.current = Redis.new(host: uri.host,
                            port: uri.port,
                            password: uri.password)
else
  Redis.current = Redis.new(host: 'localhost', port: 6379)
end
