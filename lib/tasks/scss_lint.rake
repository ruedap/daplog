require 'scss_lint/rake_task'

desc 'Run scss lint against SCSS files'
SCSSLint::RakeTask.new do |t|
  # FIXME: https://github.com/causes/scss-lint/issues/353
  # t.config = '.scss_lint.yml'
  t.files = ['app/assets/stylesheets']
end
