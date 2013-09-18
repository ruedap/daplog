
namespace :redis do
  desc 'Delete all the keys of the currently selected DB.'
  task flushdb: :environment do
    print 'Delete all the keys of the currently selected DB... '
    puts Article.flushdb!
  end
end
