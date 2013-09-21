module ArticlesHelper
  def generate_article_list(articles)
    content_tag :ul, class: 'article-list' do
      article_year = ''
      articles.each do |a|
        path = a.url
        year = a.date[0..3]
        html = ''
        unless article_year == year
          article_year = year
          html << content_tag(:li, article_year, class: 'L Y article-list__year')
        end
        html << content_tag(:li, class: 'L') do
          title = generate_time_tag(a)
          title << content_tag(:b, strip_tags(a.title), class: 'T')
          link_to(title, path)
        end
        concat html.html_safe
      end
    end
  end

  def generate_time_tag(article)
    month = article.date[5..6]
    day = article.date[8..9]
    html = content_tag(:span, month, class: 'M')
    html << content_tag(:span, day, class: 'D')
    content_tag(:time, html, datetime: article.published_at)
  end

  def article_title(article)
    if article.present?
      strip_tags(article.title)
    else
      nil
    end
  end

  def article_body(article)
    if article.present?
      article.body
    else
      nil
    end
  end
end
