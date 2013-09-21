
namespace :redis do
  desc 'Delete all the keys of the currently selected DB.'
  task flushdb: :environment do
    print 'Delete all the keys of the currently selected DB... '
    puts Article.flushdb!
  end

  desc 'Rebuild for all articles'
  task rebuild: :environment do
    print 'Rebuilding... '
    print  Article.rebuild!
    puts ' articles completed!'
  end
end
