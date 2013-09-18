# specタスクでの冗長な出力（test:prepareの出力や実行するコマンドの表示など）を抑止します。
begin
  require 'rspec/core/rake_task'
  task(:spec).clear
  desc 'Run all specs in spec directory (excluding plugin specs)'
  RSpec::Core::RakeTask.new(:spec) do |t|
    t.verbose = false
  end
rescue LoadError
end
