module ArticlesHelper
  def generate_article_link_list(article_data_array)
    content_tag :ul do
      article_year = ''
      article_data_array.each do |d|
        path = d[:path].sub(/.+?(\d{4})-(\d{2})-(\d{2})-(.+?)\.md/, "\/\\1\/\\2\/\\3\/\\4\/")
        year = d[:date][0..3]
        html = ''
        unless article_year == year
          html << '</ul>' unless article_year == ''
          article_year = year
          html << content_tag(:li, article_year)
          html << '<ul>'
        end
        html << content_tag(:li) do
          content_tag(:time, d[:date], datetime: d[:time]) +
          link_to(d[:title], path)
        end
        concat html.html_safe
      end
    end
  end
end
