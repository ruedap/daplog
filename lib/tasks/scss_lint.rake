begin
  require 'scss_lint/rake_task'

  desc 'Run scss lint against SCSS files'
  SCSSLint::RakeTask.new do |t|
    t.files = ['app/assets/stylesheets']
  end
rescue LoadError
  # puts 'LoadError: cannot load such file -- scss_lint/rake_task'
end
