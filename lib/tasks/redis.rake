
namespace :redis do
  desc 'Clear redis cache'
  task clear: :environment do
    print 'Clear redis cache... '
    Redis.current.flushdb
    puts 'completed!'
  end
end
