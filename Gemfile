source 'https://rubygems.org'

ruby '2.1.4'

gem 'unicorn', '4.8.3'

gem 'rails', '4.1.7'
gem 'sass', '3.4.13'
gem 'sass-rails', '5.0.1'
gem 'uglifier', '2.7.1'
gem 'coffee-rails', '4.1.0'
gem 'jquery-rails', '3.1.2'
gem 'jbuilder', '2.2.4'
gem 'slim', '3.0.3'
gem 'slim-rails', '3.0.1'
gem 'autoprefixer-rails', '5.1.7.1'
gem 'kramdown', '1.6.0'
gem 'rouge', '1.8.0'
gem 'redis', '3.2.1'
gem 'rack-rewrite', '1.5.1'
gem 'coderay', '1.1.0'
gem 'browser', '0.8.0'
gem 'redis-objects', '0.9.1'
gem 'dm-core', '1.2.1'
gem 'dm-redis-adapter', '0.8.4'
gem 'therubyracer', '0.12.1' # for Heroku
gem 'scss-lint', '0.33.0', require: false
gem 'emma-css-rails', '0.2.0.1'

group :production, :staging do
  gem 'rails_12factor', '0.0.3' # for Heroku assets precompile
  gem 'newrelic_rpm', '3.9.6.257'
end

group :development, :test do
  gem 'better_errors', '2.1.1'
end

group :development do
  gem 'binding_of_caller', '0.7.2'
  gem 'pry-rails', '0.3.3'
  gem 'rubocop', '0.28.0'
end

group :test do
  gem 'rspec-rails', '2.14.1'
  gem 'capybara', '2.2.0'
  gem 'guard-rspec' # TODO: dm-redis-adapter dependency
  gem 'terminal-notifier-guard', '1.5.3'
  gem 'coveralls', '0.7.1', require: false
  gem 'simplecov', '0.8.1', require: false
end
