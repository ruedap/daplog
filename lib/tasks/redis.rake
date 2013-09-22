
namespace :redis do
  desc 'Delete all the keys of the currently selected DB.'
  task flushdb: :environment do
    print 'Delete all the keys of the currently selected DB... '
    puts Article.flushdb!
  end

  desc 'Rebuild for all articles'
  task rebuild: :environment do
    print 'Rebuilding... '
    result =  Article.rebuild!
    puts "#{result} articles completed!" unless result == 'NG'
    puts result
  end
end
