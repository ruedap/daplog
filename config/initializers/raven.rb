require 'raven'

Raven.configure do |config|
  config.dsn = ENV['SENTRY_DSN']

  # 例外通知を行う環境
  config.environments = %w( production staging )

  # 例外通知を行わない環境の場合はログの出力を行わない
  unless config.environments.include?(Rails.env)
    config.logger = false
  end
end
