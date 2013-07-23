Daplog::Application.config.middleware.insert_before(Rack::Runtime, Rack::Rewrite) do
  r301 %r{^/(.*)/$}, '/$1'

  if ENV['RACK_ENV'] == 'production'
    r301 %r{.*}, 'http://blog.ruedap.com$&', if: Proc.new {|rack_env|
      rack_env['SERVER_NAME'] =~ /daplog\.herokuapp\.com/
    }
    r301 %r{.*}, 'http://blog-staging.ruedap.com$&', if: Proc.new {|rack_env|
      rack_env['SERVER_NAME'] =~ /daplog-staging\.herokuapp\.com/
    }
  end
end

