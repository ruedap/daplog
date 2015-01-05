# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.

Rails.application.config.assets.paths << Rails.root.join('app', 'assets', 'fonts', 'dapicons')
Rails.application.config.assets.precompile += %w( .svg .eot .woff .ttf )
Rails.application.config.assets.precompile += %w( fibonacci-000.css fibonacci-020.css fibonacci-040.css fibonacci-060.css fibonacci-080.css fibonacci-100.css fibonacci-120.css fibonacci-140.css fibonacci-160.css fibonacci-180.css fibonacci-200.css fibonacci-220.css fibonacci-240.css fibonacci-260.css fibonacci-280.css fibonacci-300.css fibonacci-320.css fibonacci-340.css )
Rails.application.config.assets.precompile += %w( gradient-000.css gradient-020.css gradient-040.css gradient-060.css gradient-080.css gradient-100.css gradient-120.css gradient-140.css gradient-160.css gradient-180.css gradient-200.css gradient-220.css gradient-240.css gradient-260.css gradient-280.css gradient-300.css gradient-320.css gradient-340.css )
