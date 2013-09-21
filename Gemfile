source 'https://rubygems.org'

ruby '2.0.0'

gem 'unicorn'

gem 'rails', '4.0.0'
gem 'sass-rails', '~> 4.0.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.0.0'
gem 'jquery-rails'
gem 'jbuilder', '~> 1.2'
gem 'slim', '~> 2.0.0'
gem 'slim-rails', '~> 2.0.1'
gem 'kramdown', '~> 1.2.0'
gem 'rouge', '~> 0.5.3'
gem 'ruby_front_matter', '~> 0.0.1'
gem 'bourbon', '~> 3.1.8'
gem 'neat', '~> 1.3.0'
gem 'redis', '~> 3.0.4'
gem 'rack-rewrite', '~> 1.3.3'
gem 'sentry-raven'
gem 'coderay', '~> 1.0.9'
gem 'browser', '~> 0.2.0'
gem 'redis-objects', '0.7.0'
gem 'dm-core', '1.2.1'
gem 'dm-redis-adapter', '0.8.3'

group :production, :staging do
  gem 'rails_12factor' # for Heroku assets precompile
  gem 'newrelic_rpm'
end

group :development, :test do
  gem 'better_errors', '~> 0.9.0'
  gem 'binding_of_caller', '~> 0.7.2'
  gem 'pry-rails', '~> 0.3.1'
  gem 'figaro', '~> 0.7.0'
  gem 'foreman'
  gem 'guard-livereload'
  gem 'spring'
end

group :test do
  gem 'rspec-rails', '2.14.0'
  gem 'capybara', '2.1.0'
  gem 'guard-rspec'
  gem 'terminal-notifier-guard'
end
