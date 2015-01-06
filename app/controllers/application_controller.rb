class ApplicationController < ActionController::Base
  include StagingGuard
  protect_from_forgery with: :exception
end
