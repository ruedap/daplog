require 'test_helper'

class RoutesTest < ActionDispatch::IntegrationTest
  test "routes test" do
    assert_generates "/", controller: "articles", action: "index"
    # assert_generates "/2011/08/11/uhloop/", controller: "articles", action: "show"
  end
end
