module ArticlesHelper
  def generate_article_link_list(article_data_array)
    content_tag :ul do
      article_data_array.each do |d|
        path = d[:path].sub(/.+?(\d{4})-(\d{2})-(\d{2})-(.+?)\.md/, "\/\\1\/\\2\/\\3\/\\4\/")
        html = content_tag :li do
          content_tag(:time, d[:date], datetime: d[:time]) +
          link_to(d[:title], path)
        end
        concat html
      end
    end
  end
end
