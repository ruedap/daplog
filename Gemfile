source 'https://rubygems.org'

ruby '2.0.0'

gem 'unicorn', '4.6.3'

gem 'rails', '4.0.0'
gem 'sass-rails', '4.0.0'
gem 'uglifier', '2.2.1'
gem 'coffee-rails', '4.0.0'
gem 'jquery-rails', '3.0.4'
gem 'jbuilder', '1.5.1'
gem 'slim', '2.0.0'
gem 'slim-rails', '2.0.1'
gem 'kramdown', '1.2.0'
gem 'rouge', '1.0.0'
gem 'bourbon', '3.1.8'
gem 'neat', '1.4.0'
gem 'redis', '3.0.5'
gem 'rack-rewrite', '1.4.01'
gem 'coderay', '1.0.9'
gem 'browser', '0.2.1'
gem 'redis-objects', '0.7.0'
gem 'dm-core', '1.2.1'
gem 'dm-redis-adapter', '0.8.4'

group :production, :staging do
  gem 'rails_12factor', '0.0.2' # for Heroku assets precompile
  gem 'newrelic_rpm', '3.6.7.159'
end

group :development, :test do
  gem 'better_errors', '1.0.1'
end

group :development do
  gem 'binding_of_caller', '0.7.2'
  gem 'pry-rails', '0.3.2'
  gem 'foreman', '0.63.0'
  gem 'guard-livereload', '1.4.0'
  gem 'spring', '0.0.10'
end

group :test do
  gem 'rspec-rails', '2.14.0'
  gem 'capybara', '2.1.0'
  gem 'guard-rspec' # TODO: dm-redis-adapter dependency
  gem 'terminal-notifier-guard', '1.5.3'
  gem 'coveralls', '0.7.0', require: false
end
