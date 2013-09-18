
namespace :redis do
  desc 'Delete all the keys of the currently selected DB.'
  task clear: :environment do
    print 'Delete all the keys of the currently selected DB... '
    puts Article.clear!
  end
end
