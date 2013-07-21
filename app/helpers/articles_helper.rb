module ArticlesHelper
  def generate_article_list(article_data_array)
    content_tag :ul, class: 'article-list' do
      article_year = ''
      article_data_array.each do |d|
        path = d[:path].sub(/.+?(\d{4})-(\d{2})-(\d{2})-(.+?)\.md/, "\/\\1\/\\2\/\\3\/\\4")
        year = d[:date][0..3]
        html = ''
        unless article_year == year
          article_year = year
          html << content_tag(:li, article_year, class: 'L Y article-list__year')
        end
        html << content_tag(:li, class: 'L') do
          title = generate_time_tag(d)
          title << content_tag(:b, strip_tags(d[:title]), class: 'T')
          link_to(title, path)
        end
        concat html.html_safe
      end
    end
  end

  def generate_time_tag(article_data)
    month = article_data[:date][5..6]
    day = article_data[:date][8..9]
    html = content_tag(:span, month, class: 'M')
    html << content_tag(:span, day, class: 'D')
    content_tag(:time, html, datetime: article_data[:time])
  end
end
