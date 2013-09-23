class ApplicationController < ActionController::Base
  include StagingGuard
  protect_from_forgery with: :exception
  before_action :set_hue

  private

  def set_hue
    @hue = "%03d" % (rand(18) * 20)
  end
end
