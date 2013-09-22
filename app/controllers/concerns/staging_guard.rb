# ステージング制限モジュール
#
# staging環境においてすべてのアクセスにBasic認証を強制します。
#
module StagingGuard
  extend ActiveSupport::Concern

  included { before_action :basic_auth if Rails.env.staging? }

  private

  # Internal: Basic認証を行います。
  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|
      username == ENV['BASIC_AUTH_USERNAME'] && \
        password == ENV['BASIC_AUTH_PASSWORD']
    end
  end
end
