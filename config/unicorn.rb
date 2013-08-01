worker_processes Integer(ENV["WEB_CONCURRENCY"] || 3)
timeout 15
preload_app true

before_fork do |server, worker|
  if defined?(ActiveRecord::Base)
    ActiveRecord::Base.connection.disconnect!
    Rails.logger.info('Disconnected from ActiveRecord')
  end

  if defined?(Redis)
    Redis.current.quit
    Rails.logger.info('Disconnected from Redis')
  end
end

after_fork do |server, worker|
  if defined?(ActiveRecord::Base)
    ActiveRecord::Base.establish_connection
    Rails.logger.info('Connected to ActiveRecord')
  end

  if defined?(Redis)
    if ENV['REDISCLOUD_URL']
      uri = URI.parse(ENV['REDISCLOUD_URL'])
      Redis.current = Redis.new(host: uri.host,
                                port: uri.port,
                                password: uri.password)
    else
      Redis.current = Redis.new(host: 'localhost', port: 6379)
    end

    Rails.logger.info('Connected to Redis')
  end
end
