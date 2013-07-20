
namespace :redis do
  desc 'Clear redis cache'
  task clear: :environment do
    print 'Clear redis cache... '
    REDIS.flushdb
    puts 'completed!'
  end
end
